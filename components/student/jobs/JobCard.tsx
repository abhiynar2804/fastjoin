type Props = {
  title: string;
  company: string;
  location: string;
};

export default function JobCard({
  title,
  company,
  location,
}: Props) {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-xl font-bold">{title}</h2>

      <p>{company}</p>

      <p className="text-gray-500">{location}</p>

      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        View Details
      </button>
    </div>
  );
}