import Navbar from "../components/Navbar";
import PublicFooter from "../components/PublicFooter";
import { useNavigate } from "react-router-dom";
import {
  Code, Database, Globe, Smartphone, Cpu, Shield, ArrowRight,
} from "lucide-react";

const SOLUTIONS = [
  {
    icon: <Code size={22} />,
    title: "Programming Assignments",
    desc: "Java, Python, C++, DSA and algorithm assignments solved with clean, well-documented code.",
  },
  {
    icon: <Globe size={22} />,
    title: "Web Development",
    desc: "Full-stack web apps, landing pages, and React/Node projects built to spec and deadline.",
  },
  {
    icon: <Database size={22} />,
    title: "Database & SQL",
    desc: "Schema design, queries, normalization, and database project assignments.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Apps",
    desc: "Android, iOS, and cross-platform Flutter/React Native assignments and projects.",
  },
  {
    icon: <Cpu size={22} />,
    title: "Machine Learning & AI",
    desc: "Model training, data analysis, notebooks, and ML coursework with clear explanations.",
  },
  {
    icon: <Shield size={22} />,
    title: "Systems & Security",
    desc: "Operating systems, networking, and cybersecurity assignments handled by specialists.",
  },
];

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <span className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
          What we solve
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 max-w-2xl">
          Solutions for every kind of <span className="text-green-500">tech assignment</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl">
          Whatever your subject or stack, our team of vetted developers delivers accurate,
          well-documented work — on time, every time.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-green-400 dark:hover:border-green-500/50 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-green-50 dark:bg-green-500/10 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">Have an assignment that doesn't fit a category?</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1.5">Submit it anyway — our team covers a wide range of subjects.</p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 shrink-0"
          >
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
