import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

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
  rows?: number;
  mode?: string; // output, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

function Stage(props: PropsType) {
  const { label, name, placeholder, rows } = props;
  return (
    <Form.Item label={label} name={name}>
      <TextArea placeholder={placeholder} rows={rows} />
    </Form.Item>
  );
}

function Attr(props: PropsType) {
  const { name, value, label, placeholder, rows, onValuesChange } = props;
  return (
    <Form
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      labelAlign="left"
      initialValues={{
        name,
        value,
        rows,
        label,
        placeholder,
      }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="默认值" name="value">
        <TextArea placeholder="请输入" rows={3} allowClear />
      </Form.Item>
      <Form.Item label="rows" name="rows">
        <Input type="number" placeholder="请输入" />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" />
      </Form.Item>
    </Form>
  );
}

const RemarkTextArea: React.FC<PropsType> = (props) => {
  switch (props.mode) {
    case "stage":
      return Stage(props);
    case "attr":
      return Attr(props);
    default:
      return Stage(props);
  }
};

RemarkTextArea.defaultProps = {
  value: "撸起袖子加油干！",
  label: "备注",
  name: "remark",
  rows: 3,
  placeholder: "请输入",
  mode: "stage",
};

export default RemarkTextArea;