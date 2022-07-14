import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

const FilterLabel = ({
  isEmpty,
  filter,
  removeSpecificFilters,
  removeAllFilters,
}) => {
  return (
    <small>
      {!isEmpty && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            marginRight: "10px",
          }}
        >
          Filtering By:
        </span>
      )}
      {Object.values(filter).map(
        (filter, index) =>
          filter && (
            <span style={FilterButtonStyles} key={index}>
              {filter}
              <span
                style={singleCancelButtonStyles}
                onClick={() => removeSpecificFilters(filter)}
              >
                <GrFormClose size={18} />
              </span>
            </span>
          )
      )}
      {!isEmpty && (
        <span onClick={removeAllFilters} style={closeAllStyles}>
          <MdOutlineCancel />
        </span>
      )}
    </small>
  );
};

export default FilterLabel;

const FilterButtonStyles = {
  padding: "2px 10px",
  paddingRight: "0",
  color: "#333",
  backgroundColor: "#ddd",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  marginRight: "3px",
  display: "inline-flex",
  alignItems: "center",
};

const singleCancelButtonStyles = {
  padding: "0 2px 2px",
  margin: "0",
  cursor: "pointer",
};

const closeAllStyles = {
  color: "#777",
  fontSize: "17px",
  marginLeft: "10px",
  cursor: "pointer",
};