/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Button } from "react-bootstrap";

function EditAreaOfStudy(props) {
  const { show, onHide } = props;
  // Close the dialog
  const handleCancel = () => {
    onHide();
  };
  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal edit-delete"
        header={
          <div className="flex justify-content-between">
            <span>Edit  Area of study</span>
          </div>
        }
      >
        <div className="grid">
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Area of study (English)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Area of study (English) error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Area of study (Portuguese)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Area of study (Portuguese) error
              </div>
            </div>
          </div>
        </div>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button
              className="btn btn-gray mr-1"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button className="btn btn-orange ml-1 mr-1">Save</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default EditAreaOfStudy;
