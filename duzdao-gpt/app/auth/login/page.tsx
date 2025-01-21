"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthInput from "@/app/components/ui/AuthInput";
import AuthNotification from "@/app/components/AuthNotification";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setStatus("error");
      setNotification("Email or password is required!");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.error) {
      router.push("/conversations");
    } else {
      setStatus("error");
      setNotification("Wrong email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-14 pb-16">
      <h1 className="font-bold text-3xl">Welcome back</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthInput
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="Email address*"
        />
        <AuthInput
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-green-branch text-white rounded-lg p-4 hover:brightness-90"
        >
          Continue
        </button>

        <div className="flex flex-row gap-3 items-center justify-center">
          <p>Don't have an account?</p>
          <a
            href="/auth/signup"
            className="color-green-branch hover:brightness-90"
          >
            Sign Up
          </a>
        </div>
      </form>
      <AuthNotification status={status} notification={notification} />
    </div>
  );
};

export default LoginPage;
