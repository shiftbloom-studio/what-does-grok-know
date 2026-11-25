"use client";

import { useMemo } from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { ConversationSentiment } from "@/lib/types/analysis";

interface EmotionalPanelProps {
  sentiments: ConversationSentiment[];
  positiveWords?: string[];
  negativeWords?: string[];
}

function getSentimentLabel(score: number): string {
  if (score >= 0.5) return "Very positive";
  if (score >= 0.15) return "Positive";
  if (score > -0.15) return "Neutral";
  if (score > -0.5) return "Negative";
  return "Very negative";
}

function getSentimentColor(score: number): string {
  if (score >= 0.15) return "text-brand-root";
  if (score > -0.15) return "text-brand-muted";
  return "text-brand-root";
}

export function EmotionalPanel({
  sentiments,
  positiveWords = [],
  negativeWords = [],
}: EmotionalPanelProps) {
  const chartData = useMemo(() => {
    return sentiments.map((s, i) => ({
      index: i + 1,
      score: s.overall,
    }));
  }, [sentiments]);

  const overallScore = useMemo(() => {
    if (sentiments.length === 0) return 0;
    const sum = sentiments.reduce((acc, s) => acc + s.overall, 0);
    return sum / sentiments.length;
  }, [sentiments]);

  const positiveCount = sentiments.filter((s) => s.overall > 0.1).length;
  const negativeCount = sentiments.filter((s) => s.overall < -0.1).length;
  const neutralCount = sentiments.length - positiveCount - negativeCount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center md:col-span-1">
          <p className={`text-3xl font-bold ${getSentimentColor(overallScore)}`}>
            {overallScore.toFixed(2)}
          </p>
          <p className="text-xs text-brand-muted mt-1">
            Overall: {getSentimentLabel(overallScore)}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-brand-root">{positiveCount}</p>
          <p className="text-xs text-brand-muted mt-1">Positive chats</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-brand-muted">{neutralCount}</p>
          <p className="text-xs text-brand-muted mt-1">Neutral chats</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-brand-root">{negativeCount}</p>
          <p className="text-xs text-brand-muted mt-1">Negative chats</p>
        </Card>
      </div>

      <Card>
        <h4 className="text-sm font-semibold text-brand-text mb-4">Sentiment over time</h4>
        {chartData.length > 0 ? (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="index"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: "Conversation #",
                    position: "insideBottom",
                    offset: -5,
                    fontSize: 11,
                  }}
                />
                <YAxis domain={[-1, 1]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1216",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [value.toFixed(3), "Sentiment"]}
                />
                <ReferenceLine y={0} stroke="#cfc4c0" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#ff2e52"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#ff2e52" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-brand-muted py-8 text-center">No sentiment data available</p>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h4 className="text-sm font-semibold text-brand-root mb-3">Positive signals</h4>
          {positiveWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {positiveWords.slice(0, 30).map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-brand-panel text-brand-text"
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-muted">No data yet</p>
          )}
        </Card>
        <Card>
          <h4 className="text-sm font-semibold text-brand-root mb-3">Negative signals</h4>
          {negativeWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {negativeWords.slice(0, 30).map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-brand-secondary text-brand-root"
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-muted">No data yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}
