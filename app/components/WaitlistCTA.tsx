"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = EMAIL_RE.test(email);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setFormState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        const data = (await res.json()) as { error?: string };
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setFormState("error");
    }
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-heading"
      className="w-full py-[var(--space-huge)] px-[var(--space-md)] bg-[var(--color-surface)]"
    >
      <div className="max-w-[860px] mx-auto">
        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
              className="text-center"
            >
              <p
                className="font-[family-name:var(--font-display)] text-[length:var(--text-h2-mobile)] md:text-[length:var(--text-h2)] leading-[var(--leading-h2)] tracking-[-0.01em] font-normal text-[var(--color-text)]"
              >
                You are on the list.
              </p>
              <p className="mt-[var(--space-md)] text-[length:var(--text-body-mobile)] md:text-[length:var(--text-body)] leading-[var(--leading-body)] font-light text-[var(--color-text-muted)]">
                One email when the first release opens. Nothing else.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1] }}
            >
              <h2
                id="waitlist-heading"
                className="font-[family-name:var(--font-display)] text-[length:var(--text-h2-mobile)] md:text-[length:var(--text-h2)] leading-[var(--leading-h2)] tracking-[-0.01em] font-normal text-[var(--color-text)] mb-[var(--space-xxl)]"
              >
                Be first in line.
              </h2>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-[var(--space-sm)]"
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (formState === "error") {
                      setFormState("idle");
                      setErrorMessage("");
                    }
                  }}
                  disabled={formState === "loading"}
                  aria-invalid={errorMessage ? "true" : "false"}
                  aria-describedby={errorMessage ? "waitlist-error" : undefined}
                  className="flex-1 h-[40px] px-[var(--space-md)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-none text-[length:var(--text-body-mobile)] md:text-[length:var(--text-body)] font-light text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:opacity-50 transition-opacity duration-150"
                />
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  aria-busy={formState === "loading"}
                  className="h-[40px] px-[var(--space-xl)] bg-[var(--color-accent)] text-[var(--color-text)] text-[length:var(--text-spec)] tracking-[0.06em] uppercase font-normal rounded-none border-none cursor-pointer hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:opacity-50 transition-colors duration-150 whitespace-nowrap"
                >
                  {formState === "loading" ? (
                    <span aria-live="polite">Joining…</span>
                  ) : (
                    "Join the Waitlist"
                  )}
                </button>
              </form>
              {errorMessage && (
                <p
                  id="waitlist-error"
                  role="alert"
                  className="mt-[var(--space-sm)] text-[length:var(--text-spec)] text-[var(--color-accent)] tracking-[0.06em] uppercase"
                >
                  {errorMessage}
                </p>
              )}
              <p className="mt-[var(--space-md)] text-[length:var(--text-spec)] tracking-[0.06em] uppercase text-[var(--color-text-muted)]">
                One email when the first release opens. Nothing else.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
