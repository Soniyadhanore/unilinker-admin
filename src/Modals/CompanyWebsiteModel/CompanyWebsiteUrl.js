/* eslint-disable react/prop-types */
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";


function CompanyWebsiteUrl(props) {
  const { show, onHide } = props;

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="website-url-modal"
        header="Add Website Url"
      >
        <div className="grid mt-3">
     
    
          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Website Url</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Website Url
              </div>
            </div>
          </div>
        </div>
        <div className=" text-right">
          <Button className="btn btn-orange ml-1 mr-1">Save</Button>
        </div>
      </Dialog>
    </>
  );
}

export default CompanyWebsiteUrl;
