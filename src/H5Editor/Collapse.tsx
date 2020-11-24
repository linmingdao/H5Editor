import React from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

interface CollapseProps {
  collapse: boolean;
  onClick: () => void;
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { onClick, collapse } = props;
  return (
    <div className="colla-outline">
      <span className="colla" onClick={onClick}>
        {collapse ? (
          <DoubleRightOutlined style={{ fontSize: 15 }} translate="" />
        ) : (
          <DoubleLeftOutlined style={{ fontSize: 15 }} translate="" />
        )}
      </span>
    </div>
  );
};

Collapse.displayName = "Collapse";

export default Collapse;
