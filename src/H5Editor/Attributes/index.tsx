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
  const className = classnames("attributes", { collapse: !props.collapse });
  const {
    selectedStageItemIndex,
    currentProps,
    stageItemList,
    handlePropsChange,
  } = useContext(EditorContext);

  function renderAttr() {
    function handleValuesChange(changedValues: any, allValues: any) {
      handlePropsChange &&
        handlePropsChange(changedValues, allValues, selectedStageItemIndex);
    }

    const config = stageItemList[selectedStageItemIndex];
    return config ? (
      <div key={selectedStageItemIndex}>
        <BrickDynamicEngine
          mode="attr"
          componentName={config.name}
          componentProps={currentProps}
          onValuesChange={handleValuesChange}
        />
      </div>
    ) : (
      <div></div>
    );
  }

  return (
    <div className={className}>
      <div className="title">属性设置</div>
      <div className="list">{renderAttr()}</div>
    </div>
  );
};

Attributes.displayName = "Attributes";

export default Attributes;
