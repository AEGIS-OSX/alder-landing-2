"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const prefersReducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        return;
      }

      if (res.status === 409) {
        setErrorMessage("You're already on the list.");
        setFormState("error");
        return;
      }

      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  const isLoading = formState === "loading";

  return (
    <motion.section
      id="waitlist"
      aria-labelledby="waitlist-heading"
      className="section-dark"
      style={{ paddingBlock: "128px" }}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.6, ease: "easeOut" },
          })}
    >
      <div className="alder-container">
        <div
          className="flex flex-col items-center"
          style={{ maxWidth: "560px", marginInline: "auto" }}
        >
          <h2
            id="waitlist-heading"
            className="text-center font-[family-name:var(--font-display)] text-[var(--color-bg)]"
            style={{
              fontSize: "clamp(26px, 5vw, 36px)",
              lineHeight: "clamp(32px, 6vw, 42px)",
              letterSpacing: "-0.01em",
              fontWeight: 400,
              marginBottom: "32px",
            }}
          >
            Be first in line.
          </h2>

          {formState === "success" ? (
            <p
              className="text-center font-[family-name:var(--font-display)] text-[var(--color-bg)]"
              style={{
                fontSize: "22px",
                lineHeight: "28px",
                fontWeight: 400,
              }}
            >
              {"You're on the list."}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row w-full gap-0">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="font-[family-name:var(--font-body)] text-[var(--color-text)] bg-[var(--color-bg)] border-[var(--color-border)] focus:outline-none focus-visible:outline-[var(--color-accent)] w-full sm:flex-1"
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: 0,
                    height: "40px",
                    padding: "0 16px",
                    fontSize: "17px",
                    fontWeight: 300,
                    minWidth: 0,
                    marginBottom: "8px",
                    outlineOffset: "2px",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-disabled={isLoading ? "true" : "false"}
                  className="font-[family-name:var(--font-body)] bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent-hover)] transition-colors duration-200 focus-visible:outline-[var(--color-accent)] whitespace-nowrap"
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0 24px",
                    height: "40px",
                    border: "none",
                    borderRadius: 0,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.55 : 1,
                    outlineOffset: "2px",
                    marginBottom: "8px",
                  }}
                >
                  {isLoading ? "Joining..." : "Join the Waitlist"}
                </button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className="font-[family-name:var(--font-body)]"
                style={{
                  marginTop: "16px",
                  fontSize: "13px",
                  lineHeight: "20px",
                  fontWeight: 300,
                  minHeight: "1lh",
                  textAlign: "center",
                }}
              >
                {formState === "error" ? (
                  <span
                    style={{
                      // No error token defined in the Alder token set.
                      // Using var(--color-accent) (#A0622A) as the warmest
                      // available token; visible on the dark section background
                      // (var(--color-text) = #2C1A0E).
                      color: "var(--color-accent)",
                    }}
                  >
                    {errorMessage}
                  </span>
                ) : (
                  <span
                    className="text-[var(--color-bg)]"
                    style={{ opacity: 0.6 }}
                  >
                    One email when the first release opens. Nothing else.
                  </span>
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
