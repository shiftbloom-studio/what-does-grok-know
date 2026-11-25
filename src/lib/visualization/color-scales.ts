import { getModelColor } from "@/lib/constants/models";
import type { TopicCluster } from "@/lib/types/analysis";
import type { BrainNode, ColorMode } from "@/lib/types/visualization";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Returns the cluster color for a given cluster id.
 */
export function topicColor(clusterId: string, clusters: TopicCluster[]): string {
  const cluster = clusters.find((c) => c.id === clusterId);
  return cluster?.color ?? "#a89ca2";
}

/**
 * Maps a sentiment score (-1 to 1) to a red -> grey -> teal scale.
 */
export function sentimentColor(score: number): string {
  const t = clamp01((score + 1) / 2); // normalize -1..1 to 0..1
  let r: number;
  let g: number;
  let b: number;

  if (t < 0.5) {
    // bloom red (#ff2e52) -> warm grey (#cfc4c0)
    const s = t / 0.5;
    r = lerp(255, 207, s);
    g = lerp(46, 196, s);
    b = lerp(82, 192, s);
  } else {
    // warm grey (#cfc4c0) -> teal (#4fb3a9)
    const s = (t - 0.5) / 0.5;
    r = lerp(207, 79, s);
    g = lerp(196, 179, s);
    b = lerp(192, 169, s);
  }

  return rgbToHex(r, g, b);
}

/**
 * Maps a date within a range to a grey -> bloom red scale (early to recent).
 */
export function timeColor(date: Date, minDate: Date, maxDate: Date): string {
  const range = maxDate.getTime() - minDate.getTime();
  const t = range > 0 ? clamp01((date.getTime() - minDate.getTime()) / range) : 0.5;

  // Muted mauve (#8a7a82) -> Bloom Red (#ff2e52)
  const r = lerp(138, 255, t);
  const g = lerp(122, 46, t);
  const b = lerp(130, 82, t);

  return rgbToHex(r, g, b);
}

/**
 * Returns the color associated with a Grok model.
 */
export function modelColor(model: string): string {
  return getModelColor(model);
}

/**
 * Maps message count to a light -> dark activity intensity.
 * Low activity: pale petal (#ffdce7), high activity: Bloom Red (#ff2e52).
 */
export function activityColor(messageCount: number, max: number): string {
  const t = max > 0 ? clamp01(messageCount / max) : 0;

  // Pale petal (#ffdce7) -> Bloom Red (#ff2e52)
  const r = lerp(255, 255, t);
  const g = lerp(220, 46, t);
  const b = lerp(231, 82, t);

  return rgbToHex(r, g, b);
}

export interface ColorContext {
  clusters: TopicCluster[];
  minDate: Date;
  maxDate: Date;
  maxMessageCount: number;
}

/**
 * Main dispatcher: returns the appropriate color for a node given the mode.
 */
export function getNodeColor(node: BrainNode, mode: ColorMode, ctx: ColorContext): string {
  switch (mode) {
    case "topic":
      return topicColor(node.clusterId, ctx.clusters);
    case "sentiment":
      return sentimentColor(node.sentiment);
    case "time":
      return timeColor(node.date, ctx.minDate, ctx.maxDate);
    case "model":
      // Use the cluster color as fallback since node does not store model directly
      return topicColor(node.clusterId, ctx.clusters);
    case "activity":
      return activityColor(node.messageCount, ctx.maxMessageCount);
    default:
      return "#a89ca2";
  }
}
