import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Navbar />

      {/* Hero Section */}

      <div className="flex flex-col items-center text-center mt-28 px-6">

        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Build in a weekend <br />
          <span className="text-green-500">
            Scale to millions
          </span>
        </h1>

        <p className="text-gray-500 mt-6 max-w-2xl">
          Start your project with authentication,
          database, APIs, storage and realtime features.
        </p>

        <div className="flex gap-6 mt-10">

          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Start your project
          </button>

          <button className="border border-green-500 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
            Request a demo
          </button>

        </div>

      </div>

    </div>
  );
}