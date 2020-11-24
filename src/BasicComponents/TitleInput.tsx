import React from "react";
import { Select, Form, Input } from "antd";

const { Option } = Select;

interface TitleInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  backgroundColor: string;
  mode?: string; // tpl, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({
  mode,
  label,
  name,
  placeholder,
  backgroundColor,
  onValuesChange,
}) => {
  function renderResult() {
    function handleValuesChange(changedValues: any, allValues: any) {
      onValuesChange(changedValues, allValues);
    }

    if (mode === "stage") {
      return (
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
          onValuesChange={handleValuesChange}
        >
          <Form.Item label={label} name={name}>
            <Input style={{ backgroundColor }} placeholder={placeholder} />
          </Form.Item>
        </Form>
      );
    } else if (mode === "attr") {
      return (
        <Form
          {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
          labelAlign="left"
          initialValues={{
            label,
            placeholder,
            backgroundColor,
          }}
          onValuesChange={handleValuesChange}
        >
          <Form.Item label="label" name="label">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="placeholder" name="placeholder">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="background" name="backgroundColor">
            <Select style={{ width: "100%" }} placeholder={placeholder}>
              <Option value="#40a9ff">blue</Option>
              <Option value="yellow">yellow</Option>
              <Option value="green">green</Option>
            </Select>
          </Form.Item>
        </Form>
      );
    } else {
      return <div></div>;
    }
  }

  return renderResult();
};

TitleInput.defaultProps = {
  label: "标题",
  name: "title",
  backgroundColor: "#40a9ff",
  placeholder: "请输入",
  mode: "stage",
};

export default TitleInput;
