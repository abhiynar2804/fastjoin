import JobCard from "./JobCard";
import { BriefcaseBusiness } from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  workMode: string;
};

type JobListProps = {
  jobs: Job[];
};

export default function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/50 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <BriefcaseBusiness className="mx-auto h-9 w-9 text-zinc-400" />
        <h2 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          No jobs available
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          Check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          salary={job.salary}
          jobType={job.jobType}
          workMode={job.workMode}
        />
      ))}
    </div>
  );
}
