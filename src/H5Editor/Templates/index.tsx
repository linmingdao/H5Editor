import React, { useContext, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { EditorContext } from "../index";
import { Menu } from "antd";
import List from "./List";
import Item from "./Item";

interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

interface SelectInfo extends MenuInfo {
  selectedKeys?: React.Key[];
}

const Templates: React.FC = () => {
  const { tmplPanelWidth, uniformTmplGroupList } = useContext(EditorContext);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentComponents, setCurrentComponents] = useState(
    uniformTmplGroupList[0]["components"]
  );

  const handleSelect = (item: SelectInfo) => {
    const index = Number(item.key);
    setCurrentGroupIndex(index);
    setCurrentComponents(uniformTmplGroupList[index]["components"]);
  };

  return (
    <div
      className="templates"
      style={{ width: tmplPanelWidth ? tmplPanelWidth : 330 }}
    >
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed
        onSelect={handleSelect}
        style={{ height: "100%", width: 44, borderColor: "#dcdcdc" }}
        defaultSelectedKeys={["0"]}
      >
        {uniformTmplGroupList.map((item, index) => (
          <Menu.Item
            key={index}
            icon={item.icon ? item.icon : <SettingOutlined translate="" />}
          />
        ))}
      </Menu>
      <div className="category uniform-scrollbar">
        <div className="title">
          {uniformTmplGroupList[currentGroupIndex]["title"]}
        </div>
        <List>
          {currentComponents.map((item: any) => (
            <Item key={item.id} config={item} />
          ))}
        </List>
      </div>
    </div>
  );
};

Templates.displayName = "Templates";

export default Templates;
