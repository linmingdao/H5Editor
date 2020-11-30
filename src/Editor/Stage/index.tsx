import React, { useContext, useCallback, useEffect } from "react";
import classnames from "classnames";
import { Mode, ComponentType } from "../constants";
import { Form, Empty } from "antd";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { EditorContext } from "../index";
import SortableItem from "./SortableItem";
import DynamicEngine from "../DynamicEngine";
import { convertFormSettings, resolveFormInitialValues } from "../helper";
import { BuildingComponent, Loader, StageItem } from "../types";
import { nanoid } from "nanoid";

function renderFormItem(loader: Loader, item: any) {
  const props = {
    ...item.props,
    mode: "stage",
  };
  return (
    <DynamicEngine
      key={item.id}
      mode="stage"
      loader={loader}
      componentName={item.name}
      componentProps={props}
      onValuesChange={() => {}}
    />
  );
}

export function renderForm(loader: Loader, config: BuildingComponent) {
  const { formSettings, composes } = config;
  const formItemList = composes.map((item: any) => ({
    ...item,
    id: nanoid(),
    type: ComponentType.Bricks,
  }));
  return (
    <Form
      {...convertFormSettings(formSettings)}
      initialValues={resolveFormInitialValues(config.composes as StageItem[])}
    >
      {formItemList.map((item) => renderFormItem(loader, item))}
    </Form>
  );
}

const Stage: React.FC = () => {
  const {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    formSettings,
    formInitialValues,
    stageItemList,
    emptyImageType,
    handleSort,
    handleSelect,
    handleStageItemPropsChange,
    // handleInitialValuesChange,
  } = useContext(EditorContext);

  const isNotEmpty = stageItemList && stageItemList.length;
  const classes = classnames("stage", "uniform-scrollbar", {
    "empty-list": !isNotEmpty,
  });

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
    backgroundColor = stageActiveColor ? stageActiveColor : "#1890ff2b";
    $collaOutline && ($collaOutline.style["backgroundColor"] = backgroundColor);
  } else if (canDrop) {
    backgroundColor = stageDropColor ? stageDropColor : "#1890ff1c";
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
      handleStageItemPropsChange &&
        handleStageItemPropsChange(index, changedValues, allValues);
    }
    return (
      <SortableItem
        key={item.id}
        id={item.id}
        index={index}
        moveFormItem={moveFormItem}
        onClick={() => handleSelect && handleSelect(index)}
      >
        <DynamicEngine
          mode={Mode.Stage}
          componentName={item.name}
          componentProps={item.props}
          onValuesChange={handleValuesChange}
        />
      </SortableItem>
    );
  }

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...formInitialValues });
  });

  return (
    <div ref={drop} className={classes} style={{ backgroundColor }}>
      {isNotEmpty ? (
        // onValuesChange={handleInitialValuesChange}
        <Form form={form} {...convertFormSettings(formSettings)}>
          {stageItemList.map((item, index) => renderItem(item, index))}
        </Form>
      ) : (
        <Empty
          image={emptyImageType}
          description="赶快拖拽组件来组合你的表单页面吧~"
        />
      )}
    </div>
  );
};

Stage.displayName = "Stage";

export default Stage;
