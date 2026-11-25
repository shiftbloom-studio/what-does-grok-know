import type { ReactNode } from "react";
import { getModelColor, getModelLabel } from "@/lib/constants/models";
import type { ParsedMessage } from "@/lib/types/grok-data";
import { formatDateTime } from "@/lib/utils/date-utils";

interface MessageBubbleProps {
  message: ParsedMessage;
  isHuman: boolean;
}

function formatCodeBlocks(text: string): ReactNode {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const lang = lines[0].replace("```", "").trim();
          const code = lines.slice(1, -1).join("\n");
          return (
            <pre
              key={i}
              className="my-2 p-3 bg-brand-deep text-white/90 rounded-xl text-xs overflow-x-auto"
            >
              {lang && <div className="text-white/50 text-[10px] mb-1">{lang}</div>}
              <code>{code}</code>
            </pre>
          );
        }
        return (
          <span key={i} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      })}
    </>
  );
}

export function MessageBubble({ message, isHuman }: MessageBubbleProps) {
  return (
    <div className={`flex ${isHuman ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isHuman
            ? "bg-brand-primary text-white rounded-br-sm"
            : "bg-white border border-brand-border text-brand-text rounded-bl-sm"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[11px] font-medium ${isHuman ? "text-white/80" : "text-brand-muted"}`}
          >
            {isHuman ? "You" : "Grok"}
          </span>
          {!isHuman && message.model && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${getModelColor(message.model ?? "")}20`,
                color: getModelColor(message.model ?? ""),
              }}
            >
              {getModelLabel(message.model)}
            </span>
          )}
          <span className={`text-[10px] ${isHuman ? "text-white/60" : "text-brand-muted"}`}>
            {formatDateTime(new Date(message.createdAt))}
          </span>
        </div>
        <div className={`text-sm leading-relaxed ${isHuman ? "text-white" : "text-brand-text"}`}>
          {formatCodeBlocks(message.text)}
        </div>
      </div>
    </div>
  );
}
