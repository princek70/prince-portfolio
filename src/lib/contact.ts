import { profile } from "@/data/site";

export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type SubmitResult =
  | { ok: true; via: string }
  | { ok: false; reason: string };

/**
 * Where the contact form delivers.
 *
 * Two providers, tried in order, because the free tier of a form backend is a
 * single point of failure and the one this started on proved to be one —
 * formsubmit.co returned HTTP 500 to every request for an extended period
 * while its homepage kept answering 200, so nothing monitoring it noticed.
 *
 * Web3Forms is preferred when a key is present: it is built for static sites,
 * answers CORS properly, and has a dashboard where you can see submissions —
 * which matters here, because a form that silently drops messages looks
 * identical to a form nobody is using.
 *
 * Get a free key by entering your address at https://web3forms.com — it
 * arrives by email — then set:
 *
 *   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
 *
 * With no key set, FormSubmit is used exactly as before.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

const FORMSUBMIT_TARGET =
  process.env.NEXT_PUBLIC_FORMSUBMIT_TARGET?.trim() || profile.email;

const SUBJECT = (values: ContactValues) => `Portfolio message from ${values.name}`;

async function submitViaWeb3Forms(values: ContactValues): Promise<void> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: SUBJECT(values),
      // So replying in your mail client goes to the visitor, not to yourself.
      replyto: values.email,
      from_name: values.name,
      name: values.name,
      email: values.email,
      message: values.message,
    }),
  });

  const result: { success?: boolean; message?: string } = await response
    .json()
    .catch(() => ({}));

  if (!response.ok || result.success !== true) {
    throw new Error(result.message ?? `HTTP ${response.status}`);
  }
}

async function submitViaFormSubmit(values: ContactValues): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...values,
      _replyto: values.email,
      _subject: SUBJECT(values),
      _template: "table",
      // reCAPTCHA cannot render inside a fetch request, so it is off. The
      // form's honeypot and the provider's own rate limiting stand in.
      _captcha: "false",
    }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  // FormSubmit reports success as the *string* "true", not a boolean.
  const result: { success?: string | boolean } = await response.json();
  if (result.success !== "true" && result.success !== true) {
    throw new Error("submission rejected");
  }
}

const PROVIDERS: { name: string; send: (v: ContactValues) => Promise<void> }[] = [
  ...(WEB3FORMS_KEY
    ? [{ name: "Web3Forms", send: submitViaWeb3Forms }]
    : []),
  { name: "FormSubmit", send: submitViaFormSubmit },
];

/**
 * Tries each configured provider until one accepts. A provider that is down
 * therefore costs a retry rather than the message.
 *
 * The reason string is logged rather than shown — a visitor can do nothing
 * with "HTTP 500", and the UI offers them a way out instead.
 */
export async function sendMessage(values: ContactValues): Promise<SubmitResult> {
  const failures: string[] = [];

  for (const provider of PROVIDERS) {
    try {
      await provider.send(values);
      return { ok: true, via: provider.name };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      failures.push(`${provider.name}: ${reason}`);
      console.error(`Contact form: ${provider.name} failed — ${reason}`);
    }
  }

  return { ok: false, reason: failures.join("; ") };
}

/**
 * A pre-filled message in the visitor's own mail client.
 *
 * This is the floor under the form: whatever happens to the providers, a
 * visitor who has typed a message is never left with nowhere to send it. It is
 * offered only after a submission has already failed, so it never competes
 * with the form's normal path.
 */
export function mailtoHref({ name, email, message }: ContactValues): string {
  const body = `${message}\n\n—\n${name}\n${email}`;
  const query = new URLSearchParams({ subject: SUBJECT({ name, email, message }), body });
  return `mailto:${profile.email}?${query}`;
}
