"use client";

import React, { useState } from "react";
import { createNewUser } from "@/app/lib/actions";
import AuthInput from "@/app/components/ui/AuthInput";
import AuthNotification from "@/app/components/AuthNotification";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(status);
    const res = await createNewUser(name, email, password);
    if (res.error) {
      setStatus("error");
      setNotification(res.error);
    }

    if (password != confirmPassword) {
      setNotification("Confirm password not match!");
      setStatus("error");
    }
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
      <AuthNotification
        status={status}
        setStatus={setStatus}
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  );
};

export default SignupPage;
