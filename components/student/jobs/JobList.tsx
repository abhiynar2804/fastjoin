import JobCard from "./JobCard";

const jobs = [
  {
    title: "Frontend Intern",
    company: "Google",
    location: "Bangalore",
  },
  {
    title: "Backend Intern",
    company: "Microsoft",
    location: "Hyderabad",
  },
];

export default function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
}