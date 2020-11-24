import { nanoid } from "nanoid";
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
      loader: brickTemplate.loader,
      group: "Bricks",
      title: "基础组件",
      // [ { id, type:"Bricks", label, name, props } ]
      components:
        (brickTemplate.getComponents &&
          brickTemplate.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: "Bricks",
          }))) ||
        [],
    },
    ...buildingTemplateGroupList.map((item: BuildingTemplateGroup) => ({
      icon: item.icon,
      group: item.group,
      title: item.title,
      components:
        (item.getComponents &&
          item.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: "",
          }))) ||
        [],
    })),
  ];
}
