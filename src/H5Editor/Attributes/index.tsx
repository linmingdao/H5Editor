import React, { CSSProperties, useContext } from "react";
import classnames from "classnames";
import { EditorContext } from "../index";
import BrickDynamicEngine from "../BrickDynamicEngine";

interface IAttributes {
  collapse: boolean;
  className?: string;
  style?: CSSProperties;
}

const Attributes: React.FC<IAttributes> = (props) => {
  const className = classnames("attributes", "uniform-scrollbar", {
    collapse: !props.collapse,
  });
  const {
    attrPanelWidth,
    selectedStageItemIndex,
    stageItemList,
    handlePropsChange,
  } = useContext(EditorContext);
  const _attrPanelWidth = !props.collapse
    ? 0
    : attrPanelWidth
    ? attrPanelWidth
    : 330;

  function renderAttr() {
    function handleValuesChange(changedValues: any, allValues: any) {
      handlePropsChange &&
        handlePropsChange(changedValues, allValues, selectedStageItemIndex);
    }

    const config = stageItemList[selectedStageItemIndex];
    return config ? (
      <div>
        <BrickDynamicEngine
          key={selectedStageItemIndex}
          mode="attr"
          componentName={config.name}
          componentProps={config.props}
          onValuesChange={handleValuesChange}
        />
      </div>
    ) : (
      <div></div>
    );
  }

  return (
    <div className={className} style={{ width: _attrPanelWidth }}>
      <div className="title">属性设置</div>
      <div className="list">{renderAttr()}</div>
    </div>
  );
};

Attributes.displayName = "Attributes";

export default Attributes;
