import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

interface RemarkTextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  mode?: string; // tpl, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

const RemarkTextArea: React.FC<RemarkTextAreaProps> = ({
  mode,
  label,
  name,
  rows,
  placeholder,
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
            <TextArea placeholder={placeholder} rows={rows} />
          </Form.Item>
        </Form>
      );
    } else if (mode === "attr") {
      return (
        <Form
          {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
          labelAlign="left"
          initialValues={{
            rows,
            label,
            placeholder,
          }}
          onValuesChange={handleValuesChange}
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
    } else {
      return <div></div>;
    }
  }

  return renderResult();
};

RemarkTextArea.defaultProps = {
  label: "备注",
  name: "remark",
  rows: 3,
  placeholder: "请输入",
  mode: "stage",
};

export default RemarkTextArea;
