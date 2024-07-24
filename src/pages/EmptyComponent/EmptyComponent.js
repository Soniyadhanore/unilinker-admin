import React from "react";
import PropTypes from "prop-types";
// import EmptyLogo from "../../assets/images/structure/empty.svg";

function EmptyComponent({ noDataMessage }) {
  return (
    <>
      <div className="text-center">
        {/* <img src={EmptyLogo} className="w-10rem" /> */}
        <h6 className="font-semibold text-lg mt-4">{noDataMessage}</h6>
      </div>
    </>
  );
}

EmptyComponent.propTypes = {
  noDataMessage: PropTypes.string.isRequired,
};

export default EmptyComponent;
