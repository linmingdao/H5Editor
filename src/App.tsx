import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import H5Editor, { renderForm } from "./Editor";
import {
  AppstoreOutlined,
  SettingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <H5Editor
          tmplPanelWidth={300}
          attrPanelWidth={380}
          stageBgColor="#f3f2f2a3"
          stageActiveColor="#1890ff2b"
          stageDropColor="#1890ff1c"
          className="blink-border"
          attLabelWrapperCol={[7, 17]}
          style={{ width: 1200, height: 700 }}
          enableBuildingsFormSettings={true}
          bricks={{
            icon: <SettingOutlined translate="" />,
            loader: (name: string) => () => import(`./Bricks/${name}`),
            getComponents: () => [
              {
                label: "测试异常组件",
                name: "DataSourceSelectXXX",
                props: {
                  value: "source2",
                },
              },
              {
                label: "数据源",
                name: "DataSourceSelect",
                // 不用提供props属性，会自动读取基础组件里面的props属性，
                // 而且只会设置有提供值的，没有值的会用基础组件里面的默认值代替
                props: {
                  value: "source1",
                },
              },
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "我是输入框的默认值",
                },
              },
              {
                label: "密码框",
                name: "PasswordInput",
                props: {
                  value: "123456",
                },
              },
              {
                label: "文本域",
                name: "TextArea",
                // 可以不用设置props属性，如果你想去覆盖的话，可以设置
                props: {
                  label: "文本信息",
                  value: "我是文本域的默认值",
                  rows: 3,
                  placeholder: "请输入",
                },
              },
            ],
          }}
          buildings={[
            {
              icon: <AppstoreOutlined translate="" />,
              title: "模板组件",
              getComponents: () => [
                {
                  label: "文章模板",
                  formSettings: {
                    name: "loginForm",
                    colon: "true",
                    preserve: "true",
                    layout: "horizontal",
                    labelAlign: "right",
                    labelCol: 6,
                    wrapperCol: 18,
                  },
                  composes: [
                    {
                      label: "标题",
                      name: "TextInput",
                      props: {
                        label: "文章标题",
                        name: "title",
                        value: "H5表单编辑器",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "作者",
                      name: "TextInput",
                      props: {
                        label: "文章作者",
                        name: "author",
                        value: "朴朴",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "文章内容",
                      name: "TextArea",
                      props: {
                        label: "文章内容",
                        name: "content",
                        value: "朴朴",
                        placeholder: "请输入",
                      },
                    },
                  ],
                },
                {
                  label: "用户登录模板",
                  formSettings: {
                    name: "loginForm",
                    colon: "false",
                    preserve: "false",
                    layout: "horizontal",
                    labelAlign: "left",
                    labelCol: 12,
                    wrapperCol: 12,
                  },
                  composes: [
                    {
                      label: "输入框",
                      name: "TextInput",
                      props: {
                        label: "输入用户名",
                        name: "username",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "密码框",
                      name: "PasswordInput",
                      props: {
                        label: "请输入密码",
                        name: "password",
                        placeholder: "再次输入",
                      },
                    },
                  ],
                },
              ],
              updateComponents: (composes: any, formSettings: any) => {
                console.log("模板组件");
                console.log(
                  JSON.stringify({ label: "文章模板", formSettings, composes })
                );
              },
            },
            {
              icon: <PieChartOutlined translate="" />,
              title: "业务组件",
              getComponents: () => [
                {
                  label: "文章模板",
                  formSettings: {
                    name: "loginForm",
                    colon: "true",
                    preserve: "true",
                    layout: "horizontal",
                    labelAlign: "right",
                    labelCol: 12,
                    wrapperCol: 12,
                  },
                  composes: [
                    {
                      label: "标题",
                      name: "TextInput",
                      props: {
                        label: "文章标题",
                        name: "title",
                        value: "H5表单编辑器",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "作者",
                      name: "TextInput",
                      props: {
                        label: "文章作者",
                        name: "author",
                        value: "朴朴",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "文章内容",
                      name: "TextArea",
                      props: {
                        label: "文章内容",
                        name: "content",
                        value: "朴朴",
                        placeholder: "请输入",
                      },
                    },
                  ],
                },
                {
                  label: "用户登录模板",
                  formSettings: {
                    name: "loginForm",
                    colon: "false",
                    preserve: "false",
                    layout: "horizontal",
                    labelAlign: "left",
                    labelCol: 4,
                    wrapperCol: 20,
                  },
                  composes: [
                    {
                      label: "输入框",
                      name: "TextInput",
                      props: {
                        label: "输入用户名",
                        name: "username",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "密码框",
                      name: "PasswordInput",
                      props: {
                        label: "请输入密码",
                        name: "password",
                        placeholder: "再次输入",
                      },
                    },
                  ],
                },
              ],
              updateComponents: (composes: any, formSettings: any) => {
                console.log("业务组件");
                console.log({ label: "文章模板", formSettings, composes });
              },
            },
          ]}
        />

        <div
          style={{
            width: 1200,
            backgroundColor: "#fff",
            padding: 40,
            marginTop: 30,
          }}
        >
          {renderForm((name: string) => () => import(`./Bricks/${name}`), {
            label: "文章模板",
            formSettings: {
              name: "4A9-SpMprc7uFj5K44Xmu",
              colon: "false",
              preserve: "true",
              layout: "vertical",
              labelAlign: "right",
              labelCol: 6,
              wrapperCol: "24",
            },
            composes: [
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "我是输入框的默认值",
                  name: "lGFo_a1drhQc8ND6zAkIz",
                },
                id: "Q8YOJMpDNgGNZrB0juY26",
                type: "bricks",
              },
              {
                label: "文本域",
                name: "TextArea",
                props: {
                  label: "文本信息",
                  value: "我是文本域的默认值",
                  rows: 3,
                  placeholder: "请输入",
                  name: "Hv6tT7NE2W1hdfSiXUJe0",
                },
                id: "U-de_FZxLjI42e9YTQzDr",
                type: "bricks",
              },
              {
                label: "数据源",
                name: "DataSourceSelect",
                props: { value: "source1", name: "JEVkslxDwlmC0IzNlSG0q" },
                id: "P1g_mf5aFg5o1Vzp9L4Nh",
                type: "bricks",
              },
              {
                label: "密码框",
                name: "PasswordInput",
                props: { value: "123456", name: "22QFwksx--O4jItKMyI9x" },
                id: "Gx0rmbPLCiwfgDD8-DyAD",
                type: "bricks",
              },
            ],
          })}
        </div>
      </header>
    </div>
  );
};

export default App;
