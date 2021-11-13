import React, { VFC, useEffect, useRef, useState } from "react";
import "./index.css";

const DragComponents: VFC = () => {
  const list = [...Array(10)];
  const beNamedList = list.map((_, index) => `Contents${index}`);
  const [dragList, setDragList] = useState<string[]>(beNamedList);
  type PositonObject = {
    positionX: number;
    positionY: number;
    name: string;
  };
  const DraggingObjectState = useRef<PositonObject>({
    positionX: 0,
    positionY: 0,
    name: "",
  });
  const beDragedObjectState = useRef<PositonObject>({
    positionX: 0,
    positionY: 0,
    name: "",
  });

  //   const handleDrag = (event: React.DragEvent) => {};

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    beDragedObjectState.current.positionX = event.clientX;
    beDragedObjectState.current.positionY = event.clientY;
    beDragedObjectState.current.name = event.currentTarget.innerHTML;
  };

  const handleDragStart = (event: React.DragEvent) => {
    DraggingObjectState.current.positionX = event.clientX;
    DraggingObjectState.current.positionY = event.clientY;
    DraggingObjectState.current.name = event.currentTarget.innerHTML;
  };

  const replaceArrayElements = (
    array: string[],
    targetId: number,
    sourceId: number
  ) => {
    return array.reduce(
      (resultArray: string[], element, id, originalArray) => [
        ...resultArray,
        id === targetId
          ? originalArray[sourceId]
          : id === sourceId
          ? originalArray[targetId]
          : element,
      ],
      []
    );
  };

  const handleDrop = (event: React.DragEvent) => {
    console.log("DraggingObjectState" + JSON.stringify(DraggingObjectState));
    console.log("beDragedObjectState" + JSON.stringify(beDragedObjectState));
    const hoveredElementName: string = event.currentTarget.innerHTML;
    const draggingElementName: string = DraggingObjectState.current.name;
    const hoveredElementIndex: number = dragList.findIndex(
      (data: string | number) => {
        return data == hoveredElementName;
      }
    );
    const draggingElementIndex = dragList.findIndex((data: string | number) => {
      return data == draggingElementName;
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
            // onDrag={handleDrag}
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
