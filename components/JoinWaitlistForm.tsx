"use client";

import { useState } from "react";
import Button from "./Button";
import { subscribeToNewsletter } from "@/app/actions/subscribe";

function JoinWaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage(
        !email
          ? "Please enter your email"
          : "Please accept the terms and privacy policy"
      );
      return;
    }

    try {
      setStatus("loading");
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setStatus("success");
        setMessage(result.message || "Thanks for joining!");
        setEmail("");
        setConsent(false);
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe");
    }
  };

  return (
    <form
      id="waitlist"
      onSubmit={handleSubmit}
      className="flex relative flex-col gap-4"
    >
      <h3 className="text-3xl font-[500]">🏃‍♂️ From Code to Customers</h3>
      <p className="text-gray text-xl">
        I write about what it really takes to build products solo, and get
        people to pay for them. It’s honest, it’s useful, and it’ll save you
        months of guessing.
      </p>
      <div className="flex flex-col mt-10 sm:flex-row gap-4 w-full mx-auto">
        <input
          id="waitlist-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === "loading"}
          style={{
            boxShadow:
              "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
          }}
          className="flex-1 px-6 py-2 md:py-4 bg-white border-2 border-gray/0 rounded-xl text-foreground placeholder:text-gray focus:outline-none focus:border-primary"
        />

        <Button
          variant="primary"
          disabled={status === "loading"}
          className="w-full md:w-auto"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {/* <div className="flex items-start gap-3 text-sm text-gray">
          <div className="relative flex items-start">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="peer h-5 w-5 rounded-md border-2 border-gray/20 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-2 bg-white cursor-pointer appearance-none checked:bg-primary checked:border-0"
            />
            <svg
              className="absolute left-0 top-0 h-5 w-5 pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <label htmlFor="consent" className="cursor-pointer select-none">
            I agree to Beehiiv's{" "}
            <Link
              href="https://www.beehiiv.com/tou"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.beehiiv.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div> */}

      {message && (
        <p
          className={`text-sm absolute -bottom-10 left-0 ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default JoinWaitlistForm;
