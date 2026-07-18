import AdminStatsCard from "./AdminStatsCard";

type AdminStatsSectionProps = {
  totalStudents: number;
  totalRecruiters: number;
  totalJobs: number;
  totalApplications: number;
  totalResumes: number;
};

export default function AdminStatsSection({
  totalStudents,
  totalRecruiters,
  totalJobs,
  totalApplications,
  totalResumes,
}: AdminStatsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <AdminStatsCard
        title="Students"
        value={totalStudents}
      />

      <AdminStatsCard
        title="Recruiters"
        value={totalRecruiters}
      />

      <AdminStatsCard
        title="Jobs"
        value={totalJobs}
      />

      <AdminStatsCard
        title="Applications"
        value={totalApplications}
      />

      <AdminStatsCard
        title="Resumes"
        value={totalResumes}
      />
    </div>
  );
}