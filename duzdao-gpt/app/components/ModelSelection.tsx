import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import ModelSelectIcon from "@/public/select-model.svg";
import { CommentOutlined, MoonOutlined } from "@ant-design/icons";
import ModelChoice from "./ModelChoice";
import Image from "next/image";
interface Model {
  id: string;
  name: string;
  alias: string;
  isChosen: boolean;
}

const ModelSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dadRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const models: Model[] = [
    { id: "1", name: "ChatGPT 4o mini", alias: "gpt-4o-mini", isChosen: false },
    { id: "2", name: "ChatGPT 4o", alias: "gpt-4o", isChosen: false },
    { id: "3", name: "ChatGPT o1", alias: "o1", isChosen: false },
    {
      id: "4",
      name: "ChatGPT 3.5 turbo",
      alias: "gpt-3.5-turbo",
      isChosen: true,
    },
  ];

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

          {/* List of models */}
          <ul className="h-full text-sm flex flex-col justify-center w-full">
            {models.map((model) => {
              return (
                <ModelChoice
                  id={model.id}
                  name={model.name}
                  isChosen={model.isChosen}
                />
              );
            })}
          </ul>

          {/* Activate temporary chat */}
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
