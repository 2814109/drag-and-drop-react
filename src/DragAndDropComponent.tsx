import React, { VFC, useRef, useState } from "react";
import "./index.css";

const DragComponents: VFC = () => {
  const list = [...Array(10)];
  const beNamedList = list.map((_, index) => `Contents${index}`);
  const [dragList, setDragList] = useState<string[]>(beNamedList);
  type PositonObject = {
    primaryKey: string | null;
  };
  const DraggingObjectState = useRef<PositonObject>({
    primaryKey: null,
  });
  const beDragedObjectState = useRef<PositonObject>({
    primaryKey: null,
  });
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    beDragedObjectState.current.primaryKey =
      event.currentTarget.getAttribute("primary-key");
  };
  const handleDragStart = (event: React.DragEvent) => {
    DraggingObjectState.current.primaryKey =
      event.currentTarget.getAttribute("primary-key");
  };

  const replaceArrayElements = (
    array: string[],
    replaceIndex: number,
    beReplacedIndex: number
  ) => {
    return array.reduce(
      (resultArray: string[], element, index, originalArray) => [
        ...resultArray,
        index === replaceIndex
          ? originalArray[beReplacedIndex]
          : index === beReplacedIndex
          ? originalArray[replaceIndex]
          : element,
      ],
      []
    );
  };

  const handleDrop = (event: React.DragEvent) => {
    const hoveredElementPrimaryKey: string | null =
      event.currentTarget.getAttribute("primary-key");
    const draggingElementPrimaryKey: string | null =
      DraggingObjectState.current.primaryKey;
    const hoveredElementIndex: number = dragList.findIndex(
      (_: string, index: number) => {
        return index == Number(hoveredElementPrimaryKey);
      }
    );
    const draggingElementIndex = dragList.findIndex(
      (_: string, index: number) => {
        return index == Number(draggingElementPrimaryKey);
      }
    );
    const replaceList = replaceArrayElements(
      dragList,
      hoveredElementIndex,
      draggingElementIndex
    );
    setDragList(replaceList);
  };
  return (
    <>
      {dragList.map((name, index) => {
        return (
          <div
            primary-key={index}
            className="DragItem"
            key={index}
            draggable={true}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
          >
            {name}
          </div>
        );
      })}
    </>
  );
};

export default DragComponents;
