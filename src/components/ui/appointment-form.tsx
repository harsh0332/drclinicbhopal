"use client";

import { useState } from "react";
import { bookAppointmentAction } from "@/app/actions";
import { siteConfig } from "@/lib/site-config";
import { Calendar, CheckCircle2, AlertCircle, Loader2, MessageSquare, Phone } from "lucide-react";

export default function AppointmentForm() {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");

  // UI States
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback-success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210) starting with 6, 7, 8, or 9.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("childAge", childAge);
    formData.append("preferredTime", preferredTime);
    formData.append("message", message);

    try {
      const res = await bookAppointmentAction(formData);

      if (res.success) {
        if (res.fallback) {
          setStatus("fallback-success");
        } else {
          setStatus("success");
        }
        // Lead is captured server-side (Appointments sheet) — now hand the
        // parent over to WhatsApp with their details prefilled. Popup
        // blockers may stop this (no direct user gesture after await); the
        // success screen's "Confirm on WhatsApp" button stays as the manual
        // path, so the flow never dead-ends.
        window.open(getWhatsAppFallbackLink(), "_blank", "noopener,noreferrer");
      } else {
        setErrorMessage(res.error || "Submission failed. Please check inputs.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("A server error occurred. Please try booking directly via WhatsApp.");
      setStatus("error");
    }
  };

  // Prefilled WhatsApp message with the submitted details
  const getWhatsAppFallbackLink = () => {
    const timeFormatted = preferredTime ? preferredTime.replace("T", " ") : "";
    const messageLine = message.trim() ? `\nMessage: ${message.trim()}` : "";
    const text = `Hi Baby Steps Clinic, I'd like to book an appointment.\n\nParent Name: ${name}\nPhone: ${phone}\nChild's Age: ${childAge}\nPreferred Time: ${timeFormatted}${messageLine}`;
    return `https://wa.me/916262560101?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-white text-left">
      {(status === "success" || status === "fallback-success") && (
        <div className="flex flex-col items-center justify-center py-8 px-4 gap-4 text-center animate-in zoom-in duration-200">
          <div className="w-14 h-14 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success animate-bounce">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Appointment Request Sent!
            </h3>
            <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
              We have received your details. Our clinic coordinator will call or message you shortly to confirm your final slot.
            </p>
            <p className="text-xs text-muted-text font-sans mt-2 font-semibold">
              Want to secure your booking right away? Choose a quick option below:
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-2">
            <a
              href={getWhatsAppFallbackLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-[#128C7E] active:scale-[0.98] transition-all min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Confirm on WhatsApp</span>
            </a>
            <a
              href={siteConfig.phoneLink}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-250 text-primary-dark text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-soft hover:bg-gray-50 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Call Clinic</span>
            </a>
          </div>

          <button
            onClick={() => {
              setName("");
              setPhone("");
              setChildAge("");
              setPreferredTime("");
              setMessage("");
              setStatus("idle");
            }}
            className="mt-4 text-xs font-semibold text-primary hover:underline min-h-[44px] flex items-center justify-center px-4"
          >
            Request another slot
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
                pattern="[6-9][0-9]{9}"
                title="Please enter a valid 10-digit Indian mobile number (e.g. 9876543210) starting with 6, 7, 8, or 9."
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

            {/* Field 5: Optional message */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="form-message" className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                Message <span className="text-muted-text normal-case font-medium tracking-normal">(optional)</span>
              </label>
              <textarea
                id="form-message"
                rows={2}
                maxLength={500}
                disabled={status === "loading"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything you'd like the doctor to know (symptoms, concerns, etc.)"
                className="border border-gray-250 rounded-2xl py-3 px-4 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between mt-3 pt-3 border-t border-gray-50">
            <span className="text-[10px] text-muted-text font-sans leading-relaxed text-left max-w-sm sm:max-w-md">
              * Note: Your slot is not officially booked until our clinic team calls or messages you to confirm the timing.
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
