import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { CreditCard, Shield, CheckCircle, Loader } from "lucide-react";

const PRICING = {
  "Computer Science": 399,
  "Mathematics":      199,
  "Machine Learning": 499,
  "Physics":          199,
  "Chemistry":        199,
  "Web Development":  399,
  "Data Science":     449,
};

export default function Payment() {
  const [searchParams]          = useSearchParams();
  const navigate                = useNavigate();
  const { user }                = useAuth();
  const [open, setOpen]         = useState(true);
  const [loading, setLoading]   = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const assignmentId = searchParams.get("id");

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement("script");
    script.src   = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    if (assignmentId) {
      api.getAssignment(assignmentId)
        .then(setAssignment)
        .catch((err) => setFetchError(err.message));
    }

    return () => document.body.removeChild(script);
  }, [assignmentId]);

  const price = PRICING[assignment?.subject] ?? 299;

  async function handlePay() {
    setLoading(true);
    try {
      const { orderId, amount, currency } = await api.createOrder({
        amount: price,
        assignment_id: assignmentId,
      });

      const options = {
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name:        "Slot",
        description: assignment?.title || "Assignment Service",
        order_id:    orderId,
        handler: async (response) => {
          try {
            const result = await api.verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              assignment_id:       assignmentId,
            });
            if (result.success) {
              navigate("/payment-success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            alert(err.message);
          }
        },
        prefill: {
          name:    user?.name  || "",
          email:   user?.email || "",
          contact: user?.whatsapp || "",
        },
        theme:  { color: "#22c55e" },
        modal:  { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
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
          <div className="bg-white rounded-xl shadow p-10 w-full max-w-2xl">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <CreditCard size={22} />
              </div>
              <h1 className="text-2xl font-semibold">Complete Payment</h1>
            </div>

            {fetchError ? (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mb-6">{fetchError}</p>
            ) : !assignment ? (
              <div className="flex justify-center py-10">
                <Loader size={28} className="text-green-500 animate-spin" />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Assignment</p>
                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                <span className="inline-block mt-2 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                  {assignment.subject}
                </span>
                {assignment.deadline && (
                  <p className="text-gray-500 text-sm mt-2">
                    Deadline: {new Date(assignment.deadline).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between items-center border-t border-b py-4 mb-8">
              <span className="text-gray-500">Service Fee</span>
              <span className="text-3xl font-bold text-green-600">₹{price}</span>
            </div>

            <div className="space-y-3 mb-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Expert assigned within 2 hours of payment
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Solution delivered before deadline — guaranteed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Free revisions until fully satisfied
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading || !assignment}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Opening checkout..." : `Pay ₹${price} via Razorpay`}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
              <Shield size={14} />
              Secured by Razorpay · UPI · Cards · NetBanking · Wallets
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
