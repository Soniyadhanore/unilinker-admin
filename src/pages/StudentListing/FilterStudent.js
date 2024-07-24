import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import { Divider } from "primereact/divider";
import { capitalizeFirstLetter } from "../../common/HelperFunctions";
import { InputText } from "primereact/inputtext";

const FilterStudent = ({ open, onClose, filter, setFilter, callApi }) => {
  const [newState, setNewState] = useState({
    ...filter,
    searchAreaList: filter.areaOfStudy || [],
    searchDegreeList: filter.degree || [],
    searchLocationList: filter.location || [],
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick  = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  //rest all filters
  const resetFilters = () => {
    for (let i in filter.areaOfStudy) {
      const updatedFilter = { ...newState };
      updatedFilter["areaOfStudy"][i].isActive = false;
      setNewState(updatedFilter);
    }
    for (let i in filter.degree) {
      const updatedFilter = { ...newState };
      updatedFilter["degree"][i].isActive = false;
      setNewState(updatedFilter);
    }
    if (filter.location.length > 0)
    for (let i in filter.location) {
      const updatedFilter = { ...newState };
      updatedFilter["location"][i].isActive = false;
      setNewState(updatedFilter);
    }
    for (let i in filter.profileVerification) {
      const updatedFilter = { ...newState };
      updatedFilter["profileVerification"][i].isActive = false;
      setNewState(updatedFilter);
    }
    for (let i in filter.profileVisibility) {
      const updatedFilter = { ...newState };
      updatedFilter["profileVisibility"][i].isActive = false;
      setNewState(updatedFilter);
    }

    setFilter(newState);
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

  const filterItems = (keyword, list, listToUpdate) => {
    const filtered = list?.filter((item) =>
      item?.name?.toLowerCase()?.includes(keyword.toLowerCase())
    );
    // .slice(0, 7); // Slice to include only the first 7 items
    if (filtered?.length === 0) {
      setNewState((prev) => {
        return {
          ...prev,
          [listToUpdate]: [],
        };
      });
    } else {
      setNewState((prev) => {
        return {
          ...prev,
          [listToUpdate]: filtered,
        };
      });
    }
  };

  // useEffect(() => {
  //   console.log("hhh");
  //   filterItems(searchKeyWord);
  // }, [newState?.areaOfStudy]);

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
            <h6 className="h6 mb-3">Area of Study</h6>
            <div className="tableSearchCol mb-3">
              <div className="p-inputgroup searchFilter searchFilterStudent">
                <span className="p-input-icon-left w-full small-input">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Search Area of Study"
                    className="w-full"
                    onChange={(e) => {
                      console.log(e.target.value);
                      filterItems(
                        e.target.value.trimStart(),
                        newState?.areaOfStudy,
                        "searchAreaList"
                      );
                    }}
                  />
                </span>
              </div>
            </div>
            <div className={selectedItem === 0 ? "show-more show" : "show-more"}>            
              {newState?.searchAreaList?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(item?.code, "areaOfStudy")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>
          {
            newState?.searchAreaList.length > 6 ? (
               <>
                <span onClick={() => handleItemClick(0)} style={{ textDecoration: "underline",cursor: 'pointer' }}>
                 {selectedItem === 0 ? 'Show Less' : 'Show More'}
                </span>                
              </>
            ) : null
          }
          <Divider />
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Current Degree (age of degree)</h6>
            <div className="tableSearchCol mb-3">
              <div className="p-inputgroup searchFilter searchFilterStudent">
                <span className="p-input-icon-left w-full small-input">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Search Current Degree (age of degree)"
                    className="w-full"
                    onChange={(e) => {
                      console.log(e.target.value);
                      filterItems(
                        e.target.value.trimStart(),
                        newState?.degree,
                        "searchDegreeList"
                      );
                    }}
                  />
                </span>
              </div>
            </div>
            <div className={selectedItem === 1 ? "show-more show" : "show-more"}>
              {newState?.searchDegreeList?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(item?.code, "degree")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>
          {
            newState?.searchDegreeList.length > 6 ? (
              <>
              <span onClick={() => handleItemClick(1)} style={{ textDecoration: "underline",cursor: 'pointer' }}>
              {selectedItem === 1 ? 'Show Less' : 'Show More'}
              </span>
              </>
            ) : null
          }          
          <Divider />

          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Work Location</h6>
            <div className="tableSearchCol mb-3">
              <div className="p-inputgroup searchFilter searchFilterStudent">
                <span className="p-input-icon-left w-full small-input">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Search Work Location"
                    className="w-full"
                    onChange={(e) => {
                      console.log(e.target.value);
                      filterItems(
                        e.target.value.trimStart(),
                        newState?.location,
                        "searchLocationList"
                      );
                    }}
                  />
                </span>
              </div>
            </div>
            <div className={selectedItem === 2 ? "show-more show" : "show-more"}>
            {newState?.searchLocationList?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() => handleStatusClick(item?.code, "location")}
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
              {/* <span className="btn btn-light mr-2 mb-2 filter-active">
                Option1
              </span>
              <span className="btn btn-light mr-2 mb-2">Option2</span>
              <span className="btn btn-light mr-2 mb-2">Option3</span> */}
            </div>
          </div>
          {
            newState?.searchLocationList.length > 6 ? (
              <>
              <span onClick={() => handleItemClick(2)} style={{ textDecoration: "underline",cursor: 'pointer' }}>
              {selectedItem === 2 ? 'Show Less' : 'Show More'}
              </span>
              </>
            ) : null
          }          
          <Divider />
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Profile visibility</h6>
            <div>
              {newState?.profileVisibility?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() =>
                      handleStatusClick(item?.code, "profileVisibility")
                    }
                  >
                    {capitalizeFirstLetter(item?.name)}
                  </span>
                );
              })}
            </div>
          </div>
          <Divider />
          <div className="studentListingFilterContent">
            <h6 className="h6 mb-3">Verification</h6>
            <div>
              {newState?.profileVerification?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`btn btn-light mr-2 mb-2 ${
                      item?.isActive ? "filter-active" : ""
                    }`}
                    onClick={() =>
                      handleStatusClick(item?.code, "profileVerification")
                    }
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

FilterStudent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  callApi: PropTypes.func.isRequired,
};
export default FilterStudent;
