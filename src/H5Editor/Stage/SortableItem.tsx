import React, { useContext, useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import classnames from "classnames";
import { EditorContext } from "../index";
import { MenuOutlined } from "@ant-design/icons";

export interface ISortableItemProps {
  id: any;
  index: number;
  moveFormItem: (dragIndex: number, hoverIndex: number) => void;
  onClick?: () => void;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const SortableItem: React.FC<ISortableItemProps> = ({
  id,
  index,
  children,
  moveFormItem,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "SortableItem",
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveFormItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "SortableItem", id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const { selectedStageItemIndex } = useContext(EditorContext);
  const className = classnames("item", {
    selected: selectedStageItemIndex === index,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity }}
      onClick={() => onClick && onClick()}
    >
      <div className="drag-handler">
        <MenuOutlined translate="" />
      </div>
      <div className="component-wrapper">{children}</div>
    </div>
  );
};

SortableItem.displayName = "SortableItem";

export default SortableItem;
