/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";

const allAreaStudy = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

function EditDegree(props) {
  const { show, onHide } = props;
  const [selectedAreaStudy, setSelectedAreaStudy] = useState(null);

  // Close the dialog
  const handleCancel = () => {
    onHide();
  };

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        style={{ width: "500px" }}
        draggable={false}
        className="delete-modal edit-delete"
        header={
          <div className="flex justify-content-between">
            <span>Edit Degree</span>
          </div>
        }
      >
        <div className="grid">
          <div className="lg:col-12 md:col-12 sm:col-12">
            <div className="formField">
                <span className="p-float-label w-full dropdownnew">
                  <Dropdown
                    inputId="dd-degree"
                    value={selectedAreaStudy}
                    onChange={(e) => setSelectedAreaStudy(e.value)}
                    options={allAreaStudy}
                    optionLabel="name"
                    className="w-full"
                  />
                  <label htmlFor="dd-degree">Area of study</label>
                </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Area of study error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Degree(English)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Degree(English) error
              </div>
            </div>
          </div>
          <div className="lg:col-6 md:col-6 sm:col-12">
            <div className="formField">
              <span className="p-float-label">
                <InputText id="tile" />
                <label htmlFor="tile">Degree (Portuguese)</label>
              </span>
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                Degree (Portuguese) error
              </div>
            </div>
          </div>
        </div>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button className="btn btn-gray mr-1" onClick={() => handleCancel()}>Cancel</Button>
            <Button className="btn btn-orange ml-1 mr-1">Save</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default EditDegree;
