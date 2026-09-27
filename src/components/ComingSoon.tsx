import Link from "next/link";

interface Props {
  title: string;
  accent: string;
  body: string;
  checkInId?: string;
}

/** Placeholder for Milestone 2 destinations. */
export function ComingSoon({ title, accent, body, checkInId }: Props) {
  const back = checkInId ? `/need?c=${encodeURIComponent(checkInId)}` : "/";
  return (
    <div className="screen">
      <p className="eyebrow">Ginagawa pa ito</p>
      <h1 className="display">
        {title} <em>{accent}</em>
      </h1>
      <p className="subtitle">{body}</p>
      <div className="actions">
        <Link href={back} className="pill pill--ghost">
          Choose something else
        </Link>
      </div>
    </div>
  );
}
