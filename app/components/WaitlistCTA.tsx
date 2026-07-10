"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("error");
        setErrorMsg("That email is already on the list.");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  function getButtonLabel(): string {
    if (status === "loading") return "Joining...";
    if (status === "success") return `You're on the list`;
    return "Join the Waitlist";
  }

  function getStatusText(): string {
    if (status === "loading") return "Joining...";
    if (status === "success") return `You're on the list. We'll be in touch.`;
    if (status === "error") return errorMsg;
    return "";
  }

  return (
    <motion.section
      className="waitlist"
      id="waitlist"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
    >
      <div className="waitlist-inner">
        <hr className="hairline waitlist-rule" />
        <h2 className="waitlist-headline">Be first.</h2>
        <p className="waitlist-subhead">
          Leave your email. When the first pieces are ready, you will hear from
          us before anyone else.
        </p>
        <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            name="email"
            className="waitlist-input"
            placeholder="your@email.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            aria-describedby="waitlist-status"
          />
          <button
            type="submit"
            className="btn-primary waitlist-submit"
            disabled={status === "loading" || status === "success"}
            aria-disabled={status === "loading" || status === "success"}
          >
            {getButtonLabel()}
          </button>
        </form>
        <p
          id="waitlist-status"
          className={`waitlist-status${status === "error" ? " error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {getStatusText()}
        </p>
      </div>
    </motion.section>
  );
}
