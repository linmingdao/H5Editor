import { nanoid } from "nanoid";
import { FormGlobalSettingsProps } from "./types";

export enum ComponentType {
  Bricks = "bricks",
  Buildings = "buildings",
}

export enum Mode {
  Stage = "stage",
  Attr = "attr",
  Output = "output",
}

export const FormGlobalSettingsDefaultProps: FormGlobalSettingsProps = {
  name: `name_${nanoid()}`,
  colon: "true",
  preserve: "true",
  layout: "horizontal",
  labelAlign: "right",
  labelCol: 6,
  wrapperCol: 18,
};
