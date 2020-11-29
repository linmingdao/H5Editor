import React from 'react'
import { Select, Form, Input } from 'antd'

const { Option } = Select

interface ColSpan {
  span: number
}

interface PropsType {
  labelCol: ColSpan
  wrapperCol: ColSpan
  value?: string
  name?: string
  label?: string
  placeholder?: string
  backgroundColor?: string
  mode?: string // output, stage, attr
  onValuesChange: (changedValues: any, allValues: any) => void
}

function Stage(props: PropsType) {
  const { label, name, placeholder, backgroundColor } = props
  return (
    <Form.Item label={label} name={name}>
      <Input.Password style={{ backgroundColor }} placeholder={placeholder} />
    </Form.Item>
  )
}

function Attr(props: PropsType) {
  const {
    name,
    label,
    value,
    placeholder,
    backgroundColor,
    onValuesChange,
  } = props
  return (
    <Form
      {...{ labelCol: { span: 12 }, wrapperCol: { span: 12 } }}
      labelAlign="left"
      initialValues={{
        label,
        name,
        value,
        placeholder,
        backgroundColor,
      }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="name" name="name">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="默认值" name="value">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="label" name="label">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="背景色" name="backgroundColor">
        <Select
          style={{ width: '100%', textAlign: 'left' }}
          placeholder="请选择背景色"
          allowClear
        >
          <Option value="#fff">white</Option>
          <Option value="#40a9ff">blue</Option>
          <Option value="yellow">yellow</Option>
          <Option value="green">green</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

const TextInput: React.FC<PropsType> = (props) => {
  switch (props.mode) {
    case 'stage':
      return Stage(props)
    case 'attr':
      return Attr(props)
    default:
      return Stage(props)
  }
}

TextInput.defaultProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  value: '基于 Ant Design 的表单编辑器',
  name: 'title',
  label: '标题',
  backgroundColor: '#fff',
  placeholder: '请输入',
  mode: 'stage',
}

export default TextInput
