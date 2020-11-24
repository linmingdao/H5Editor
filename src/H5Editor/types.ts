import React from "react";

export type Loader = (name: string) => any;

export interface ObjProps {
  [key: string]: any;
}

// 传入 H5Editor 的 props 结构定义

export interface BrickComponent {
  label: string;
  name: string;
  loader?: Loader;
  props?: ObjProps;
}

export interface BrickTemplate {
  icon?: React.ReactNode;
  loader: Loader;
  getComponents?: () => BrickComponent[];
}

export interface BuildingComponent {
  label: string;
  composes: BrickComponent[];
}

export interface BuildingTemplateGroup {
  icon?: React.ReactNode;
  title: string;
  getComponents?: () => BuildingComponent[];
  updateComponents?: () => void;
}

export type BuildingTemplateGroupList = BuildingTemplateGroup[];

// 基础组件 和 建筑组件 统一的数据结构

export interface UniformBrickTmplProps {
  [key: string]: any;
}

export interface UniformBrickTmpl {
  type: "Bricks";
  label: string;
  name: string;
  props: UniformBrickTmplProps;
}

export interface UniformBuildingTmpl {
  type: "Buildings";
  label: string;
  composes: UniformBrickTmpl[];
}

// 统一的模板组件分组
export interface UniformTmplGroup {
  icon?: any;
  // 非 Bricks 组件无 loader
  loader?: Loader;
  title: string;
  components: any[];
}

// 统一的模板组件分组列表
export type UniformTmplGroupList = UniformTmplGroup[];

export interface H5EditorProps {
  brickTemplate: BrickTemplate;
  buildingTemplateGroupList: BuildingTemplateGroupList;
  className?: string;
  style?: React.CSSProperties;
}

export type SelectedCallback = (selectedIndex: number) => void;

export type NoSelectedCallback = () => void;

export interface H5EditorContext {
  uniformTmplGroupList: UniformTmplGroupList;
  stageItemList: StageItem[];
  selectedStageItemIndex: number;
  currentProps: any;
  handlePropsChange?: (
    changedValues: any,
    allValues: any,
    selectedIndex: number
  ) => void;
  handleDrop?: (item: any) => void;
  handleCopy?: SelectedCallback;
  handleRemove?: SelectedCallback;
  handleSelect?: SelectedCallback;
  handleClear?: NoSelectedCallback;
  handleReset?: NoSelectedCallback;
  handleUndo?: NoSelectedCallback;
  handleRedo?: NoSelectedCallback;
  handleSave?: NoSelectedCallback;
}

export interface StageItem {
  id: string;
  name: string;
  props: any;
}

export interface BrickSchema {
  onAttributesChange: (attrs: any) => void;
}
