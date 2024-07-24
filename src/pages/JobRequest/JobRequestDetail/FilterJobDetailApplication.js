import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import { Divider } from "primereact/divider";
import { capitalizeFirstLetter } from "../../../common/HelperFunctions";

const FilterJobDetailApplication = ({ open, onClose, filter, setFilter, callApi }) => {
  const [newState, setNewState] = useState({
    ...filter,
    searchAreaList: filter.areaOfStudy || [],
    searchDegreeList: filter.degree || [],
    searchLocationList: filter.location || [],
  });

  //rest all filters
  const resetFilters = () => {
    // if ( shift.length > 0 )
    for (let i in filter.shift) {
      const updatedFilter = { ...newState };
      updatedFilter["shift"][i].isActive = false;
      setNewState(updatedFilter);
    }
    for (let i in filter.application_type) {
      const updatedFilter = { ...newState };
      updatedFilter["application_type"][i].isActive = false;
      setNewState(updatedFilter);
    }
    for (let i in filter.student_status) {
      const updatedFilter = { ...newState };
      updatedFilter["student_status"][i].isActive = false;
      setNewState(updatedFilter);
    }
    
    setFilter(newState);
    onClose();
    callApi();
  };

  // //handle manage onclick
  // const handleStatusClick = (index, category) => {
  //   const updatedFilter = { ...newState };
  //   updatedFilter[category][index].isActive =
  //     !updatedFilter[category][index].isActive;
  //   setNewState(updatedFilter);
  // };

  // handle manage onclick
  const handleStatusClick = (code, category) => {
    
    // Create a copy of the current state
    const updatedFilter = { ...newState };

    // console.log(updatedFilter);

    // Find the item in the specified category array by its ID
    const itemToUpdate = updatedFilter[category].find(
      (item) => item.code === code
    );

    // If the item is found, toggle its isActive property
    if (itemToUpdate) {
      itemToUpdate.isActive = !itemToUpdate.isActive;

      // Update the state with the modified filter
      setNewState(updatedFilter);
    } else {
      console.error(`Item with ID ${code} not found in category ${category}`);
    }
  };

  //handle submit
  const handleSubmit = () => {
    setFilter(newState);
    callApi();
  };

  // const filterItems = (keyword, list, listToUpdate) => {
  //   const filtered = list?.filter((item) =>
  //     item?.name?.toLowerCase()?.includes(keyword.toLowerCase())
  //   );
  //   // .slice(0, 7); // Slice to include only the first 7 items
  //   if (filtered?.length === 0) {
  //     setNewState((prev) => {
  //       return {
  //         ...prev,
  //         [listToUpdate]: [],
  //       };
  //     });
  //   } else {
  //     setNewState((prev) => {
  //       return {
  //         ...prev,
  //         [listToUpdate]: filtered,
  //       };
  //     });
  //   }
  // };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: 400,
      }}
      className="studentListingFilterBox"
    >
      <List>
        <div className="studentListingFilter">
          <div className="filterHead flex mb-4">
            <h5 className="h5">Filters</h5>
            <span>
              <i className="fa fa-times close" onClick={onClose}></i>
            </span>
          </div>

            {
              (newState?.shift && newState?.shift.length > 0) ? (
                <>
                <div className="studentListingFilterContent">
                  <h6 className="h6 mb-3">Shift</h6>
                  <div>
                  {newState?.shift?.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className={`btn btn-light mr-2 mb-2 ${
                            item?.isActive ? "filter-active" : ""
                          }`}
                          onClick={() => handleStatusClick(item?.code, "shift")}
                        >
                          {capitalizeFirstLetter(item?.name)}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <Divider />
              </>
            ) : null
          }
          
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Applicant type</h6>
            <div>
            {newState?.application_type?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(item?.code, "application_type")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>

          <Divider />
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Status</h6>
            <div>
            {newState?.student_status?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(item?.code, "student_status")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="filterBottomBtn mt-4">
            <Divider />
            <button
              className="p-button p-component btn btn-outline ml-1 mr-3"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button className="btn btn-orange ml-1" onClick={handleSubmit}>
              Apply Filters
            </button>
          </div>
        </div>
      </List>
    </Drawer>
  );
};

FilterJobDetailApplication.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  callApi: PropTypes.func.isRequired,
};

export default FilterJobDetailApplication;
