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
  mode?: string; // output, stage, attr
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
        <Option value="source1">source 1</Option>
        <Option value="source2">source 2</Option>
        <Option value="source3">source 3</Option>
      </Select>
    </Form.Item>
  );
}

// function Stage(props: PropsType) {
//   const { labelCol, wrapperCol, name, value, onValuesChange } = props;
//   const initialValues = { [name as string]: value };
//   return (
//     <Form
//       labelCol={labelCol}
//       wrapperCol={wrapperCol}
//       initialValues={initialValues}
//       onValuesChange={onValuesChange}
//     >
//       {Output(props)}
//     </Form>
//   );
// }

function Attr(props: PropsType) {
  const { label, placeholder, onValuesChange } = props;
  return (
    <Form
      {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
      labelAlign="left"
      initialValues={{
        label,
        placeholder,
      }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" />
      </Form.Item>
    </Form>
  );
}

const MysqlDataSourceSelect: React.FC<PropsType> = (props) => {
  const { mode } = props;
  switch (mode) {
    case "stage":
      return Stage(props);
    case "attr":
      return Attr(props);
    default:
      return Stage(props);
  }
};

MysqlDataSourceSelect.defaultProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  value: "source2",
  label: "数据源",
  name: "source",
  placeholder: "请选择数据源",
  mode: "stage",
};

export default MysqlDataSourceSelect;
