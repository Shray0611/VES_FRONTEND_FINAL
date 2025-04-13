import React, { useRef } from "react";
import { Draggable } from "react-draggable";

// CustomDraggable is a wrapper around react-draggable that uses React refs
// to avoid the deprecated findDOMNode API
const CustomDraggable = ({ children, ...props }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable {...props} nodeRef={nodeRef}>
      <div ref={nodeRef}>{children}</div>
    </Draggable>
  );
};

export default CustomDraggable;
