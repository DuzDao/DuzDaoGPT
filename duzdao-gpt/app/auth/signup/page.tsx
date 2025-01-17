"use client";

import React, { useState } from "react";
import { createNewUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import AuthInput from "@/app/components/ui/AuthInput";

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createNewUser(name, email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-14 pb-16">
      <h1 className="font-bold text-3xl">Create an account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthInput
          type="name"
          value={name}
          setValue={setName}
          placeholder="Username"
        />
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
        <AuthInput
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Confirm password"
        />
        <button
          type="submit"
          className="bg-green-branch text-white rounded-lg p-4 hover:brightness-90"
        >
          Continue
        </button>

        <div className="flex flex-row gap-3 items-center justify-center">
          <p>Already have an account?</p>
          <a href="/auth/login" className="color-green-branch">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
