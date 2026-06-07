import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-14 max-w-md w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <CheckCircle size={52} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>

        <p className="text-gray-500 mb-8">
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
          className="w-full mt-3 border py-3 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
