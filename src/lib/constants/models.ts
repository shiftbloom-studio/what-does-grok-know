export const grokModels: Record<string, { label: string; color: string }> = {
  "grok-3": { label: "Grok 3", color: "#ff2e52" },
  "grok-3-thinking": { label: "Grok 3 Thinking", color: "#c81040" },
  "grok-420": { label: "Grok 420", color: "#e8b04a" },
  "grok-2": { label: "Grok 2", color: "#f07a3c" },
  "grok-2-imageGen": { label: "Grok 2 ImageGen", color: "#4fb3a9" },
  "grok-3-deepsearch": { label: "Grok 3 DeepSearch", color: "#1a1216" },
  "grok-3-reasoning": { label: "Grok 3 Reasoning", color: "#b48edc" },
  "grok-web": { label: "Grok Web", color: "#5dc2e0" },
};

export function getModelColor(model: string): string {
  return grokModels[model]?.color ?? "#a89ca2";
}

export function getModelLabel(model: string): string {
  return grokModels[model]?.label ?? model;
}
