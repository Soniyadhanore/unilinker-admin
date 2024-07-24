/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { React } from "react";
import { Button } from "react-bootstrap";

function SwitchJobType({ show, onHide,selectYes }) {
  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "400px" }}
        className="delete-modal"
        header="Switch Job Type"
      >
        <p>Are you sure you want to switch job type ?</p>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button className="btn btn-gray mr-1" onClick={onHide}>No</Button>
            <Button onClick={selectYes}
              className="btn btn-orange ml-1 mr-1"
            >
              Yes
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default SwitchJobType;