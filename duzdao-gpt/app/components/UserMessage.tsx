import React from "react";

interface Props {
  id: string;
  content: string;
}

const UserMessage = ({ id, content }: Props) => {
  return (
    <li key={id} className="flex justify-end">
      <p className="bg-gray-200 max-w-64 px-3 py-2 rounded-xl">{content}</p>
    </li>
  );
};

export default UserMessage;
