type StatsCardProps = {
  title: string;
  value: number;
  subtitle?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}