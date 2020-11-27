import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Empty } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Editor from "./Editor";
import { FormGlobalSettingsDefaultProps, ComponentType } from "./constants";
import {
  FormGlobalSettingsProps,
  H5EditorProps,
  H5EditorContext,
  StageItem,
} from "./types";
import { getUniformTmplGroupList } from "./helper";
import "./index.css";

export const EditorContext = React.createContext<H5EditorContext>({
  globalFormSettings: { ...FormGlobalSettingsDefaultProps },
  uniformTmplGroupList: [],
  stageItemList: [],
  collapse: false,
  setCollapse: () => false,
  selectedStageItemIndex: -1,
  emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
});

const H5Editor: React.FC<H5EditorProps> = (props) => {
  const {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    bricks,
    buildings,
    ...restProps
  } = props;

  const [globalFormSettings, setGlobalFormSettings] = useState<
    FormGlobalSettingsProps
  >({ ...FormGlobalSettingsDefaultProps });
  const [stageItemList, setStageItemList] = useState<StageItem[]>([]);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [selectedStageItemIndex, setSelectedStageItemIndex] = useState<number>(
    -1
  );

  const passedContext: H5EditorContext = {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
    globalFormSettings,
    uniformTmplGroupList: getUniformTmplGroupList(bricks, buildings),
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
    handleGFSettingsChange(changedValues: any) {
      setGlobalFormSettings({
        ...globalFormSettings,
        ...changedValues,
      });
    },
    handleSelect(selectedIndex: number) {
      setSelectedStageItemIndex(selectedIndex);
      setCollapse(selectedIndex >= 0);
    },
    handleSort(stageItemList) {
      setSelectedStageItemIndex(-1);
      setStageItemList(stageItemList);
    },
    handleDrop(item) {
      if (item.type === ComponentType.Bricks) {
        setStageItemList([...stageItemList, { ...item, id: nanoid() }]);
      } else {
        const composes = item.composes;
        setStageItemList([
          ...stageItemList,
          ...composes.map((item: any) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
          })),
        ]);
      }
    },
    handleClear() {
      setStageItemList([]);
    },
    handleRemove(id) {
      setStageItemList(stageItemList.filter((item) => item.id !== id));
    },
  };

  return (
    <EditorContext.Provider value={passedContext}>
      <DndProvider backend={HTML5Backend}>
        <Editor {...restProps} />
      </DndProvider>
    </EditorContext.Provider>
  );
};

H5Editor.displayName = "H5Editor";

export default H5Editor;
