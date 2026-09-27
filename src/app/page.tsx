import Link from "next/link";
import { CheckInForm } from "@/components/CheckInForm";

export default function CheckInPage() {
  return (
    <div className="screen">
      <p className="eyebrow">A moment for you</p>
      <h1 className="display">
        How do you feel <em>today?</em>
      </h1>
      <p className="subtitle">Choose the word that feels closest.</p>
      <CheckInForm />
      <p className="fine footer-note">
        Your answer is private. It guides your journal and reading suggestions.
        <br />
        <Link href="/privacy">Your data</Link>
      </p>
    </div>
  );
}
