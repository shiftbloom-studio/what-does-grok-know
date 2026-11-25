"use client";

import { useEffect, useState } from "react";
import { AnalysisGate } from "@/components/shared/analysis-gate";
import { TopicClusters } from "@/components/topics/topic-clusters";
import { TopicList } from "@/components/topics/topic-list";
import { useAnalysisContext } from "@/lib/context/analysis-provider";
import { getAllConversations } from "@/lib/storage/db-queries";
import type { TopicCluster } from "@/lib/types/analysis";
import type { ParsedConversation } from "@/lib/types/grok-data";

export default function TopicsPage() {
  const { analysis } = useAnalysisContext();
  const [conversations, setConversations] = useState<ParsedConversation[]>([]);
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);

  useEffect(() => {
    getAllConversations().then(setConversations);
  }, []);

  const handleClusterClick = (cluster: TopicCluster) => {
    setActiveClusterId((prev) => (prev === cluster.id ? null : cluster.id));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="mb-1 text-3xl font-semibold text-brand-text">Topics</h1>
        <p className="text-sm text-brand-muted">
          What you keep coming back to, grouped by the words those chats share.
        </p>
      </div>

      <AnalysisGate>
        {analysis && analysis.topics.length > 0 ? (
          <>
            <TopicClusters
              clusters={analysis.topics}
              onClusterClick={handleClusterClick}
              activeClusterId={activeClusterId}
            />
            <TopicList
              clusters={analysis.topics}
              conversations={conversations}
              filterClusterId={activeClusterId}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-brand-muted">
              No topics found. Upload your Grok export to explore themes.
            </p>
          </div>
        )}
      </AnalysisGate>
    </div>
  );
}
