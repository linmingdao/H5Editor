import React, { useContext, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import List from "./List";
import Item from "./Item";
import { EditorContext } from "../index";

const Templates: React.FC = () => {
  const { uniformTmplGroupList } = useContext(EditorContext);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentComponents, setCurrentComponents] = useState(
    uniformTmplGroupList[0]["components"]
  );
  const handleSelect = (item: any) => {
    setCurrentGroupIndex(item.key);
    setCurrentComponents(uniformTmplGroupList[item.key]["components"]);
  };

  return (
    <div className="templates">
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
      <div className="category">
        <div className="title">
          {uniformTmplGroupList[currentGroupIndex]["title"]}
        </div>
        <List>
          {currentComponents.map((item: any) => (
            <Item key={item.name} config={item} />
          ))}
        </List>
      </div>
    </div>
  );
};

Templates.displayName = "Templates";

export default Templates;
