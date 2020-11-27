import { nanoid } from "nanoid";
import { ComponentType } from "./constants";
import {
  BrickTemplate,
  BuildingTemplateGroup,
  BuildingTemplateGroupList,
  UniformTmplGroupList,
  FormGlobalSettingsProps,
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

export function convertGlobalFormSettings(
  globalFormSettings: FormGlobalSettingsProps
) {
  return {
    ...globalFormSettings,
    colon:
      globalFormSettings.colon && globalFormSettings.colon === "true"
        ? true
        : false,
    preserve:
      globalFormSettings.preserve && globalFormSettings.preserve === "true"
        ? true
        : false,
    labelCol: {
      span: globalFormSettings.labelCol ? globalFormSettings.labelCol : 6,
    },
    wrapperCol: {
      span: globalFormSettings.wrapperCol ? globalFormSettings.wrapperCol : 18,
    },
  };
}
