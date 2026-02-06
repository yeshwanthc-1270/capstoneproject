export default function ResumeUpload() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

      <div className="bg-white p-6 rounded shadow">
        <input type="file" className="mb-4" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Analyze Resume
        </button>
      </div>
    </div>
  );
}
