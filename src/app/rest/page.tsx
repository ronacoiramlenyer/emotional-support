import Link from "next/link";

export const metadata = { title: "Ingat ka · Tanglaw" };

/** A closing screen. Points outward — never "come back tomorrow". */
export default function RestPage() {
  return (
    <div className="screen">
      <p className="eyebrow">Salamat sa paghinto</p>
      <h1 className="display">
        Naming it <em>was enough.</em>
      </h1>
      <p className="subtitle">
        Before you close this: maybe a glass of water, a bit of fresh air, or a quick
        &ldquo;kumusta?&rdquo; to someone you trust. Maliit lang, pero totoo. Ingat ka today.
      </p>
      <div className="actions">
        <Link href="/" className="pill pill--ghost">
          Done
        </Link>
      </div>
    </div>
  );
}
