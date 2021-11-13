import React, { VFC, useEffect, useRef, useState } from "react";
import "./index.css";

const DragComponents: VFC = () => {
  const list = [...Array(10)];
  const beNamedList = list.map((_, index) => `Contents${index}`);
  const [dragList, setDragList] = useState<string[]>(beNamedList);
  type PositonObject = {
    name: string;
  };
  const DraggingObjectState = useRef<PositonObject>({
    name: "",
  });
  const beDragedObjectState = useRef<PositonObject>({
    name: "",
  });
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    beDragedObjectState.current.name = event.currentTarget.innerHTML;
  };

  const handleDragStart = (event: React.DragEvent) => {
    DraggingObjectState.current.name = event.currentTarget.innerHTML;
  };

  const replaceArrayElements = (
    array: string[],
    targetIndex: number,
    sourceIndex: number
  ) => {
    return array.reduce(
      (resultArray: string[], element, id, originalArray) => [
        ...resultArray,
        id === targetIndex
          ? originalArray[sourceIndex]
          : id === sourceIndex
          ? originalArray[targetIndex]
          : element,
      ],
      []
    );
  };

  const handleDrop = (event: React.DragEvent) => {
    const hoveredElementName: string = event.currentTarget.innerHTML;
    const draggingElementName: string = DraggingObjectState.current.name;
    const hoveredElementIndex: number = dragList.findIndex(
      (element: string) => {
        return element == hoveredElementName;
      }
    );
    const draggingElementIndex = dragList.findIndex((element: string) => {
      return element == draggingElementName;
    });
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
