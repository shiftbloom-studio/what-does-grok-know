"use client";

import { Progress } from "@/components/ui/progress";
import { useAnalysisContext } from "@/lib/context/analysis-provider";

export function AnalysisGate({ children }: { children: React.ReactNode }) {
  const { isAnalyzing, progress, error } = useAnalysisContext();

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <p className="text-brand-root font-medium mb-2">Analysis error</p>
          <p className="text-sm text-brand-muted">{error}</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center w-full max-w-sm space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-secondary animate-breathe" />
          <div>
            <p className="text-brand-text font-medium">Analyzing your conversations...</p>
            <p className="text-sm text-brand-muted mt-1">{progress.message}</p>
          </div>
          <Progress value={progress.percent} />
          <p className="text-xs text-brand-muted">{progress.percent}%</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
