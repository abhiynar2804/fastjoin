const applications = [
  {
    company: "Google",
    role: "Frontend Intern",
    status: "Under Review",
  },
  {
    company: "Microsoft",
    role: "Software Engineer Intern",
    status: "Applied",
  },
];

export default function RecentApplications() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Applications
      </h2>

      {applications.map((app, index) => (
        <div
          key={index}
          className="mb-3 border-b pb-3 last:border-none"
        >
          <h3 className="font-medium">{app.company}</h3>
          <p>{app.role}</p>
          <span className="text-sm text-blue-600">
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}