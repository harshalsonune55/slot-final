import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { UploadCloud, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function SubmitAssignment() {
  const [open, setOpen]           = useState(true);
  const [title, setTitle]         = useState("");
  const [subject, setSubject]     = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline]   = useState("");
  const [file, setFile]           = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title || !subject || !description) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title",       title);
      formData.append("subject",     subject);
      formData.append("description", description);
      if (deadline) formData.append("deadline", deadline);
      if (file)     formData.append("file", file);

      const assignment = await api.createAssignment(formData);
      navigate(`/payment?id=${assignment._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="fixed left-0 top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <div className={`transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        <Header />

        <div className="p-8 flex justify-center">
          <div className="bg-white rounded-xl shadow p-10 w-full max-w-3xl">

            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <LayoutDashboard size={22} />
              </div>
              <h1 className="text-2xl font-semibold">Submit Assignment</h1>
            </div>

            <h2 className="text-2xl font-semibold">Submit New Assignment</h2>
            <p className="text-gray-500 mb-8">
              Fill in the details below and we'll provide the solution for you.
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-6 bg-red-50 border border-red-200 p-3 rounded-lg">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="font-medium">Assignment Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Linear Algebra Problem Set 3"
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="font-medium">Subject / Field *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option value="">Select a field</option>
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Machine Learning</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Web Development</option>
                  <option>Data Science</option>
                </select>
              </div>

              <div>
                <label className="font-medium">Description / Questions *</label>
                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your assignment or paste your questions here..."
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="font-medium">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              <div>
                <label className="font-medium">Attachment (optional)</label>
                <label className="mt-3 border-2 border-dashed rounded-xl p-10 text-center hover:bg-gray-50 cursor-pointer block">
                  <UploadCloud size={40} className="mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-500">
                    {file ? file.name : "Click to upload or drag & drop (PDF, DOC, ZIP up to 20 MB)"}
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip,.rar"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>

              <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit & Proceed to Payment →"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
