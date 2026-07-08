export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">
        Student Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <button>🔔</button>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}