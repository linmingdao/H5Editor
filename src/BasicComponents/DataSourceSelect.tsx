import React from "react";
import { Select, Form, Input } from "antd";
const { Option } = Select;

interface MysqlDataSourceSelectProps {
  label?: string;
  name?: string;
  placeholder?: string;
  mode?: string; // tpl, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void;
}

const MysqlDataSourceSelect: React.FC<MysqlDataSourceSelectProps> = ({
  mode,
  label,
  name,
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
            <Select style={{ width: "100%" }} placeholder={placeholder}>
              <Option value="source1">source 1</Option>
              <Option value="source2">source 2</Option>
              <Option value="source3">source 3</Option>
            </Select>
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
          }}
          onValuesChange={handleValuesChange}
        >
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

MysqlDataSourceSelect.defaultProps = {
  label: "数据源",
  name: "source",
  placeholder: "请选择数据源",
  mode: "stage",
};

export default MysqlDataSourceSelect;
