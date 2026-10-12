import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <div className="sticky top-24 z-40 w-fit">

      <Link
        to="/"
        className="group inline-flex items-center gap-3 border border-black/10 bg-[#f8f6f1]/95 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
      >

        <span className="flex h-7 w-7 items-center justify-center">

          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

        </span>

        <span>
          Back to Home
        </span>

      </Link>

    </div>
  );
}