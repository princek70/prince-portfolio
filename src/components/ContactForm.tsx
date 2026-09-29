"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { alert, check, loader, send } from "@/components/icons/icon-data";
import { profile } from "@/data/site";
import { mailtoHref, sendMessage, type ContactValues } from "@/lib/contact";

/**
 * Contact form. Delivery and the choice of provider live in `src/lib/contact.ts`;
 * this file is only the interface and its states.
 *
 * One manual step, once, for whichever provider is in use: FormSubmit requires
 * the first submission to be confirmed by clicking a link it emails you. Until
 * then it accepts submissions without delivering them. Web3Forms needs no
 * confirmation.
 */

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
  // Kept so the failure state can offer the visitor a pre-filled email — the
  // form has already been reset by then, so the text has to be held here.
  const [attempt, setAttempt] = useState<ContactValues | null>(null);
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
    setAttempt(values);

    try {
      const result = await sendMessage(values);

      if (!result.ok) {
        // Already logged per-provider in lib/contact.ts.
        setStatus("error");
        return;
      }

      // Only reset on success — a failure leaves the visitor's text in place
      // so they can retry or send it by email without retyping.
      form.reset();
      setAttempt(null);
      setStatus("success");
    } catch (error) {
      console.error("Contact form: unexpected failure", error);
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
          <div role="alert" className={errorBox}>
            <SvgIcon data={alert} className="mt-0.5 h-4 w-4 shrink-0" />

            <div className="min-w-0">
              <p>
                Couldn&rsquo;t send your message — the form service
                isn&rsquo;t responding. Your text is still in the form, so you
                can try again, or send it a different way:
              </p>

              {/* Offered only here. The form has not been reset, so the
                  visitor keeps what they typed either way. */}
              {attempt ? (
                <a
                  href={mailtoHref(attempt)}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <SvgIcon data={send} className="h-4 w-4" />
                  Open it in your email app
                </a>
              ) : null}

              <p className="mt-3 text-xs text-red-200/70">
                Or write to{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="underline underline-offset-2"
                >
                  {profile.email}
                </a>{" "}
                directly.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
