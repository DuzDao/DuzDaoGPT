import React, { useEffect, useState } from "react";

interface Props {
  status: string;
  setStatus: (status: string) => void;
  notification: string;
  setNotification: (notification: string) => void;
}

const AuthNotification = ({
  status,
  setStatus,
  notification,
  setNotification,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (notification) {
      setShowModal(true);

      const timer = setTimeout(() => {
        setShowModal(false);
        setStatus("");
        setNotification("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="notification-modal w-52 fixed bottom-0 right-0 bg-gray-200 me-2 mb-14 px-3 py-2 rounded-xl">
      <div className="flex flex-row items-center">
        <h1 className="text-red-400 font-bold text-xl">
          {status.toUpperCase()}
        </h1>
      </div>
      <div className="text-sm">
        <p>{notification}</p>
      </div>
    </div>
  );
};

export default AuthNotification;
