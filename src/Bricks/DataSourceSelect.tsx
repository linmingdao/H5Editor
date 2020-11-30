import React from "react";
import { Select, Form, Input } from "antd";
const { Option } = Select;

interface ColSpan {
  span: number;
}

interface PropsType {
  labelCol: ColSpan;
  wrapperCol: ColSpan;
  value?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  mode?: string; // stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

function Stage(props: PropsType) {
  const { label, name, placeholder } = props;
  return (
    <Form.Item label={label} name={name}>
      <Select
        style={{ width: "100%", textAlign: "left" }}
        placeholder={placeholder}
      >
        <Option value="source1">source1</Option>
        <Option value="source2">source2</Option>
        <Option value="source3">source3</Option>
      </Select>
    </Form.Item>
  );
}

function Attr(props: PropsType) {
  const { name, value, label, placeholder, onValuesChange } = props;
  return (
    <Form
      {...{ labelCol: { span: 7 }, wrapperCol: { span: 17 } }}
      labelAlign="left"
      initialValues={{
        name,
        value,
        label,
        placeholder,
      }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="默认值" name="value">
        <Select
          style={{ width: "100%", textAlign: "left" }}
          placeholder="请选择"
        >
          <Option value="source1">source1</Option>
          <Option value="source2">source2</Option>
          <Option value="source3">source3</Option>
        </Select>
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
    </Form>
  );
}

const MysqlDataSourceSelect: React.FC<PropsType> = (props) => {
  switch (props.mode) {
    case "stage":
      return Stage(props);
    case "attr":
      return Attr(props);
    default:
      return Stage(props);
  }
};

MysqlDataSourceSelect.defaultProps = {
  value: "source2",
  label: "数据源",
  name: "source",
  placeholder: "请选择数据源",
  mode: "stage",
};

export default MysqlDataSourceSelect;
