import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import H5Editor from "./H5Editor";
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
          brickTemplate={{
            icon: <SettingOutlined translate="" />,
            loader: (name: string) => () => import(`./BasicComponents/${name}`),
            getComponents: () => [
              {
                label: "数据源",
                name: "DataSourceSelect",
                // 不用提供props属性，会自动读取基础组件里面的props属性，
                // 而且只会设置有提供值的，没有值的会用基础组件里面的默认值代替
              },
              {
                label: "备注",
                name: "RemarkTextArea",
                // 可以不用设置props属性，如果你想去覆盖的话，可以设置
                props: {
                  label: "备注sssss",
                  name: "remark",
                  rows: 3,
                  placeholder: "请输入",
                  mode: "stage",
                },
              },
              {
                label: "标题",
                name: "TitleInput",
              },
            ],
          }}
          buildingTemplateGroupList={[
            {
              icon: <AppstoreOutlined translate="" />,
              title: "模板组件",
              getComponents: () => [
                {
                  label: "用户登录",
                  composes: [
                    {
                      label: "Mysql数据源",
                      name: "UserName",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
                      },
                    },
                    {
                      label: "Mysql数据源",
                      name: "UserPassword",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
                      },
                    },
                  ],
                },
                {
                  label: "确认密码",
                  composes: [
                    {
                      label: "Mysql数据源",
                      name: "UserPassword",
                      props: {
                        label: "输入密码",
                        name: "password1",
                        value: "",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "Mysql数据源",
                      name: "UserPassword",
                      props: {
                        label: "确认密码",
                        name: "password2",
                        value: "",
                        placeholder: "再次输入",
                      },
                    },
                  ],
                },
              ],
              updateComponents: () => {},
            },
            {
              icon: <PieChartOutlined translate="" />,
              title: "业务组件",
              getComponents: () => [
                {
                  label: "设置下载地址",
                  composes: [
                    {
                      label: "Mysql数据源",
                      name: "UserName",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
                      },
                    },
                    {
                      label: "Mysql数据源",
                      name: "UserPassword",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
                      },
                    },
                  ],
                },
                {
                  label: "设置Apollo数据源",
                  composes: [
                    {
                      label: "Mysql数据源",
                      name: "UserName",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
                      },
                    },
                    {
                      label: "Mysql数据源",
                      name: "UserPassword",
                      props: {
                        label: "数据源",
                        name: "source",
                        value: "",
                        placeholder: "请选择数据源",
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
  );
};

export default App;
