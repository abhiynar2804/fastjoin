import StatsCard from "./StatsCard";
import { FileCheck, Bookmark, FileText } from "lucide-react";

type StatsSectionProps = {
  appliedJobsCount: number;
  savedJobsCount: number;
  hasResume: boolean;
};

export default function StatsSection({
  appliedJobsCount,
  savedJobsCount,
  hasResume,
}: StatsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Applications"
        value={appliedJobsCount}
        subtitle="Jobs Applied"
        icon={FileCheck}
      />

      <StatsCard
        title="Saved Jobs"
        value={savedJobsCount}
        subtitle="Bookmarked Opportunities"
        icon={Bookmark}
      />

      <StatsCard
        title="Resume Status"
        value={hasResume ? 1 : 0}
        subtitle={hasResume ? "Resume Uploaded" : "No Resume Uploaded"}
        icon={FileText}
      />
    </div>
  );
}