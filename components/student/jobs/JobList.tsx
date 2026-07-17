import JobCard from "./JobCard";

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
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-lg font-semibold">
          No jobs available
        </h2>

        <p className="mt-2 text-gray-500">
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