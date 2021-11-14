import React, { VFC, useRef, useState } from "react";
import "./index.css";

const DragComponents: VFC = () => {
  const list = [...Array(10)];
  const beNamedList = list.map((_, index) => {
    return { id: index, contentName: `Contents${index}` };
  });
  type ContentType = {
    id: number;
    contentName: string;
  };

  const [dragList, setDragList] = useState<ContentType[]>(beNamedList);
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
    array: ContentType[],
    replaceIndex: number,
    beReplacedIndex: number
  ) => {
    return array.reduce(
      (resultArray: ContentType[], element, index, originalArray) => [
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
      (contentObject: ContentType) => {
        return contentObject.id == Number(hoveredElementPrimaryKey);
      }
    );
    const draggingElementIndex = dragList.findIndex(
      (contentObject: ContentType) => {
        return contentObject.id == Number(draggingElementPrimaryKey);
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
      {dragList.map((contentObject) => {
        return (
          <div
            primary-key={contentObject.id}
            className="DragItem"
            key={contentObject.id}
            draggable={true}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
          >
            {contentObject.contentName}
          </div>
        );
      })}
    </>
  );
};

export default DragComponents;
