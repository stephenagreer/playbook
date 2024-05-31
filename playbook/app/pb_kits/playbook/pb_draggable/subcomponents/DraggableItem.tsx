import React from "react";
import classnames from "classnames";
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";

type DraggableItemProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
};

const DraggableItem = (props: DraggableItemProps) => {
  const { aria = {}, children, className, container, data = {}, htmlOptions = {},  id } = props;

  const { isDragging, handleDragStart, handleDragEnter, handleDragEnd } =
    DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  const classes = classnames(
    buildCss("pb_draggable_item"),
    `${isDragging === id ? "is_dragging" : ""}`,
    globalProps(props),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        draggable
        id={id}
        key={id}
        onDragEnd={() => handleDragEnd()}
        onDragEnter={() => handleDragEnter(id, container)}
        onDragStart={() => handleDragStart(id, container)}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
