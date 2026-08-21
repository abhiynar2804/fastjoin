import RecruiterStatsCard from "./RecruiterStatsCard";
import { Briefcase, CheckCircle2, Users, UserCheck, Award } from "lucide-react";

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <RecruiterStatsCard
        title="Jobs Posted"
        value={jobsPosted}
        subtitle="Total Listings"
        icon={Briefcase}
      />

      <RecruiterStatsCard
        title="Open Jobs"
        value={openJobs}
        subtitle="Active Hiring"
        icon={CheckCircle2}
      />

      <RecruiterStatsCard
        title="Applications"
        value={applicationsReceived}
        subtitle="Total Received"
        icon={Users}
      />

      <RecruiterStatsCard
        title="Shortlisted"
        value={shortlisted}
        subtitle="In Interview Stage"
        icon={UserCheck}
      />

      <RecruiterStatsCard
        title="Selected"
        value={selected}
        subtitle="Hired Candidates"
        icon={Award}
      />
    </div>
  );
}