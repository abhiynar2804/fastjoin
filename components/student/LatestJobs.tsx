const jobs = [
  {
    company: "Amazon",
    title: "Frontend Developer",
    location: "Bangalore",
  },
  {
    company: "TCS",
    title: "Software Engineer",
    location: "Pune",
  },
];

export default function LatestJobs() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Latest Jobs
      </h2>

      {jobs.map((job, index) => (
        <div
          key={index}
          className="mb-3 border-b pb-3 last:border-none"
        >
          <h3 className="font-medium">{job.company}</h3>
          <p>{job.title}</p>
          <span className="text-sm text-gray-500">
            {job.location}
          </span>
        </div>
      ))}
    </div>
  );
}