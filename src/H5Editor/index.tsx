import React, { useState } from "react";
import { nanoid } from "nanoid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Editor from "./Editor";
import { H5EditorProps, H5EditorContext, StageItem } from "./types";
import { getUniformTmplGroupList } from "./helper";
import "./index.css";

export const EditorContext = React.createContext<H5EditorContext>({
  uniformTmplGroupList: [],
  stageItemList: [],
  collapse: false,
  setCollapse: () => false,
  selectedStageItemIndex: -1,
});

const H5Editor: React.FC<H5EditorProps> = (props) => {
  const { brickTemplate, buildingTemplateGroupList } = props;
  const [stageItemList, setStageItemList] = useState<StageItem[]>([]);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [selectedStageItemIndex, setSelectedStageItemIndex] = useState<number>(
    -1
  );
  const passedContext: H5EditorContext = {
    uniformTmplGroupList: getUniformTmplGroupList(
      brickTemplate,
      buildingTemplateGroupList
    ),
    stageItemList,
    collapse,
    setCollapse,
    selectedStageItemIndex,
    handlePropsChange(
      changedValues: any,
      allValues: any,
      selectedIndex: number
    ) {
      setStageItemList(
        stageItemList.map((item, index) => {
          if (index === selectedIndex) {
            return {
              ...item,
              props: {
                ...item["props"],
                ...changedValues,
              },
            };
          } else {
            return item;
          }
        })
      );
    },
    handleSelect(selectedIndex: number) {
      setSelectedStageItemIndex(selectedIndex);
      setCollapse(selectedIndex >= 0);
    },
    handleDrop(item) {
      setStageItemList([...stageItemList, { ...item, id: nanoid() }]);
    },
    handleClear() {
      setStageItemList([]);
    },
  };

  return (
    <EditorContext.Provider value={passedContext}>
      <DndProvider backend={HTML5Backend}>
        <Editor />
      </DndProvider>
    </EditorContext.Provider>
  );
};

H5Editor.displayName = "H5Editor";

export default H5Editor;
