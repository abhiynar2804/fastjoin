import StatsCard from "./StatsCard";

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
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard
        title="Applications"
        value={appliedJobsCount}
      />

      <StatsCard
        title="Saved Jobs"
        value={savedJobsCount}
      />

      <StatsCard
        title="Resume"
        value={hasResume ? 1 : 0}
        subtitle={hasResume ? "Uploaded" : "Not Uploaded"}
      />
    </div>
  );
}