export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Resume Score</h3>
          <p className="text-2xl text-blue-600">78%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">ATS Compatibility</h3>
          <p className="text-2xl text-green-600">82%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Matched Job Roles</h3>
          <p className="text-2xl text-purple-600">4</p>
        </div>
      </div>
    </div>
  );
}
