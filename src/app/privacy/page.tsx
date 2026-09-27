import Link from "next/link";
import { DeleteAllData } from "@/components/DeleteAllData";

export const metadata = { title: "Your data · Tanglaw" };

export default function PrivacyPage() {
  return (
    <div className="screen">
      <p className="eyebrow">Your data</p>
      <h1 className="display">
        Sa&apos;yo lang <em>ito.</em>
      </h1>
      <div className="subtitle">
        <p>
          Right now, everything you write in Tanglaw stays on this device. Nothing is sent to a
          server, and there are no trackers, ads, or analytics.
        </p>
        <p>
          We treat feelings and notes as sensitive personal information under the Data Privacy Act
          of 2012 (RA 10173). We collect only what&apos;s needed, never sell or share it, and you
          can delete it anytime.
        </p>
      </div>
      <DeleteAllData />
      <div className="actions">
        <Link href="/" className="text-link">
          Back
        </Link>
      </div>
    </div>
  );
}
