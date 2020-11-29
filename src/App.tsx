import React from 'react'
import 'antd/dist/antd.css'
import './App.css'
import H5Editor from './Editor'
import {
  AppstoreOutlined,
  SettingOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import { renderForm } from './Editor/index'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            width: 1200,
            backgroundColor: '#fff',
            padding: 50,
            marginTop: 50,
          }}
        >
          {renderForm((name: string) => () => import(`./Bricks/${name}`), {
            label: '文章模板',
            formSettings: {
              name: 'loginForm',
              colon: 'true',
              preserve: 'true',
              layout: 'horizontal',
              labelAlign: 'right',
              labelCol: 4,
              wrapperCol: 20,
            },
            composes: [
              {
                label: '标题',
                name: 'TextInput',
                props: {
                  label: '文章标题',
                  name: 'title',
                  value: 'H5表单编辑器',
                  placeholder: '请输入',
                },
              },
              {
                label: '作者',
                name: 'TextInput',
                props: {
                  label: '文章作者',
                  name: 'author',
                  value: '朴朴',
                  placeholder: '请输入',
                },
              },
              {
                label: '文章内容',
                name: 'TextArea',
                props: {
                  label: '文章内容',
                  name: 'content',
                  value: '朴朴',
                  rows: 10,
                  placeholder: '请输入',
                },
              },
            ],
          })}
        </div>

        <H5Editor
          tmplPanelWidth={300}
          attrPanelWidth={300}
          stageBgColor="#f3f2f2a3"
          stageActiveColor="#1890ff2b"
          stageDropColor="#1890ff1c"
          className="blink-border"
          attLabelWrapperCol={[12, 12]}
          style={{ width: 1200, height: 700 }}
          enableBuildingsFormSettings={true}
          bricks={{
            icon: <SettingOutlined translate="" />,
            loader: (name: string) => () => import(`./Bricks/${name}`),
            getComponents: () => [
              {
                label: '测试异常组件',
                name: 'DataSourceSelectXXX',
              },
              {
                label: '数据源',
                name: 'DataSourceSelect',
                // 不用提供props属性，会自动读取基础组件里面的props属性，
                // 而且只会设置有提供值的，没有值的会用基础组件里面的默认值代替
              },
              {
                label: '输入框',
                name: 'TextInput',
              },
              {
                label: '密码框',
                name: 'PasswordInput',
              },
              {
                label: '文本域',
                name: 'TextArea',
                // 可以不用设置props属性，如果你想去覆盖的话，可以设置
                props: {
                  label: '文本信息',
                  name: 'remark',
                  rows: 3,
                  placeholder: '请输入',
                },
              },
            ],
          }}
          buildings={[
            {
              icon: <AppstoreOutlined translate="" />,
              title: '模板组件',
              getComponents: () => [
                {
                  label: '文章模板',
                  formSettings: {
                    name: 'loginForm',
                    colon: 'true',
                    preserve: 'true',
                    layout: 'horizontal',
                    labelAlign: 'right',
                    labelCol: 12,
                    wrapperCol: 12,
                  },
                  composes: [
                    {
                      label: '标题',
                      name: 'TextInput',
                      props: {
                        label: '文章标题',
                        name: 'title',
                        value: 'H5表单编辑器',
                        placeholder: '请输入',
                      },
                    },
                    {
                      label: '作者',
                      name: 'TextInput',
                      props: {
                        label: '文章作者',
                        name: 'author',
                        value: '朴朴',
                        placeholder: '请输入',
                      },
                    },
                    {
                      label: '文章内容',
                      name: 'TextArea',
                      props: {
                        label: '文章内容',
                        name: 'content',
                        value: '朴朴',
                        placeholder: '请输入',
                      },
                    },
                  ],
                },
                {
                  label: '用户登录模板',
                  formSettings: {
                    name: 'loginForm',
                    colon: 'false',
                    preserve: 'false',
                    layout: 'horizontal',
                    labelAlign: 'left',
                    labelCol: 4,
                    wrapperCol: 20,
                  },
                  composes: [
                    {
                      label: '输入框',
                      name: 'TextInput',
                      props: {
                        label: '输入用户名',
                        name: 'username',
                        placeholder: '请输入',
                      },
                    },
                    {
                      label: '密码框',
                      name: 'PasswordInput',
                      props: {
                        label: '请输入密码',
                        name: 'password',
                        placeholder: '再次输入',
                      },
                    },
                  ],
                },
              ],
              updateComponents: () => {},
            },
          ]}
        />
      </header>
    </div>
  )
}

export default App
