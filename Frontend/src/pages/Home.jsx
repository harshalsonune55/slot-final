import Navbar from "../components/Navbar";
import CursorDot from "../components/CursorDot";
import WaterBackground from "../components/WaterBackground";
import PublicFooter from "../components/PublicFooter";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

      <WaterBackground />

      <CursorDot />

      <div className="relative">
        <Navbar />
      </div>

      {/* Hero Section */}

      <div className="relative flex flex-col items-center text-center mt-16 sm:mt-20 md:mt-28 px-4 sm:px-6">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Build in a weekend <br />
          <span className="text-green-500">
            Scale to millions
          </span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4 sm:mt-6 max-w-md sm:max-w-xl md:max-w-2xl text-sm sm:text-base">
          Start your project with authentication,
          database, APIs, storage and realtime features.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8 sm:mt-10 w-full sm:w-auto px-6 sm:px-0">

          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Start your project
          </button>

          <button className="border border-green-500 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 transition">
            Request a demo
          </button>

        </div>

      </div>

      

    </div>
    <PublicFooter />
    </>
  );
}