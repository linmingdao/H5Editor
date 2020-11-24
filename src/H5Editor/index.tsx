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
  selectedStageItemIndex: -1,
  currentProps: {},
});

const H5Editor: React.FC<H5EditorProps> = (props) => {
  const { brickTemplate, buildingTemplateGroupList } = props;
  const [stageItemList, setStageItemList] = useState<StageItem[]>([]);
  // selectedStageItemIndex：标识 Stage 中被选中 Item 的下标， 方便操作 Attributes 和 设置该 Item 的值
  const [selectedStageItemIndex, setSelectedStageItemIndex] = useState<number>(
    -1
  );
  const [currentProps, setCurrentProps] = useState<any>(null);
  const passedContext: H5EditorContext = {
    uniformTmplGroupList: getUniformTmplGroupList(
      brickTemplate,
      buildingTemplateGroupList
    ),
    stageItemList,
    selectedStageItemIndex,
    currentProps,
    handlePropsChange(
      changedValues: any,
      allValues: any,
      selectedIndex: number
    ) {
      setCurrentProps({
        ...currentProps,
        ...allValues,
      });
      setStageItemList(
        stageItemList.map((item, index) => {
          if (index === selectedIndex) {
            return {
              ...item,
              props: {
                ...item["props"],
                ...allValues,
              },
            };
          } else {
            return item;
          }
        })
      );
    },
    handleSelect(selectedIndex: number) {
      setCurrentProps(stageItemList[selectedIndex].props);
      setSelectedStageItemIndex(selectedIndex);
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
