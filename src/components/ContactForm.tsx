"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { alert, check, loader, send } from "@/components/icons/icon-data";
import { profile } from "@/data/site";

/**
 * Contact form backend — FormSubmit (https://formsubmit.co).
 *
 * The destination is just the address, so messages go straight to
 * `profile.email` with nothing to configure. FormSubmit's AJAX endpoint
 * returns JSON instead of redirecting, which is what lets the form report
 * success and failure inline.
 *
 * One manual step, once: the *first* submission triggers a confirmation email
 * to that address. Until the link in it is clicked, submissions are not
 * delivered. Send yourself one message after deploying, click the link, and
 * every message after that arrives normally.
 *
 * Optional: after confirming, FormSubmit emails you a random string that
 * stands in for your address. Set NEXT_PUBLIC_FORMSUBMIT_TARGET to it to keep
 * the address out of the page source:
 *   NEXT_PUBLIC_FORMSUBMIT_TARGET=1a2b3c4d5e
 */
const FORMSUBMIT_TARGET =
  process.env.NEXT_PUBLIC_FORMSUBMIT_TARGET ?? profile.email;

const ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`;

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELDS: FieldName[] = ["name", "email", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length < 2) errors.name = "Please enter at least 2 characters.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (!values.message) errors.message = "Please enter a message.";
  else if (values.message.length < 10)
    errors.message = "Please write at least 10 characters.";

  return errors;
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface/70 px-4 py-3 text-sm text-ink transition-colors duration-200 placeholder:text-muted focus:border-accent";

/**
 * Status colours are the light-on-dark variants in both themes. The form only
 * ever renders inside the dark contact panel (see `.section-dark` in
 * globals.css), so a `dark:` variant would never fire on the light theme and
 * the darker shades would sit at roughly 4:1 against that panel.
 */
const errorText = "mt-2 text-xs text-red-300";
const errorBox =
  "flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200";
const successBox =
  "flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200";

export default function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (field: FieldName) => `${uid}-${field}`;
  const errorId = (field: FieldName) => `${uid}-${field}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: positioned off-screen and hidden from assistive tech, so only
    // a script filling every field will touch it. Report success and send
    // nothing — a bot that gets an error just retries.
    if (String(data.get("company") ?? "").trim()) {
      form.reset();
      setStatus("success");
      return;
    }

    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    } satisfies Record<FieldName, string>;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus("idle");
      formRef.current
        ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `#${CSS.escape(fieldId(firstInvalid))}`,
        )
        ?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          // Reply goes straight back to the sender rather than to the site owner.
          _replyto: values.email,
          _subject: `Portfolio message from ${values.name}`,
          _template: "table",
          // reCAPTCHA cannot render inside a fetch request, so it is off here;
          // the honeypot above and FormSubmit's own rate limiting stand in.
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error(`FormSubmit responded ${response.status}`);

      // FormSubmit reports success as the *string* "true", not a boolean.
      const result: { success?: string | boolean } = await response.json();
      if (result.success !== "true" && result.success !== true) {
        throw new Error("FormSubmit rejected the submission");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      // Native bubbles are suppressed so every message is rendered inline and
      // announced consistently; the `required` attributes still mark the fields
      // as required for assistive technology.
      noValidate
      className="glass rounded-3xl p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor={fieldId("name")} className="block text-sm font-medium">
            Name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            onChange={() =>
              setErrors((current) => ({ ...current, name: undefined }))
            }
            className={`mt-2 ${inputClass} ${errors.name ? "border-red-500/70" : ""}`}
          />
          {errors.name ? (
            <p id={errorId("name")} className={errorText}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="block text-sm font-medium">
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            onChange={() =>
              setErrors((current) => ({ ...current, email: undefined }))
            }
            className={`mt-2 ${inputClass} ${errors.email ? "border-red-500/70" : ""}`}
          />
          {errors.email ? (
            <p id={errorId("email")} className={errorText}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={fieldId("message")} className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? errorId("message") : undefined}
            onChange={() =>
              setErrors((current) => ({ ...current, message: undefined }))
            }
            className={`mt-2 resize-y ${inputClass} ${errors.message ? "border-red-500/70" : ""}`}
          />
          {errors.message ? (
            <p id={errorId("message")} className={errorText}>
              {errors.message}
            </p>
          ) : null}
        </div>

        {/* Honeypot. Off-screen rather than display:none, which some bots skip,
            and inert for keyboard and screen-reader users. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <>
              <SvgIcon
                data={loader}
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
              />
              Sending…
            </>
          ) : (
            <>
              <SvgIcon data={send} className="h-4 w-4" />
              Send message
            </>
          )}
        </button>

        {/* Announced to screen readers without shifting the layout. */}
        <p aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your message…" : ""}
        </p>

        {status === "success" ? (
          <p role="status" className={successBox}>
            <SvgIcon data={check} className="mt-0.5 h-4 w-4 shrink-0" />
            Thanks — your message is on its way. I&rsquo;ll get back to you soon.
          </p>
        ) : null}

        {status === "error" ? (
          <p role="alert" className={errorBox}>
            <SvgIcon data={alert} className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Something went wrong sending your message. Please try again, or
              email{" "}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                {profile.email}
              </a>
              .
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
