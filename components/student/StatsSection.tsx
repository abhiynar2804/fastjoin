import StatsCard from "./StatsCard";

export default function StatsSection() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatsCard title="Applications" value={5} />
      <StatsCard title="Saved Jobs" value={3} />
      <StatsCard title="Available Jobs" value={20} />
    </div>
  );
}