import React from "react";

interface Props {
  id: string;
  content: string;
}

const ModelMessage = ({ id, content }: Props) => {
  return (
    <li key={id} className="flex justify-start">
      <p className="max-w-96 px-3 py-2 rounded-xl">{content}</p>
    </li>
  );
};

export default ModelMessage;
