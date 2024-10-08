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

type DraggableContainerProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode;
  className?: string;
  container?: any;
  data?: { [key: string]: string };
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
};

const DraggableContainer = (props: DraggableContainerProps) => {
  const { aria = {}, children, className, container, data = {}, htmlOptions = {}, id } = props;

  const { handleDragOver, handleDrop, activeContainer } = DraggableContext();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  const classes = classnames(
    buildCss("pb_draggable_container"),
    `${activeContainer === container ? "active" : ""}`,
    globalProps(props),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
        key={container}
        onDragOver={(e) => handleDragOver(e, container)}
        onDrop={() => handleDrop(container)}
    >
      {children}
    </div>
  );
};

export default DraggableContainer;
