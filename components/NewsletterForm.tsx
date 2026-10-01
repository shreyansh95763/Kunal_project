"use client";

import { useState } from "react";

type Status = { kind: "idle" | "ok" | "error"; message?: string };

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus({ kind: "idle" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.status === "success") {
        setStatus({ kind: "ok", message: data.message });
        setEmail("");
      } else {
        setStatus({ kind: "error", message: data.message ?? "Subscription failed." });
      }
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col space-y-2" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        className="rounded-md bg-white p-2 text-gray-800 focus:ring-2 focus:ring-ggdl-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-ggdl-gold p-2 font-semibold text-ggdl-blue transition duration-150 hover:bg-ggdl-gold/80 disabled:opacity-60"
      >
        {pending ? "Subscribing…" : "Subscribe"}
      </button>

      {status.kind !== "idle" && (
        <p
          role="status"
          className={`text-xs ${status.kind === "ok" ? "text-ggdl-gold" : "text-red-300"}`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
