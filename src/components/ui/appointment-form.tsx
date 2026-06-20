"use client";

import { useState } from "react";
import { bookAppointmentAction } from "@/app/actions";
import { siteConfig } from "@/lib/site-config";
import { Calendar, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";

export default function AppointmentForm() {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  // UI States
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback-success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("childAge", childAge);
    formData.append("preferredTime", preferredTime);

    try {
      const res = await bookAppointmentAction(formData);

      if (res.success) {
        if (res.fallback) {
          setStatus("fallback-success");
        } else {
          setStatus("success");
          // Clear inputs
          setName("");
          setPhone("");
          setChildAge("");
          setPreferredTime("");
        }
      } else {
        setErrorMessage(res.error || "Submission failed. Please check inputs.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("A server error occurred. Please try booking directly via WhatsApp.");
      setStatus("error");
    }
  };

  // Prefilled WhatsApp message for fallback
  const getWhatsAppFallbackLink = () => {
    const timeFormatted = preferredTime ? preferredTime.replace("T", " ") : "";
    const text = `Hi Baby Steps Clinic, I'd like to book an appointment.\n\nParent Name: ${name}\nPhone: ${phone}\nChild's Age: ${childAge}\nPreferred Time: ${timeFormatted}`;
    return `https://wa.me/916262560101?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-white text-left">
      {status === "success" && (
        <div className="flex flex-col items-center justify-center py-8 gap-4 text-center animate-in zoom-in duration-200">
          <div className="w-14 h-14 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-2 max-w-sm">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Request Received!
            </h3>
            <p className="text-xs text-muted-text font-sans leading-relaxed">
              Your appointment request has been logged. Our coordinator will contact you shortly to confirm your consultation slot.
            </p>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs font-semibold text-primary hover:underline"
          >
            Request another slot
          </button>
        </div>
      )}

      {status === "fallback-success" && (
        <div className="flex flex-col items-center justify-center py-6 gap-4 text-center animate-in zoom-in duration-200">
          <div className="w-14 h-14 rounded-full bg-accent-sunshine/15 border border-accent-sunshine/35 flex items-center justify-center text-amber-600">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-2.5 max-w-md">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Request Validated!
            </h3>
            <p className="text-xs text-muted-text font-sans leading-relaxed">
              Your details are verified. To finalize and secure your preferred slot immediately, please click below to send your request via WhatsApp:
            </p>
            <a
              href={getWhatsAppFallbackLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:bg-[#128C7E] transition-all"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-white" />
              <span>Confirm booking via WhatsApp</span>
            </a>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="mt-3 text-xs text-muted-text hover:underline"
          >
            Back to form
          </button>
        </div>
      )}

      {status !== "success" && status !== "fallback-success" && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {status === "error" && errorMessage && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 leading-relaxed font-sans animate-in fade-in duration-200">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field 1: Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                Parent Name <span className="text-red-500">*</span>
              </label>
              <input
                id="form-name"
                type="text"
                required
                disabled={status === "loading"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
              />
            </div>

            {/* Field 2: Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-phone" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="form-phone"
                type="tel"
                required
                disabled={status === "loading"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile (e.g. 9876543210)"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
              />
            </div>

            {/* Field 3: Child's Age */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-age" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                Child&apos;s Age / DOB <span className="text-red-500">*</span>
              </label>
              <input
                id="form-age"
                type="text"
                required
                disabled={status === "loading"}
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g. 3 months, or Birth Date"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
              />
            </div>

            {/* Field 4: Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-time" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                Preferred Date &amp; Time <span className="text-red-500">*</span>
              </label>
              <input
                id="form-time"
                type="datetime-local"
                required
                disabled={status === "loading"}
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="border border-gray-250 rounded-2xl py-3 px-4 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between mt-3 pt-3 border-t border-gray-50">
            <span className="text-[10px] text-muted-text font-sans leading-relaxed text-left max-w-sm sm:max-w-md">
              * Verification: Clicking request triggers our verification. Standard weight-based pediatric parameters applied in clinic.
            </span>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:bg-primary-dark active:scale-[0.98] transition-all min-h-[44px] shrink-0 disabled:bg-primary/50 text-xs sm:text-sm"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Requesting Slot...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Request Slot</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
