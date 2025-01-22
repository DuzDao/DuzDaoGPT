import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import ModelSelectIcon from "@/public/select-model.svg";
import {
  ThunderboltOutlined,
  StarOutlined,
  WechatOutlined,
  CheckCircleFilled,
  CommentOutlined,
  MoonOutlined,
} from "@ant-design/icons";

import Image from "next/image";

const ModelSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dadRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleClickOutsideChild = (event: MouseEvent) => {
      if (
        !dadRef.current?.contains(event.target as Node) &&
        !childRef.current?.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideChild);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideChild);
    };
  }, [dadRef]);

  const handleClickChild = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={toggleModal}
      ref={dadRef}
      className="model-selection z-10 relative flex flex-row p-2 hover:bg-gray-100 hover:cursor-pointer rounded-xl"
    >
      <p>ChatGPT</p>
      <Image src={ModelSelectIcon} alt="Model Selection Icon"></Image>
      {isModalOpen && (
        <div
          ref={childRef}
          onClick={handleClickChild}
          className="model-selection-modal flex flex-col items-center absolute top-full transform -translate-x-1/2 left-1/2 bg-white outline outline-1 outline-gray-100 shadow-xl shadow-gray-600 w-72 px-3 py-2 rounded-2xl"
        >
          <h1 className="text-sm font-semibold">
            Choose one of our best models
          </h1>
          <ul className="h-full text-sm flex flex-col justify-center w-full">
            <li
              key="1"
              className="flex flex-row items-center justify-between hover:bg-gray-100 p-2 rounded-xl"
            >
              <div className="flex flex-row gap-2 items-center">
                <StarOutlined className="bg-gray-200 p-2 rounded-full" />
                <h1>ChatGPT 4o mini</h1>
              </div>
              <div>
                <button className="bg-white font-semibold outline outline-1 outline-gray-200 px-2 py-1 rounded-xl">
                  Upgrade
                </button>
              </div>
            </li>
            <li
              key="2"
              className="flex flex-row items-center justify-between hover:bg-gray-100 p-2 rounded-xl"
            >
              <div className="flex flex-row gap-2 items-center">
                <ThunderboltOutlined className="bg-gray-200 p-2 rounded-full" />
                <h1>ChatGPT 4o</h1>
              </div>
              <div>
                <button className="bg-white font-semibold outline outline-1 outline-gray-200 px-2 py-1 rounded-xl">
                  Upgrade
                </button>
              </div>
            </li>
            <li
              key="3"
              className="flex flex-row items-center justify-between hover:bg-gray-100 p-2 rounded-xl"
            >
              <div className="flex flex-row gap-2 items-center">
                <WechatOutlined className="bg-gray-200 p-2 rounded-full" />
                <h1>ChatGPT 3.5 Turbo</h1>
              </div>
              <div>
                <CheckCircleFilled />
              </div>
            </li>
          </ul>
          <div className="outline w-full outline-1 outline-gray-300 my-2"></div>
          <div className="flex flex-row justify-between hover:bg-gray-100 w-full p-2 rounded-xl items-center">
            <div className="flex flex-row gap-2 items-center">
              <CommentOutlined className="bg-gray-200 p-2 rounded-full" />
              <h1>Temporary chat</h1>
            </div>
            <div className="">
              <MoonOutlined />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelection;
