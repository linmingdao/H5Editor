import { nanoid } from "nanoid";
import { ComponentType } from "./constants";
import {
  BrickTemplate,
  BuildingTemplateGroup,
  BuildingTemplateGroupList,
  UniformTmplGroupList,
} from "./types";

/**
 * 获取统一的模板数据结构
 * @param brickTemplate 基础模板
 * @param buildingTemplateGroupList 业务模板
 */
export function getUniformTmplGroupList(
  brickTemplate: BrickTemplate,
  buildingTemplateGroupList: BuildingTemplateGroupList
): UniformTmplGroupList {
  return [
    // 基础组件分组信息
    {
      icon: brickTemplate.icon,
      title: "基础组件",
      loader: brickTemplate.loader,
      // [ { id, type: "Bricks", label, name, props } ]
      components:
        (brickTemplate.getComponents &&
          brickTemplate.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
          }))) ||
        [],
    },
    // 建筑组件分组
    ...buildingTemplateGroupList.map((item: BuildingTemplateGroup) => ({
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
