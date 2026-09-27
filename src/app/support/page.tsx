import Link from "next/link";
import { CrisisResources } from "@/components/CrisisResources";

export const metadata = { title: "Need someone now? · Tanglaw" };

export default function SupportPage() {
  return (
    <div className="screen">
      <p className="eyebrow">Nandito sila para sa&apos;yo</p>
      <h1 className="display">
        You don&apos;t have to hold this <em>alone tonight.</em>
      </h1>
      <p className="subtitle">
        These are real people, trained to listen. Libre ang tawag, and you don&apos;t need to
        explain everything — &ldquo;I&apos;m not okay&rdquo; is enough to start.
      </p>
      <CrisisResources />
      <div className="actions">
        <Link href="/" className="pill pill--ghost">
          Back to Tanglaw
        </Link>
      </div>
    </div>
  );
}
