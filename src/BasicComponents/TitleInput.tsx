import React from "react";
import { Select, Form, Input } from "antd";

const { Option } = Select;

interface ColSpan {
  span: number;
}

interface PropsType {
  labelCol: ColSpan;
  wrapperCol: ColSpan;
  label?: string;
  name?: string;
  placeholder?: string;
  backgroundColor?: string;
  mode?: string; // tpl, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

function Stage(props: PropsType) {
  const {
    label,
    name,
    placeholder,
    backgroundColor,
    labelCol,
    wrapperCol,
    onValuesChange,
  } = props;
  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onValuesChange={(changedValues, allValues) =>
        onValuesChange(changedValues, allValues)
      }
    >
      <Form.Item label={label} name={name}>
        <Input style={{ backgroundColor }} placeholder={placeholder} />
      </Form.Item>
    </Form>
  );
}

function Attr(props: PropsType) {
  const { label, placeholder, backgroundColor, onValuesChange } = props;
  return (
    <Form
      {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
      labelAlign="left"
      initialValues={{
        label,
        placeholder,
        backgroundColor,
      }}
      onValuesChange={(changedValues, allValues) =>
        onValuesChange(changedValues, allValues)
      }
    >
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="background" name="backgroundColor">
        <Select style={{ width: "100%" }} placeholder={placeholder}>
          <Option value="#fff">white</Option>
          <Option value="#40a9ff">blue</Option>
          <Option value="yellow">yellow</Option>
          <Option value="green">green</Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

const TitleInput: React.FC<PropsType> = (props) => {
  const { mode } = props;
  return mode === "stage" ? Stage(props) : Attr(props);
};

TitleInput.defaultProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  label: "标题",
  name: "title",
  backgroundColor: "#fff",
  placeholder: "请输入",
  mode: "stage",
};

export default TitleInput;
