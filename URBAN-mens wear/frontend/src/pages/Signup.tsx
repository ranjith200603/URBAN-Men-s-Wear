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


export default function Signup() {

  const navigate = useNavigate();


  // =====================================================
  // STATE
  // =====================================================

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  // =====================================================
  // SIGN UP
  // =====================================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    // Check fields

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert(
        "Please fill in all fields."
      );

      return;
    }


    // Check password

    if (password.length < 6) {

      alert(
        "Password must contain at least 6 characters."
      );

      return;
    }


    // Check confirm password

    if (
      password !== confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;
    }


    // Save user information

    localStorage.setItem(
      "urban-logged-in",
      "true"
    );

    localStorage.setItem(
      "urban-user-name",
      name
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
              right-[12%]
              top-[15%]
              h-80
              w-80
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              right-[18%]
              top-[21%]
              h-60
              w-60
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              bottom-[12%]
              left-[10%]
              h-72
              w-72
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


            {/* CENTER */}

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
                YOUR STYLE STARTS HERE
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
                Define
                <br />
                your
                <br />
                everyday.
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
                Discover essential pieces built
                around modern men's style.
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
                URBAN MEMBERS
              </p>

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* RIGHT SIGNUP SECTION */}
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


            {/* BACK */}

            <Link
              to="/"
              className="
                group
                mb-12
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


            {/* HEADER */}

            <div
              className="
                mb-8
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
                CREATE ACCOUNT
              </p>


              <h1
                className="
                  mt-4
                  text-5xl
                  font-black
                  tracking-tight
                "
              >
                Join URBAN.
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
                Create your account and discover
                your new everyday essentials.
              </p>

            </div>


            {/* ================================================= */}
            {/* SIGNUP FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
            >


              {/* NAME */}

              <div
                className="
                  border-b
                  border-black/20
                  py-3
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
                  Full Name
                </label>


                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  className="
                    mt-2
                    w-full
                    bg-transparent
                    text-sm
                    outline-none
                    placeholder:text-black/20
                  "
                />

              </div>


              {/* EMAIL */}

              <div
                className="
                  border-b
                  border-black/20
                  py-3
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
                    mt-2
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
                  py-3
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
                    placeholder="Create a password"
                    className="
                      mt-2
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
                      top-2
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


              {/* CONFIRM PASSWORD */}

              <div
                className="
                  border-b
                  border-black/20
                  py-3
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
                  Confirm Password
                </label>


                <div
                  className="
                    relative
                  "
                >

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Repeat your password"
                    className="
                      mt-2
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
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-0
                      top-2
                      text-black/30
                      transition
                      hover:text-black
                    "
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showConfirmPassword ? (

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


              {/* CREATE ACCOUNT */}

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
                  Create Account
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
            {/* LOGIN LINK */}
            {/* ================================================= */}

            <div
              className="
                mt-10
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
                Already a member?
              </p>


              <Link
                to="/login"
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
                  Sign in to URBAN
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
                mt-12
                text-[9px]
                leading-5
                text-black/25
              "
            >
              By creating an account, you agree to
              URBAN's terms and privacy policy.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}