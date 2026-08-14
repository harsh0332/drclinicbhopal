import Link from "next/link";
import { UserCheck, ShieldCheck, CalendarDays, ExternalLink } from "lucide-react";
import { DOCTOR_CREDENTIALS, ContentAuthorship } from "@/lib/authorship-config";

interface MedicalAuthorshipProps {
  authorship: ContentAuthorship;
  className?: string;
}

export default function MedicalAuthorship({ authorship, className = "" }: MedicalAuthorshipProps) {
  const author = DOCTOR_CREDENTIALS[authorship.authorId];
  const reviewer = authorship.reviewerId ? DOCTOR_CREDENTIALS[authorship.reviewerId] : null;

  return (
    <div
      className={`bg-surface-tint border border-primary/10 rounded-2xl p-5 sm:p-6 text-left flex flex-col gap-4 font-sans ${className}`}
      role="region"
      aria-label="Medical Review & Authorship"
    >
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary/10 pb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary font-heading tracking-wide uppercase">
          <ShieldCheck className="w-4 h-4 text-[#34C7A4]" />
          <span>Evidence-Based Clinical Content</span>
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted-text">
          <CalendarDays className="w-3.5 h-3.5 text-primary" />
          <span>Last updated: <strong className="text-primary-dark font-semibold">{authorship.lastUpdated}</strong></span>
        </div>
      </div>

      {/* Authorship & Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Written By */}
        <div className="flex flex-col gap-1 bg-white/70 rounded-xl p-3.5 border border-primary/5">
          <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider">
            Written by
          </span>
          {author ? (
            <>
              <Link
                href={author.profileUrl}
                className="text-sm font-bold font-heading text-primary-dark hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                {author.name}
              </Link>
              <p className="text-muted-text text-[11px] leading-relaxed mt-0.5">
                {author.credentials}
              </p>
            </>
          ) : (
            <span className="text-sm font-bold text-primary-dark">Baby Steps Medical Team</span>
          )}
        </div>

        {/* Medically Reviewed By */}
        <div className="flex flex-col gap-1 bg-white/70 rounded-xl p-3.5 border border-primary/5">
          <span className="text-[10px] font-bold text-muted-text uppercase tracking-wider flex items-center justify-between">
            <span>Medically reviewed by</span>
            {authorship.reviewedDate && (
              <span className="font-normal text-muted-text">Reviewed: {authorship.reviewedDate}</span>
            )}
          </span>
          {reviewer ? (
            <>
              <Link
                href={reviewer.profileUrl}
                className="text-sm font-bold font-heading text-primary-dark hover:text-primary transition-colors underline-offset-2 hover:underline flex items-center gap-1"
              >
                <span>{reviewer.name}</span>
                <UserCheck className="w-3.5 h-3.5 text-[#34C7A4] shrink-0" />
              </Link>
              <p className="text-muted-text text-[11px] leading-relaxed mt-0.5">
                {reviewer.credentials}
              </p>
            </>
          ) : (
            <div className="py-1">
              <span className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-mono font-bold">
                [ASSIGN REVIEWER]
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Disclaimer Link */}
      <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-muted-text border-t border-primary/5">
        <span>National Medical Commission (NMC) ethics &amp; accuracy compliant.</span>
        <Link
          href="/terms#medical-disclaimer"
          className="inline-flex items-center gap-1 text-primary hover:underline font-medium shrink-0"
        >
          <span>Medical Disclaimer</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
