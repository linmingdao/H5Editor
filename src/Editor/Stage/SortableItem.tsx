import React, { useContext, useRef } from "react";
import { XYCoord } from "dnd-core";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { MenuOutlined, MinusCircleOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { EditorContext } from "../index";

export interface ISortableItemProps {
  id: string;
  index: number;
  moveFormItem: (dragIndex: number, hoverIndex: number) => void;
  onClick?: () => void;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const SortableItem: React.FC<ISortableItemProps> = (props) => {
  const { id, index, children, moveFormItem, onClick } = props;
  const { handleRemove, selectedStageItemIndex } = useContext(EditorContext);
  const className = classnames("item", {
    selected: selectedStageItemIndex === index,
  });

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "SortableItem",
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveFormItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag, preview] = useDrag({
    item: { type: "SortableItem", id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });
  drop(ref);

  function handleRemoveStageItem(e: React.MouseEvent) {
    e.stopPropagation();
    handleRemove && handleRemove(id);
  }

  return (
    <div ref={ref}>
      <div
        ref={preview}
        className={className}
        style={{ opacity }}
        onClick={() => onClick && onClick()}
      >
        <div className="operator">
          <div ref={drag} className="drag-handler">
            <MenuOutlined translate="" />
          </div>
          <div className="dividing-line"></div>
          <div className="remove-btn" onClick={(e) => handleRemoveStageItem(e)}>
            <MinusCircleOutlined translate="" />
          </div>
        </div>
        <div className="component-wrapper">{children}</div>
      </div>
    </div>
  );
};

SortableItem.displayName = "SortableItem";

export default SortableItem;