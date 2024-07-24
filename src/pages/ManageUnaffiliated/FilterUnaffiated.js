import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import { Divider } from "primereact/divider";

const FilterUnaffiated = ({ open, onClose }) => {
  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      sx={{
        width: 400 
      }}
      className="studentListingFilterBox"
    >
      <List>
        <div className='studentListingFilter'>
          <div className='filterHead flex mb-4'>
            <h5 className='h5'>Filters</h5> 
            <span>
              <i className="fa fa-times close" onClick={onClose}></i>
            </span>
          </div>
          <Divider />
          <div className='studentListingFilterContent'>
            <h6 className='h6 mb-3'>Type</h6>
            <div>
              <span className="btn btn-light mr-2 mb-2 filter-active">Online Discount</span>
              <span className="btn btn-light mr-2 mb-2">General Ads/Announcement</span>
            </div>
          </div>
          <Divider />
          <div className='studentListingFilterContent'>
            <h6 className='h6 mb-3'>Category</h6>
            <div>
              <span className="btn btn-light mr-2 mb-2">Shopping</span>
              <span className="btn btn-light mr-2 mb-2">Food</span>
              <span className="btn btn-light mr-2 mb-2 filter-active">Entertainment</span>
            </div>
          </div>
          <Divider />
          <div className='studentListingFilterContent'>
            <h6 className='h6 mb-3'>Status</h6>
            <div>
              <span className="btn btn-light mr-2 mb-2 filter-active">Review pending</span>
              <span className="btn btn-light mr-2 mb-2">Approved</span>
              <span className="btn btn-light mr-2 mb-2">Rejected</span>
            </div>
          </div>

          <div className='filterBottomBtn mt-4'>
            <Divider />
            <button className="p-button p-component btn btn-outline ml-1 mr-3">Reset</button>
            <button className="btn btn-orange ml-1">Apply Filters</button>
          </div>
        </div>
      </List>
    </Drawer>
  );
};

FilterUnaffiated.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterUnaffiated;