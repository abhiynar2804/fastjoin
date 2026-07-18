import RecruiterStatsCard from "./RecruiterStatsCard";

type RecruiterStatsSectionProps = {
  jobsPosted: number;
  openJobs: number;
  applicationsReceived: number;
  shortlisted: number;
  selected: number;
};

export default function RecruiterStatsSection({
  jobsPosted,
  openJobs,
  applicationsReceived,
  shortlisted,
  selected,
}: RecruiterStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <RecruiterStatsCard
        title="Jobs Posted"
        value={jobsPosted}
      />

      <RecruiterStatsCard
        title="Open Jobs"
        value={openJobs}
      />

      <RecruiterStatsCard
        title="Applications"
        value={applicationsReceived}
      />

      <RecruiterStatsCard
        title="Shortlisted"
        value={shortlisted}
      />

      <RecruiterStatsCard
        title="Selected"
        value={selected}
      />
    </div>
  );
}