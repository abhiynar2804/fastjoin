export default function JobFilters() {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h2 className="font-semibold text-lg">Filters</h2>

      <select className="w-full border rounded p-2">
        <option>All Job Types</option>
        <option>Internship</option>
        <option>Full Time</option>
      </select>

      <select className="w-full border rounded p-2">
        <option>All Work Modes</option>
        <option>Remote</option>
        <option>Hybrid</option>
        <option>Onsite</option>
      </select>
    </div>
  );
}