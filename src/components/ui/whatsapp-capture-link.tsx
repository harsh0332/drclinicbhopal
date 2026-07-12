"use client";

import { useCallback, useEffect, useState } from "react";
import { saveWhatsAppLeadAction } from "@/app/actions";
import { X, MessageSquare, Loader2 } from "lucide-react";

/**
 * WhatsApp CTA with lead capture.
 *
 * A raw wa.me link can't tell us WHO clicked it, so the clinic would lose the
 * lead unless the parent actually sends a message. This component keeps the
 * CTA's exact look (pass the original classes/children through) but opens a
 * small modal asking Name + Phone (+ optional child age) first. On confirm it
 * saves the lead to the Appointments sheet (status "New", source "whatsapp")
 * and THEN opens WhatsApp with a prefilled message.
 *
 * The save is awaited (capped at 2.5s) BEFORE leaving the page — a
 * fire-and-forget request would be cancelled if the browser navigates the
 * current tab to WhatsApp. Navigation then uses window.location.href, which
 * popup blockers never stop (unlike window.open after an await). A failed or
 * slow save never blocks the chat.
 */

interface WhatsAppCaptureLinkProps {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  /** Called when the CTA is clicked (e.g. to close a mobile menu). */
  onTrigger?: () => void;
}

const PHONE_REGEX = /^[6-9]\d{9}$/;

function buildWhatsAppLink(name?: string, childAge?: string) {
  const text = name
    ? `Hi Baby Steps Clinic, I'm ${name}. I'd like to book an appointment for my child${
        childAge ? ` (age: ${childAge})` : ""
      }.`
    : "Hi, I'd like to book an appointment for my child at Baby Steps.";
  return `https://wa.me/916262560101?text=${encodeURIComponent(text)}`;
}

export default function WhatsAppCaptureLink({
  className,
  ariaLabel,
  children,
  onTrigger,
}: WhatsAppCaptureLinkProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setError("");
    setSubmitting(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (trimmedName.length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!PHONE_REGEX.test(cleanPhone)) {
      setError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }

    setSubmitting(true);
    // Wait for the lead to be captured (max 2.5s) so navigating away can't
    // cancel the request — then hand over to WhatsApp.
    try {
      await Promise.race([
        saveWhatsAppLeadAction({ name: trimmedName, phone: cleanPhone, childAge }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch {
      // Lead capture must never block the patient from reaching WhatsApp.
    }
    window.location.href = buildWhatsAppLink(trimmedName, childAge.trim());
  };

  const handleSkip = () => {
    window.location.href = buildWhatsAppLink();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onTrigger?.();
          setOpen(true);
        }}
        className={className}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Chat on WhatsApp"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary-dark/40 backdrop-blur-[2px] animate-in fade-in duration-200"
            onClick={close}
          />

          {/* Panel — bottom sheet on mobile, centered card on desktop */}
          <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-xl p-6 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[85dvh] overflow-y-auto">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-muted-text hover:bg-gray-50 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#128C7E] shrink-0">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-primary-dark">Chat on WhatsApp</h3>
                <p className="text-[11px] text-muted-text font-sans">
                  Share your details so our coordinator can assist you faster.
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="flex flex-col gap-3">
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 font-sans">
                  {error}
                </p>
              )}

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name *"
                aria-label="Your name"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number *"
                aria-label="Mobile number"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="text"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="Child's age (optional)"
                aria-label="Child's age"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold py-3.5 px-4 rounded-2xl shadow-md hover:bg-[#128C7E] active:scale-[0.98] transition-all min-h-[44px] disabled:opacity-70"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4 fill-white" />
                )}
                <span>Continue to WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-[11px] font-semibold text-muted-text hover:text-primary hover:underline py-1 font-sans"
              >
                Skip — just open the chat
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
