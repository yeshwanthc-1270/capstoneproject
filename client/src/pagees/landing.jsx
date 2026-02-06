import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        SkillMorph
      </h1>
      <p className="text-gray-600 text-center max-w-xl mb-6">
        Intelligent Resume & Career Alignment System that helps you
        match your skills with industry job roles and build a
        personalized career roadmap.
      </p>

      <div className="space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded">
          Get Started
        </Link>
        <Link to="/login" className="bg-gray-800 text-white px-6 py-2 rounded">
          Login
        </Link>
      </div>
    </div>
  );
}
