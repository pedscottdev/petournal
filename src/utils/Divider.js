import React from "react";

function Divider( props ) {

  const { label } = props;

  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-xs font-medium text-gray-600">{label}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}

export default Divider;
