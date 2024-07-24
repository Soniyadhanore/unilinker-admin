/* eslint-disable react/prop-types */
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
function AddLocation(props) {
  const { show, onHide } = props;
  return (
    <>
      <Dialog
        visible={show} 
        onHide={onHide}
        style={{ width: "500px" }}
        className="delete-modal"
        header="Add Location"
        draggable={false}
      >
         <div className="grid mt-3">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Location name (English)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Location name (English) error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Location name (Portuguese)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Location name (Portuguese) error
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

export default AddLocation;
