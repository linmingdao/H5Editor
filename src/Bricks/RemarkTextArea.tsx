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

function Output(props: PropsType) {
  const { label, name, placeholder, rows } = props;
  return (
    <Form.Item label={label} name={name}>
      <TextArea placeholder={placeholder} rows={rows} />
    </Form.Item>
  );
}

function Stage(props: PropsType) {
  const { labelCol, wrapperCol, name, value, onValuesChange } = props;
  const initialValues = { [name as string]: value };
  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      {Output(props)}
    </Form>
  );
}

function Attr(props: PropsType) {
  const { label, placeholder, rows, onValuesChange } = props;
  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      labelAlign="left"
      initialValues={{
        rows,
        label,
        placeholder,
      }}
      onValuesChange={onValuesChange}
    >
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
  const { mode } = props;
  switch (mode) {
    case "stage":
      return Stage(props);
    case "attr":
      return Attr(props);
    default:
      return Output(props);
  }
};

RemarkTextArea.defaultProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  value: "撸起袖子加油干！",
  label: "备注",
  name: "remark",
  rows: 3,
  placeholder: "请输入",
  mode: "stage",
};

export default RemarkTextArea;
