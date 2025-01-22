import React, { useEffect, useState } from "react";
import { StarOutlined, CheckCircleFilled } from "@ant-design/icons";

interface Props {
  id: string;
  name: string;
  isChosen: boolean;
}

const ModelChoice = ({ id, name, isChosen }: Props) => {
  return (
    <li
      key={id}
      className="flex flex-row items-center hover:cursor-default justify-between hover:bg-gray-100 p-2 rounded-xl"
    >
      <div className="flex flex-row gap-2 items-center">
        <StarOutlined className="bg-gray-200 p-2 rounded-full" />
        <h1>{name}</h1>
      </div>
      <div>
        {isChosen ? (
          <CheckCircleFilled />
        ) : (
          <button className="bg-white font-semibold outline outline-1 outline-gray-200 px-2 py-1 rounded-xl">
            Select
          </button>
        )}
      </div>
    </li>
  );
};

export default ModelChoice;
