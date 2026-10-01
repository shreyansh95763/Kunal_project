"use client";

import { useState } from "react";
import { CheckIcon, ShieldIcon } from "@/components/icons";

type Result = { ok: boolean; message: string } | null;

const FIELD =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 transition focus:border-ggdl-gold focus:ring-2 focus:ring-ggdl-gold/30 focus:outline-none";
const LABEL = "mb-2 block text-sm font-semibold text-ggdl-blue";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setPending(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      const ok = res.ok && data.status === "success";

      setResult({
        ok,
        message: data.message ?? "Something went wrong. Please try again.",
      });
      if (ok) form.reset();
    } catch {
      setResult({ ok: false, message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  // Replace the form with a confirmation rather than a banner above it, so a
  // successful send is unmistakable.
  if (result?.ok) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-ggdl-blue">Enquiry sent</h3>
        <p className="mt-3 max-w-sm text-gray-600">{result.message}</p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-8 text-sm font-semibold text-ggdl-gold underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-ggdl-blue">
        Send an <span className="text-ggdl-gold">Enquiry</span>
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Fields marked <span className="text-ggdl-gold">*</span> are required.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>
              Full Name <span className="text-ggdl-gold">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Enter Full Name"
              className={FIELD}
            />
          </div>

          <div>
            <label htmlFor="phone" className={LABEL}>
              Mobile Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter Mobile Number"
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            Email <span className="text-ggdl-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter Email"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor="query" className={LABEL}>
            Query <span className="text-ggdl-gold">*</span>
          </label>
          <textarea
            id="query"
            name="query"
            rows={6}
            required
            placeholder="Tell us what you would like certified, or ask us anything"
            className={`${FIELD} resize-y`}
          />
        </div>

        {result && !result.ok && (
          <div
            role="alert"
            className="rounded-md border-l-4 border-red-400 bg-red-50 p-4 text-sm text-red-700"
          >
            {result.message}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-md bg-ggdl-blue px-7 py-3 font-semibold text-white transition hover:bg-ggdl-blue/90 focus:ring-2 focus:ring-ggdl-gold focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "SENDING…" : "SUBMIT"}
            {!pending && <span aria-hidden="true">→</span>}
          </button>

          <p className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldIcon className="h-4 w-4 text-ggdl-gold" />
            Your details are used only to answer your enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}
