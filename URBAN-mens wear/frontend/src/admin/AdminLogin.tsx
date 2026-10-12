import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      TEMPORARY ADMIN LOGIN

      We'll move this to the backend later.
    */

    if (
      email === "admin@urban.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("urban-admin-logged-in", "true");
      navigate("/admin/dashboard");
      return;
    }

    setError("Invalid admin credentials.");
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}
        <div className="hidden bg-[#171717] p-12 text-white lg:flex lg:flex-col lg:justify-between">

          <div>
            <p className="text-3xl font-bold tracking-[-0.06em]">
              URBAN
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
              Administration
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Control Center
            </p>

            <h1 className="mt-5 max-w-lg text-5xl font-semibold leading-tight">
              Manage your store.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              Manage products, orders, customers and website
              content from one place.
            </p>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            URBAN Admin Panel
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            <div className="mb-10 lg:hidden">
              <p className="text-3xl font-bold tracking-[-0.06em]">
                URBAN
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-black/40">
                Administration
              </p>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
              Welcome back
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Admin Login
            </h2>

            <p className="mt-4 text-sm leading-6 text-black/40">
              Sign in to manage your URBAN store.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >

              {/* EMAIL */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@urban.com"
                  className="mt-2 h-12 w-full border-b border-black/20 bg-transparent px-1 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="••••••••"
                    className="h-12 w-full border-b border-black/20 bg-transparent px-1 pr-10 text-sm outline-none transition focus:border-black"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-black/40 transition hover:text-black"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-xs text-red-500">
                  {error}
                </p>
              )}

              {/* LOGIN */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-3 bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
              >
                Login
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>

            </form>

            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.15em] text-black/30">
              Authorized administrators only
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}