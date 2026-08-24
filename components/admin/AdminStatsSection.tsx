import AdminStatsCard from "./AdminStatsCard";
import { GraduationCap, Building2, Briefcase, FileCheck, FileText } from "lucide-react";

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AdminStatsCard
        title="Students"
        value={totalStudents}
        subtitle="Registered Candidates"
        icon={GraduationCap}
      />

      <AdminStatsCard
        title="Recruiters"
        value={totalRecruiters}
        subtitle="Employer Partners"
        icon={Building2}
      />

      <AdminStatsCard
        title="Total Jobs"
        value={totalJobs}
        subtitle="Platform Listings"
        icon={Briefcase}
      />

      <AdminStatsCard
        title="Applications"
        value={totalApplications}
        subtitle="Total Submissions"
        icon={FileCheck}
      />

      <AdminStatsCard
        title="Resumes"
        value={totalResumes}
        subtitle="Uploaded Resumes"
        icon={FileText}
      />
    </div>
  );
}