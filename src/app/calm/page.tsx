import { ComingSoon } from "@/components/ComingSoon";

type Props = { searchParams: Promise<{ c?: string }> };

export default async function CalmPage({ searchParams }: Props) {
  const { c } = await searchParams;
  return (
    <ComingSoon
      checkInId={c}
      title="Sixty seconds to"
      accent="breathe."
      body="This is still being built. For now: breathe in slowly for four, out for six. Isa pa. That's already something."
    />
  );
}
