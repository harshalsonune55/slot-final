import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center transition-colors">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-14 max-w-md w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-500/15 p-5 rounded-full">
            <CheckCircle size={52} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Payment Successful!</h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your assignment has been confirmed. An expert will be assigned
          within 2 hours and you'll receive updates on your WhatsApp.
        </p>

        <button
          onClick={() => navigate("/assignments")}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          View My Assignments
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigate("/Dashboard")}
          className="w-full mt-3 border border-gray-300 dark:border-gray-700 dark:text-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
