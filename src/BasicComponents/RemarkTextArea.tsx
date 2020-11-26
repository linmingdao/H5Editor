import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

interface ColSpan {
  span: number;
}

interface PropsType {
  labelCol: ColSpan;
  wrapperCol: ColSpan;
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  mode?: string; // tpl, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

function Stage(props: PropsType) {
  const {
    label,
    name,
    placeholder,
    rows,
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
        <TextArea placeholder={placeholder} rows={rows} />
      </Form.Item>
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
      onValuesChange={(changedValues, allValues) =>
        onValuesChange(changedValues, allValues)
      }
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
  return mode === "stage" ? Stage(props) : Attr(props);
};

RemarkTextArea.defaultProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  label: "备注",
  name: "remark",
  rows: 3,
  placeholder: "请输入",
  mode: "stage",
};

export default RemarkTextArea;
