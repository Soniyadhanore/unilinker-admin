/** @format */
import React from 'react';
import Portfolio from "../../../assets/images/structure/portfolio.png";

const InformationTab = () => {
  return (
    <>
      <div className="relative px-4">
        <div className="flex flex-column">
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Company</h5>
            </div>
            <div className="formField-details">
              <h6>Amazon</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Title</h5>
            </div>
            <div className="formField-details">
              <h6>Upgrade Your Capture: Save 15% on Canon DSLRs</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Type</h5>
            </div>
            <div className="formField-details">
              <h6>Online</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Category</h5>
            </div>
            <div className="formField-details">
              <h6>Entertainment</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Posted Date</h5>
            </div>
            <div className="formField-details">
              <h6>01/01/2024</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Expiry Date</h5>
            </div>
            <div className="formField-details">
              <h6>31/01/2024</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Website URL</h5>
            </div>
            <div className="formField-details">
              <h6>www.canonwebsite.com</h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Description</h5>
            </div>
            <div className="formField-details">
              <h6>
                {"Indulge in a delectable experience with McDonald's exclusive offer! Unveiling a sensational 50% discount, with savings of up to €250, on our sumptuous Big Burgers. Elevate your meal by placing a minimum order of €500 and savor the irresistible flavors."}
              </h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Image</h5>
            </div>
            <div className="formField-details ">
              <img src={Portfolio} alt="Portfolio Name" />
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Reason</h5>
            </div>
            <div className="formField-details">
              <h6>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor{" "}
              </h6>
            </div>
          </div>
          <div className="formField-view">
            <div className="formField-heading">
              <h5>Rejected Date</h5>
            </div>
            <div className="formField-details">
              <h6>01/02/2202</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationTab;
