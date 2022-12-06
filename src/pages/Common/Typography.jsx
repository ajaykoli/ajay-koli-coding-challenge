import React from "react";

const Typography = ({title, length, percentage, type}) => {
  return (
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>{title}</div>
            <div className={`width-15 height-15 bg-${type}`}></div>
          </div>

          <div className="d-flex gap-3 w-full w-25 justify-content-end">
            <div>{length}</div>
            <div className="text-muted w-25">{percentage}%</div>
          </div>
        </div>
  );
};

export default Typography;
