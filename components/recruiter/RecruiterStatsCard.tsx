type RecruiterStatsCardProps = {
  title: string;
  value: number;
};

export default function RecruiterStatsCard({
  title,
  value,
}: RecruiterStatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}