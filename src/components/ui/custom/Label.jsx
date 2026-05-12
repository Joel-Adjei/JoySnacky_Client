import React from "react";

const Label = ({ label, htmlFor, Icon, isRequired }) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex pl-3 text-accent gap-1.5 text-sm mb-1 "
      >
        <span>{Icon && <Icon size={17} className={"text-accent"} />}</span>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

export default Label;
