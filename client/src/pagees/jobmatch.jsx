export default function JobMatch() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Job Role Matching</h2>

      <textarea
        placeholder="Paste job description here..."
        className="w-full h-40 p-3 border rounded mb-4"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Match Job Role
      </button>
    </div>
  );
}
