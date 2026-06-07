import { Sparkles, Zap, X } from "lucide-react";
import { useState } from "react";

export default function PromoBanner() {

  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="w-full bg-green-600 text-white px-6 py-3 flex items-center justify-center relative">

      <div className="flex items-center gap-3 font-medium text-sm">

        <Sparkles size={18} />

        <span>
          🎉 SPRING SALE — <b>30% OFF</b> on all Tech Assignment Solutions! Use code
        </span>

        <span className="bg-green-500 px-3 py-1 rounded-md font-semibold">
          TECH30
        </span>

        <Zap size={18} />

      </div>

      {/* CLOSE BUTTON */}

      <button
        onClick={() => setShow(false)}
        className="absolute right-4 hover:bg-green-500 p-1 rounded"
      >
        <X size={18} />
      </button>

    </div>
  );
}