import Link from "next/link";

/** Shown when a screen is opened without a check-in (e.g. a stale link). */
export function MissingCheckIn() {
  return (
    <div className="screen">
      <p className="eyebrow">A moment for you</p>
      <h1 className="display">
        Let&apos;s start <em>from here.</em>
      </h1>
      <p className="subtitle">We couldn&apos;t find that check-in. No problem — tara, simulan natin ulit.</p>
      <div className="actions">
        <Link href="/" className="pill">
          Check in
        </Link>
      </div>
    </div>
  );
}
