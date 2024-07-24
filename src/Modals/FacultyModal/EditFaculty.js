/* eslint-disable react/prop-types */
import { useState, React } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Dropdown } from "primereact/dropdown";

function EditFaculty(props) {
  const { show, onHide } = props;
  const handleCancel = () => {
    onHide();
  };
  const [selectFaculty, setFaculty] = useState(false);
  const [selectDistrict, setDistrict] = useState(false);
  const faculty = [
    { name: "Option 1", code: "NY" },
    { name: "Option 2", code: "RM" },
    { name: "Option 3", code: "LDN" },
    { name: "Option 4", code: "IST" },
    { name: "Option 5", code: "PRS" },
  ];
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
            <span>Edit Faculty</span>
          </div>
        }
      >
          <div className="grid">
            <div className="lg:col-6 md:col-6 sm:col-12">
              <div className="formField">
                <span className="p-float-label">
                  <InputText id="tile" />
                  <label htmlFor="tile">Faculty(English)</label>
                </span>
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  Faculty (English) error
                </div>
              </div>
            </div>
            <div className="lg:col-6 md:col-6 sm:col-12">
              <div className="formField">
                <span className="p-float-label">
                  <InputText id="tile" />
                  <label htmlFor="tile">Faculty (Portuguese)</label>
                </span>
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  Faculty (Portuguese) error
                </div>
              </div>
            </div>
            <div className="lg:col-12 md:col-12 sm:col-12">
              <div className="formField placeholderVisible">
                <span className="p-float-label ">
                  <Dropdown
                    inputId="dd-district"
                    value={selectDistrict}
                    onChange={(e) => setDistrict(e.value)}
                    options={faculty}
                    optionLabel="name"
                    placeholder="District"
                    className="p-inputtext-md"
                    size="small"
                  />
                </span>
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  District error
                </div>
              </div>
            </div>
            <div className="lg:col-11 md:col-11 sm:col-12">
              <div className="formField placeholderVisible">
                <span className="p-float-label ">
                  <Dropdown
                    inputId="dd-faculty-domain"
                    value={selectFaculty}
                    onChange={(e) => setFaculty(e.value)}
                    options={faculty}
                    optionLabel="name"
                    placeholder="Faculty Domain"
                    className="p-inputtext-md"
                    size="small"
                  />
                </span>
                <div
                  style={{ color: "#DC362E", textAlign: "initial" }}
                  className="errorSize"
                >
                  Faculty Domain error
                </div>
              </div>
            </div>
            <div className="lg:col-1 md:col-1 sm:col-12">
              <CustomTooltip tooltipText="Add Domain">
                <i
                  className="pi pi-plus-circle"
                  style={{ color: "#000", margin: "10px" }}
                />
              </CustomTooltip>
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

export default EditFaculty;
