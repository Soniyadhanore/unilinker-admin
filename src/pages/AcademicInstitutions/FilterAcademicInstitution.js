import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { capitalizeFirstLetter } from "../../common/HelperFunctions";

const FilterAcademicInstitution = ({
  open,
  onClose,
  filter,
  setFilter,
  callApi,
}) => {
  const [newState, setNewState] = useState(filter);

  //rest all filters
  const resetFilters = () => {
    const updatedFilter = { ...newState };
    for (let i in filter.status) {
      updatedFilter["status"][i].isActive = false;
      setNewState(updatedFilter);
    }
    updatedFilter["start_date"] = null;
    updatedFilter["end_date"] = null;

    setFilter(updatedFilter);
    callApi(filter);
  };

  //handle manage onclick
  const handleStatusClick = (index, category) => {
    const updatedFilter = { ...newState };
    updatedFilter[category][index].isActive =
      !updatedFilter[category][index].isActive;
    setNewState(updatedFilter);
  };

  //handle submit
  const handleSubmit = () => {
    console.log(newState);
    setFilter(newState);
    callApi(newState);
  };

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
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Status of Request</h6>
            <div>
              {newState?.status?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(index, "status")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>

          <Divider />

          <div className="studentListingFilterContent">
            <div className="grid">
              <div className="lg:col-6 md:col-6 sm:col-12">
                {/* <h6 className="h6 mb-3">Start date</h6> */}
                <div className="p-float-label small-input academic-calender">
                  <Calendar
                    inputId="Selectdate1"
                    value={newState?.start_date}
                    onChange={(e) => {
                      setNewState((prev) => {
                        return {
                          ...prev,
                          start_date: e.value,
                        };
                      });
                    }}
                    showIcon
                    className="w-full "
                  />
                  <label htmlFor="Selectdate1">Start date</label>
                </div>
              </div>
              <div className="lg:col-6 md:col-6 sm:col-12 aca-cal">
                {/* <h6 className="h6 mb-3">End date</h6> */}
                <div className="p-float-label small-input academic-calender">
                  <Calendar
                    inputId="Selectdate2"
                    value={newState?.end_date}
                    onChange={(e) => {
                      setNewState((prev) => {
                        return {
                          ...prev,
                          end_date: e.value,
                        };
                      });
                    }}
                    showIcon
                    className="w-full "
                  />
                  <label htmlFor="Selectdate2">End date</label>
                </div>
              </div>
            </div>
          </div>
          <Divider />

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

FilterAcademicInstitution.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  callApi: PropTypes.func.isRequired,
};

export default FilterAcademicInstitution;
