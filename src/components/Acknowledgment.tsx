"use client";

import Link from "next/link";
import { acknowledge } from "@/lib/acknowledgment";
import { useCheckIn } from "@/hooks/useCheckIn";
import { CrisisResources } from "./CrisisResources";
import { MissingCheckIn } from "./MissingCheckIn";

export function Acknowledgment() {
  const state = useCheckIn();
  if (state.status === "loading") return <div className="screen" aria-busy="true" />;
  if (state.status === "missing") return <MissingCheckIn />;

  const { checkIn } = state;
  const q = `?c=${encodeURIComponent(checkIn.id)}`;

  if (checkIn.needsSupport) {
    // Gentle tone shift: no alarms, no lecture. Real people first.
    return (
      <div className="screen">
        <p className="eyebrow">Narinig kita</p>
        <h1 className="display">
          Thank you for <em>telling me this.</em>
        </h1>
        {checkIn.note && <blockquote className="quote">{checkIn.note}</blockquote>}
        <p className="subtitle">
          What you wrote sounds really painful. You don&apos;t have to hold this alone tonight —
          may mga taong handang makinig, ngayon mismo. You can call or text any of these, anytime.
        </p>
        <CrisisResources />
        <div className="actions">
          <Link href={`/need${q}`} className="pill pill--ghost">
            I&apos;d like to stay here a little longer
          </Link>
        </div>
      </div>
    );
  }

  const ack = acknowledge(checkIn);
  return (
    <div className="screen">
      <p className="eyebrow">Narinig kita</p>
      <h1 className="display">
        {ack.title} <em>{ack.accent}</em>
      </h1>
      {checkIn.note && <blockquote className="quote">{checkIn.note}</blockquote>}
      <p className="subtitle">{ack.body}</p>
      <div className="actions">
        <Link href={`/need${q}`} className="pill">
          What would help? <span aria-hidden="true">↗</span>
        </Link>
        <Link href={`/rest${q}`} className="pill pill--ghost">
          I just needed to name it
        </Link>
      </div>
    </div>
  );
}
