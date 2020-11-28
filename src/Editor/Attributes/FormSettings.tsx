import React, { useContext } from "react";
import { Form, Select, Input } from "antd";
import { FormSettingsProps } from "../types";
import { defaultFormSettings } from "../constants";
import { EditorContext } from "../index";

const { Option } = Select;

const FormGlobalSettings: React.FC<FormSettingsProps> = (props) => {
  const {
    handleFormSettingsChange,
    attLabelWrapperCol = [12, 12],
  } = useContext(EditorContext);

  return (
    <Form
      {...{
        labelCol: { span: attLabelWrapperCol[0] },
        wrapperCol: { span: attLabelWrapperCol[1] },
      }}
      labelAlign="left"
      initialValues={{ ...props }}
      onValuesChange={handleFormSettingsChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="colon" name="colon">
        <Select
          style={{ width: "100%", textAlign: "left" }}
          placeholder="请选择"
        >
          <Option value="true">带冒号(:)</Option>
          <Option value="false">不带冒号(:)</Option>
        </Select>
      </Form.Item>
      <Form.Item label="preserve" name="preserve">
        <Select
          style={{ width: "100%", textAlign: "left" }}
          placeholder="请选择"
        >
          <Option value="true">保留</Option>
          <Option value="false">不保留</Option>
        </Select>
      </Form.Item>
      <Form.Item label="layout" name="layout">
        <Select
          style={{ width: "100%", textAlign: "left" }}
          placeholder="请选择"
        >
          <Option value="horizontal">horizontal</Option>
          <Option value="vertical">vertical</Option>
          <Option value="inline">inline</Option>
        </Select>
      </Form.Item>
      <Form.Item label="labelAlign" name="labelAlign">
        <Select
          style={{ width: "100%", textAlign: "left" }}
          placeholder="请选择"
        >
          <Option value="right">right</Option>
          <Option value="left">left</Option>
        </Select>
      </Form.Item>
      <Form.Item label="labelCol" name="labelCol">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item label="wrapperCol" name="wrapperCol">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
    </Form>
  );
};

FormGlobalSettings.defaultProps = { ...defaultFormSettings };

FormGlobalSettings.displayName = "FormGlobalSettings";

export default FormGlobalSettings;
