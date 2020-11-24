import React, { useContext, useState } from "react";
import Toolbar from "./Toolbar";
import Templates from "./Templates";
import Stage from "./Stage";
import Collapse from "./Collapse";
import Attributes from "./Attributes";
import { EditorContext } from "./index";

const Editor: React.FC = () => {
  const [collapse, setCollapse] = useState(true);
  const { selectedStageItemIndex } = useContext(EditorContext);

  return (
    <div className="editor">
      {/* 工具栏 */}
      <Toolbar />
      <div className="content">
        {/* 模板列表 */}
        <Templates />
        {/* 布局编辑器 */}
        <Stage />
        {/* 展开、收起属性编辑器 */}
        <Collapse
          collapse={selectedStageItemIndex >= 0 && collapse}
          onClick={() => setCollapse(!collapse)}
        />
        {/* 组件属性编辑器 */}
        <Attributes collapse={selectedStageItemIndex >= 0 && collapse} />
      </div>
    </div>
  );
};

Editor.displayName = "Editor";

export default Editor;
