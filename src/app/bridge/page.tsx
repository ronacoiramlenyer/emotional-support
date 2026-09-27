import { ComingSoon } from "@/components/ComingSoon";

type Props = { searchParams: Promise<{ c?: string }> };

export default async function BridgePage({ searchParams }: Props) {
  const { c } = await searchParams;
  return (
    <ComingSoon
      checkInId={c}
      title="A small step"
      accent="toward someone."
      body="This is still being built. The Bridge will offer tiny, low-risk ways to reach a real person — with drafts you can copy."
    />
  );
}
