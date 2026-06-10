import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PromoBanner from "../components/PromoBanner";
import { CheckSquare, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
    Code,
    Database,
    Globe,
    Smartphone,
    Cpu,
    Shield,
    BookOpen,
    Clock,
    FileText,
    CheckCircle,
    Users,
    Zap,
    Headphones
  } from "lucide-react";
  import { Star, Quote, MessageCircle, ArrowRight } from "lucide-react";
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const cardHover = {
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 200 }
  };

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [recentAssignments, setRecentAssignments] = useState([]);

  useEffect(() => {
    api.getAssignments().then((data) => {
      setStats({
        total:      data.length,
        pending:    data.filter((a) => a.status === "Pending" || a.status === "Pending Payment").length,
        inProgress: data.filter((a) => a.status === "In Progress").length,
        completed:  data.filter((a) => a.status === "Completed").length,
      });
      setRecentAssignments(data.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors">
        <PromoBanner />

    {/* Fixed Sidebar */}
    <div className="fixed left-0 top-0 h-screen">
    <Sidebar open={open} setOpen={setOpen} />
    </div>
  
    {/* Main Content */}
    <div className={`flex-1 transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
  

        <Header />

        <div className="p-8 space-y-10">

          {/* HERO SECTION */}

          <div className="bg-green-50 dark:bg-green-500/10 rounded-xl p-10 grid grid-cols-2 gap-10 items-center">

            <div>

              <span className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                #1 Tech Assignment Platform
              </span>

              <h1 className="text-4xl font-bold mt-4 leading-tight text-gray-900 dark:text-gray-100">
                We Provide
                <span className="text-green-600 dark:text-green-400"> Tech Solutions </span>
                For Your Assignments
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-xl">
                From coding challenges to full-stack projects —
                our expert team delivers accurate, well-documented
                tech solutions with 24/7 support.
              </p>

              <div className="mt-6 flex gap-4">

                <button onClick={() => navigate("/submit")} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Submit Assignment →
                </button>

                <button onClick={() => navigate("/assignments")} className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
                  View My Work
                </button>

              </div>

            </div>


            {/* TECHNOLOGY CARDS */}

            <div className="grid grid-cols-3 gap-4">

              <TechCard icon={<Code size={28} />} title="Programming" desc="Python, Java, C++, JavaScript & more" />
              <TechCard icon={<Database size={28} />} title="Databases" desc="SQL, MongoDB, data modeling" />
              <TechCard icon={<Globe size={28} />} title="Web Dev" desc="React, Angular, Node.js projects" />
              <TechCard icon={<Smartphone size={28} />} title="App Dev" desc="Mobile & cross-platform apps" />
              <TechCard icon={<Cpu size={28} />} title="AI / ML" desc="Machine learning & data science" />
              <TechCard icon={<Shield size={28} />} title="Cybersecurity" desc="Network security & ethical hacking" />

            </div>

          </div>


          {/* PLATFORM STATS */}

          <div className="grid grid-cols-4 gap-6">

          <StatCard icon={<CheckSquare size={28}/>} target={15000} suffix="+" label="Assignments Solved"/>
<StatCard icon={<Users size={28}/>} target={2500} suffix="+" label="Happy Students"/>
<StatCard icon={<TrendingUp size={28}/>} target={98.5} suffix="%" label="Success Rate"/>
<StatCard icon={<Clock size={28}/>} prefix="< " target={6} suffix=" hrs" label="Avg Delivery"/>

          </div>


          {/* OVERVIEW SECTION */}

          <div>

            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Your Overview
            </h2>

            <div className="grid grid-cols-4 gap-6">

              <OverviewCard
                title="Total Assignments"
                value={String(stats.total)}
                icon={<BookOpen size={28} />}
              />

              <OverviewCard
                title="Pending"
                value={String(stats.pending)}
                subtitle="Awaiting review"
                icon={<Clock size={28} />}
              />

              <OverviewCard
                title="In Progress"
                value={String(stats.inProgress)}
                subtitle="Being solved"
                icon={<FileText size={28} />}
              />

              <OverviewCard
                title="Completed"
                value={String(stats.completed)}
                subtitle="Solutions ready"
                icon={<CheckCircle size={28} />}
              />

            </div>

          </div>

          {/* TELEGRAM BOT LINKING */}
          <TelegramLinkCard />

          {/* HOW IT WORKS */}

<div>

<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
  How It Works
</h2>

<p className="text-gray-500 dark:text-gray-400 mb-6">
  Get your solution in 4 simple steps
</p>

<div className="grid grid-cols-4 gap-6">

  <StepCard
    step="1"
    title="Submit"
    desc="Upload your assignment with all requirements and deadline info"
    icon={<FileText size={20}/>}
  />

  <StepCard
    step="2"
    title="Review"
    desc="Our experts analyze the task and assign the best specialist"
    icon={<Clock size={20}/>}
  />

  <StepCard
    step="3"
    title="Solve"
    desc="Professional tech solution crafted with clean documented code"
    icon={<Code size={20}/>}
  />

  <StepCard
    step="4"
    title="Deliver"
    desc="Get your polished solution before the deadline — guaranteed"
    icon={<CheckCircle size={20}/>}
  />

</div>

</div>



{/* RECENT ASSIGNMENTS */}

<div>

<h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
  Recent Assignments
</h2>

{recentAssignments.length === 0 ? (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-10 text-center text-gray-400 dark:text-gray-500">
    No assignments yet.{" "}
    <button onClick={() => navigate("/submit")} className="text-green-600 dark:text-green-400 font-medium hover:underline">
      Submit your first one →
    </button>
  </div>
) : (
  <div className="space-y-4">
    {recentAssignments.map((a) => {
      const statusColorMap = {
        "Completed": "green",
        "In Progress": "blue",
        "Pending": "orange",
        "Pending Payment": "orange",
      };
      return (
        <AssignmentCard
          key={a._id}
          title={a.title}
          subject={a.subject || "—"}
          status={a.status}
          statusColor={statusColorMap[a.status] || "orange"}
          submitted={new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          due={a.deadline ? new Date(a.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
          desc=""
        />
      );
    })}
  </div>
)}

</div>
{/* WHY CHOOSE SECTION */}

<div className="mt-14">

  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
    Why Choose SolveIt?
  </h2>

  <p className="text-gray-500 dark:text-gray-400 mb-8">
    We're the most trusted tech assignment solution provider
  </p>

  <div className="grid grid-cols-3 gap-6">

    <FeatureCard
      icon={<Shield size={24}/>}
      title="Plagiarism-Free"
      desc="100% original solutions with detailed explanations"
    />

    <FeatureCard
      icon={<Clock size={24}/>}
      title="On-Time Delivery"
      desc="Never miss a deadline — guaranteed timely submissions"
    />

    <FeatureCard
      icon={<Headphones size={24}/>}
      title="24/7 Support"
      desc="Round-the-clock help via chat, email, or call"
    />

    <FeatureCard
      icon={<Users size={24}/>}
      title="Expert Team"
      desc="Verified professionals from top tech companies"
    />

    <FeatureCard
      icon={<Zap size={24}/>}
      title="Quick Turnaround"
      desc="Get solutions as fast as 2 hours for urgent tasks"
    />

    <FeatureCard
      icon={<CheckCircle size={24}/>}
      title="Free Revisions"
      desc="Unlimited revisions until you're fully satisfied"
    />

  </div>

</div>


{/* TESTIMONIALS */}

<div className="mt-16">

  <div className="flex justify-between items-center mb-8">

    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        What Students Say
      </h2>

      <p className="text-gray-500 dark:text-gray-400">
        Trusted by thousands of students worldwide
      </p>
    </div>

    <div className="flex items-center gap-2 text-yellow-500 font-semibold">
      <Star size={20} fill="currentColor"/>
      4.9/5
      <span className="text-gray-500 dark:text-gray-400 font-normal">
        (1,200+ reviews)
      </span>
    </div>

  </div>


  <div className="grid grid-cols-3 gap-6">

    <TestimonialCard
      text="Got my Python data structures assignment done perfectly. The code was clean, well-commented, and submitted before my deadline!"
      name="Sarah K."
      field="Computer Science"
    />

    <TestimonialCard
      text="They built a complete React dashboard for my final project. The quality exceeded my professor's expectations. Highly recommend!"
      name="James M."
      field="Web Development"
    />

    <TestimonialCard
      text="Excellent ML model implementation with proper documentation. They even explained the algorithm choices. Worth every penny."
      name="Priya R."
      field="Machine Learning"
    />

  </div>

</div>



{/* CTA SECTION */}

<div className="mt-16">

  <div className="bg-green-600 dark:bg-green-700 rounded-2xl text-white text-center py-14 px-8">

    <h2 className="text-3xl font-bold mb-3">
      Ready to Ace Your Assignments?
    </h2>

    <p className="max-w-xl mx-auto text-green-100">
      Join 2,500+ students who trust SolveIt for their tech assignments.
      Submit now and get expert solutions delivered on time.
    </p>

    <div className="flex justify-center gap-4 mt-8">

      <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-200">
        Get Started Now
        <ArrowRight size={18}/>
      </button>

      <a
  href="https://wa.me/919883491956?text=Hi%20I%20need%20help%20with%20my%20assignment"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white hover:text-black transition"
>
  <MessageCircle size={18}/>
  Chat with Us
</a>

    </div>

  </div>

</div>

        </div>
        <Footer/>
        
      </div>
    </div>
  );
}



function TelegramLinkCard() {
  const [code, setCode] = useState(null);
  const [expiresInMinutes, setExpiresInMinutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCode = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.generateBotLinkCode();
      setCode(data.code);
      setExpiresInMinutes(data.expiresInMinutes);
    } catch (err) {
      setError(err.message || "Could not generate a code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow flex items-center justify-between gap-8">
      <div>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
          <MessageCircle size={20} />
          Slot Assistant on Telegram
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xl">
          Chat with our Telegram bot to check assignment status, ask questions,
          submit new requests and pay — all from your phone. Generate a one-time
          code below, then send <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/link &lt;code&gt;</code> to the bot to connect your account.
        </p>

        {code && (
          <div className="mt-4 inline-flex items-center gap-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-4 py-2">
            <span className="text-2xl font-mono font-bold tracking-widest text-green-700 dark:text-green-400">{code}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">expires in {expiresInMinutes} min</span>
          </div>
        )}
        {error && <p className="text-red-500 dark:text-red-400 text-sm mt-3">{error}</p>}
      </div>

      <button
        onClick={generateCode}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
      >
        {loading ? "Generating…" : code ? "Generate New Code" : "Link Telegram Bot"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, desc }) {
  return (
    <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  {...cardHover}
  className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:shadow-md transition"
>

      <div className="text-green-500 dark:text-green-400 mb-3">
        {icon}
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        {desc}
      </p>

      </motion.div>
  );
}

function StepCard({ step, title, desc, icon }) {

    return (

        <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...cardHover}
        className="bg-white dark:bg-gray-900 rounded-xl shadow p-6"
      >

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
            {step}
          </div>

          <div className="text-green-500 dark:text-green-400">
            {icon}
          </div>

        </div>

        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {desc}
        </p>

      </motion.div>

    );
  }
  function AssignmentCard({
    title,
    subject,
    status,
    statusColor,
    submitted,
    due,
    desc
  }) {

    const colorMap = {
      green: "bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400",
      blue: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
      orange: "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400"
    };

    return (

        <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}

        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
      >

        <div className="flex justify-between items-center mb-2">

          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <span className={`px-3 py-1 text-sm rounded-full ${colorMap[statusColor]}`}>
            {status}
          </span>

        </div>

        <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">

          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {subject}
          </span>

          <span>
            Submitted {submitted}
          </span>

          <span>
            Due {due}
          </span>

        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {desc}
        </p>

        </motion.div>

    );
  }


  function StatCard({ icon, target, label, prefix="", suffix="" }) {

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
  
      setTimeout(() => {
        setLoading(false);
  
        let start = 0;
        const duration = 1500;
        const increment = target / (duration / 16);
  
        const counter = setInterval(() => {
  
          start += increment;
  
          if (start >= target) {
            setCount(target);
            clearInterval(counter);
          } else {
            setCount(start);
          }
  
        }, 16);
  
      }, 800);
  
    }, [target]);
  
    return (
  
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-md transition">

        <div className=" text-green-600 dark:text-green-400 p-4 rounded-xl">
          {icon}
        </div>

        <div>

          {loading ? (

            <div className="animate-pulse">

              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>

            </div>

          ) : (

            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {prefix}{Math.floor(count).toLocaleString()}{suffix}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {label}
              </p>
            </>

          )}

        </div>

      </div>
  
    );
  }



function TestimonialCard({ text, name, field }) {
    return (
  
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

        <Quote className="text-green-400 dark:text-green-500 mb-4" size={24}/>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {text}
        </p>

        <div className="flex justify-between items-center">

          <div>

            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h4>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {field}
            </p>

          </div>
  
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor"/>
            ))}
          </div>
  
        </div>
  
      </div>
  
    );
  }

function FeatureCard({ icon, title, desc }) {
    return (
  
        <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...cardHover}
        className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex gap-4 items-start"
      >

        <div className="bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 p-3 rounded-xl">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {desc}
          </p>

        </div>

      </motion.div>
  
    );
  }


function OverviewCard({ title, value, subtitle, icon }) {
  return (
    <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  {...cardHover}
  className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex justify-between items-center"
>

      <div>

        <p className="text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">
          {value}
        </h2>

        {subtitle && (
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            {subtitle}
          </p>
        )}

      </div>

      <div className="bg-green-100 dark:bg-green-500/15 p-4 rounded-xl text-green-600 dark:text-green-400">
        {icon}
      </div>

    </motion.div>
  );
}
