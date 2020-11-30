import { nanoid } from "nanoid";
import { ComponentType } from "./constants";
import {
  StageItem,
  BrickTemplate,
  BuildingTemplateGroup,
  BuildingTemplateGroupList,
  UniformTmplGroupList,
  FormSettingsProps,
} from "./types";

/**
 * 获取统一的模板数据结构
 * @param bricks 基础模板
 * @param buildings 业务模板
 */
export function getUniformTmplGroupList(
  bricks: BrickTemplate,
  buildings: BuildingTemplateGroupList
): UniformTmplGroupList {
  return [
    // 基础组件分组信息
    {
      icon: bricks.icon,
      title: "基础组件",
      loader: bricks.loader,
      // [ { id, type: "Bricks", label, name, props } ]
      components:
        (bricks.getComponents &&
          bricks.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
          }))) ||
        [],
    },
    // 建筑组件分组
    ...buildings.map((item: BuildingTemplateGroup) => ({
      icon: item.icon,
      title: item.title,
      // [ { id, type: "Buildings", label, composes } ]
      components:
        (item.getComponents &&
          item.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Buildings,
          }))) ||
        [],
    })),
  ];
}

export function convertFormSettings(settings: FormSettingsProps = {}) {
  return {
    ...settings,
    colon: settings.colon && settings.colon === "true" ? true : false,
    preserve: settings.preserve && settings.preserve === "true" ? true : false,
    labelCol: {
      span: settings.labelCol ? Number(settings.labelCol) : 6,
    },
    wrapperCol: {
      span: settings.wrapperCol ? Number(settings.wrapperCol) : 18,
    },
  };
}

// TODO:解析表单的初始值
export function resolveFormInitialValues(stageItemList: StageItem[]) {
  // console.log(stageItemList);
  const initialValues: any = {};
  stageItemList.forEach((item) => {
    const { value, name } = item.props;
    if (typeof value !== "undefined") {
      initialValues[name] = value;
    }
  });
  return initialValues;
}

// TODO:检查 name 的唯一性
export function checkStageItemNamesUnicity(stageItemList: StageItem[]) {}
