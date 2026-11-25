import Link from "next/link";
import type { Memory } from "@/lib/types/analysis";
import { formatDate } from "@/lib/utils/date-utils";

interface MemoryCardProps {
  memory: Memory;
}

const TYPE_CONFIG: Record<Memory["type"], { label: string; color: string; bgColor: string }> = {
  fact: { label: "Fact", color: "text-brand-text", bgColor: "bg-brand-panel" },
  decision: { label: "Decision", color: "text-brand-root", bgColor: "bg-brand-secondary" },
  learning: { label: "Learning", color: "text-brand-text", bgColor: "bg-brand-petal/25" },
  preference: { label: "Preference", color: "text-orange-700", bgColor: "bg-orange-50" },
  goal: { label: "Goal", color: "text-rose-700", bgColor: "bg-rose-50" },
};

export function MemoryCard({ memory }: MemoryCardProps) {
  const config = TYPE_CONFIG[memory.type];
  const confidencePercent = Math.round(memory.confidence * 100);

  return (
    <div className="bg-white border border-brand-border rounded-2xl p-5 transition-all duration-300 hover:border-brand-petal">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium $" +
            "{config.bgColor} $" +
            "{config.color}"
          }
        >
          {config.label}
        </span>
        <span className="text-xs text-brand-muted">{formatDate(new Date(memory.date))}</span>
      </div>

      <p className="text-sm text-brand-text leading-relaxed mb-4">{memory.content}</p>

      <div className="flex items-center justify-between">
        <Link
          href={`/conversation?id=${encodeURIComponent(memory.conversationId)}`}
          className="text-xs text-brand-root hover:underline"
        >
          View source conversation
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-brand-muted">Confidence</span>
          <div className="w-16 h-1.5 bg-brand-panel rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-primary"
              style={{ width: "$" + "{confidencePercent}%" }}
            />
          </div>
          <span className="text-[10px] font-medium text-brand-text">{confidencePercent}%</span>
        </div>
      </div>
    </div>
  );
}
