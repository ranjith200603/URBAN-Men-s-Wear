import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";


export default function Login() {

  const navigate = useNavigate();


  // =====================================================
  // STATE
  // =====================================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);


  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    // Validation

    if (!email || !password) {

      alert(
        "Please enter your email and password."
      );

      return;
    }


    // Save login information

    localStorage.setItem(
      "urban-logged-in",
      "true"
    );

    localStorage.setItem(
      "urban-user-email",
      email
    );


    // Go to Home

    navigate("/");
  };


  return (

    <main
      className="
        min-h-screen
        bg-[#f3f0ea]
      "
    >

      <div
        className="
          grid
          min-h-screen
          lg:grid-cols-2
        "
      >


        {/* ================================================= */}
        {/* LEFT EDITORIAL SECTION */}
        {/* ================================================= */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#171717]
            lg:block
          "
        >

          {/* Decorative circles */}

          <div
            className="
              absolute
              left-[15%]
              top-[18%]
              h-72
              w-72
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              left-[20%]
              top-[23%]
              h-56
              w-56
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              bottom-[15%]
              right-[12%]
              h-80
              w-80
              rounded-full
              border
              border-white/10
            "
          />


          <div
            className="
              relative
              flex
              h-full
              flex-col
              justify-between
              p-12
              xl:p-16
            "
          >

            {/* LOGO */}

            <Link
              to="/"
              className="
                text-2xl
                font-black
                tracking-[0.3em]
                text-white
              "
            >
              URBAN
            </Link>


            {/* CENTER CONTENT */}

            <div
              className="
                max-w-lg
              "
            >

              <p
                className="
                  mb-6
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-white/40
                "
              >
                THE NEW STANDARD
              </p>


              <h2
                className="
                  text-6xl
                  font-black
                  leading-[0.9]
                  tracking-tight
                  text-white
                  xl:text-7xl
                "
              >
                Dress
                <br />
                with
                <br />
                intent.
              </h2>


              <div
                className="
                  mt-8
                  h-px
                  w-20
                  bg-white/30
                "
              />


              <p
                className="
                  mt-6
                  max-w-sm
                  text-sm
                  leading-7
                  text-white/50
                "
              >
                Contemporary menswear designed
                for everyday confidence.
              </p>

            </div>


            {/* BOTTOM */}

            <div
              className="
                flex
                items-end
                justify-between
              "
            >

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                EST. 2026
              </p>


              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                MEN'S COLLECTION
              </p>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* RIGHT LOGIN SECTION */}
        {/* ================================================= */}

        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-6
            py-12
          "
        >

          <div
            className="
              w-full
              max-w-md
            "
          >


            {/* BACK TO HOME */}

            <Link
              to="/"
              className="
                group
                mb-16
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/40
                transition
                hover:text-black
              "
            >

              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />

              Back to Home

            </Link>


            {/* HEADING */}

            <div
              className="
                mb-10
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-black/40
                "
              >
                MEMBER LOGIN
              </p>


              <h1
                className="
                  mt-4
                  text-5xl
                  font-black
                  tracking-tight
                "
              >
                Welcome back.
              </h1>


              <p
                className="
                  mt-4
                  max-w-sm
                  text-sm
                  leading-6
                  text-black/45
                "
              >
                Sign in to continue to your
                URBAN account.
              </p>

            </div>


            {/* ================================================= */}
            {/* LOGIN FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
            >


              {/* EMAIL */}

              <div
                className="
                  border-b
                  border-black/20
                  py-4
                "
              >

                <label
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-black/40
                  "
                >
                  Email Address
                </label>


                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="your@email.com"
                  className="
                    mt-3
                    w-full
                    bg-transparent
                    text-sm
                    outline-none
                    placeholder:text-black/20
                  "
                />

              </div>


              {/* PASSWORD */}

              <div
                className="
                  border-b
                  border-black/20
                  py-4
                "
              >

                <label
                  className="
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-black/40
                  "
                >
                  Password
                </label>


                <div
                  className="
                    relative
                  "
                >

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    className="
                      mt-3
                      w-full
                      bg-transparent
                      pr-10
                      text-sm
                      outline-none
                      placeholder:text-black/20
                    "
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute
                      right-0
                      top-3
                      text-black/30
                      transition
                      hover:text-black
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (

                      <EyeOff
                        size={17}
                        strokeWidth={1.5}
                      />

                    ) : (

                      <Eye
                        size={17}
                        strokeWidth={1.5}
                      />

                    )}

                  </button>

                </div>

              </div>


              {/* FORGOT PASSWORD */}

              <div
                className="
                  mt-5
                  text-right
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Forgot password feature coming soon."
                    )
                  }
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-black/40
                    transition
                    hover:text-black
                  "
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="
                  group
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-between
                  bg-black
                  px-6
                  py-5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-white
                  transition
                  duration-500
                  hover:bg-[#8B6F47]
                "
              >

                <span>
                  Sign In
                </span>


                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </form>


            {/* ================================================= */}
            {/* SIGN UP LINK */}
            {/* ================================================= */}

            <div
              className="
                mt-12
                border-t
                border-black/10
                pt-8
              "
            >

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-black/35
                "
              >
                New to URBAN?
              </p>


              <Link
                to="/signup"
                className="
                  group
                  mt-4
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                    font-bold
                  "
                >
                  Create your account
                </span>


                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </Link>

            </div>


            {/* TERMS */}

            <p
              className="
                mt-16
                text-[9px]
                leading-5
                text-black/25
              "
            >
              By continuing, you agree to
              URBAN's terms and privacy policy.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}