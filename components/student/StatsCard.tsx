type StatsCardProps = {
  title: string;
  value: number;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}