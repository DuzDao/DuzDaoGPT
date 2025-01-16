"use client";
import React, { useEffect, useState } from "react";
import { getConversations } from "../lib/actions";
import { getSession } from "next-auth/react";

const page = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserid = async () => {
      const session = await getSession();
      if (session) {
        setUserId(session?.user.id);
      }
    };
    fetchUserid();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await getConversations(userId);
      console.log(res);
    };
    fetchConversation();
  }, [userId]);

  return <div></div>;
};

export default page;
