import React, { useContext, useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { EditorContext } from "../index";
import SortableItem from "./SortableItem";
import BrickDynamicEngine from "../BrickDynamicEngine";

const Stage: React.FC = () => {
  const {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    stageItemList,
    handleSort,
    handleSelect,
    handlePropsChange,
  } = useContext(EditorContext);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "TemplateItem",
    drop: () => ({ name: "LayoutEditor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 高亮提示 开始拖拽 以及 可以完成拖拽放置
  const isActive = canDrop && isOver;
  let backgroundColor = stageBgColor ? stageBgColor : "#f3f2f2a3";
  const $collaOutline: any = document.querySelector(".colla-outline");
  $collaOutline && ($collaOutline.style["backgroundColor"] = backgroundColor);
  if (isActive) {
    backgroundColor = stageActiveColor ? stageActiveColor : "#1890ff80";
    $collaOutline && ($collaOutline.style["backgroundColor"] = backgroundColor);
  } else if (canDrop) {
    backgroundColor = stageDropColor ? stageDropColor : "#1890ff5c";
    $collaOutline && ($collaOutline.style["backgroundColor"] = backgroundColor);
  }

  // 排序
  const moveFormItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = stageItemList[dragIndex];
      handleSort &&
        handleSort(
          update(stageItemList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem],
            ],
          })
        );
    },
    [stageItemList, handleSort]
  );

  function renderItem(item: any, index: number) {
    function handleValuesChange(changedValues: any, allValues: any) {
      handlePropsChange && handlePropsChange(changedValues, allValues, index);
    }
    return (
      <SortableItem
        key={item.id}
        id={item.id}
        index={index}
        moveFormItem={moveFormItem}
        onClick={() => handleSelect && handleSelect(index)}
      >
        <BrickDynamicEngine
          mode="stage"
          componentName={item.name}
          componentProps={item.props}
          onValuesChange={handleValuesChange}
        />
      </SortableItem>
    );
  }

  return (
    <div
      ref={drop}
      className="stage uniform-scrollbar"
      style={{ backgroundColor }}
    >
      {stageItemList.map((item, index) => renderItem(item, index))}
    </div>
  );
};

Stage.displayName = "Stage";

export default Stage;
