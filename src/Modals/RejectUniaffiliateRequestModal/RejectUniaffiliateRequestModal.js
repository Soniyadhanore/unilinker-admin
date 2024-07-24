import { Dialog } from "primereact/dialog";
import React from "react";
import { Button } from "react-bootstrap";
import { InputTextarea } from "primereact/inputtextarea";

function RejectUniaffiliateRequestModal(props) {
  // eslint-disable-next-line react/prop-types
  const { show, onHide } = props;
  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="reject-modal"
        header="Reject Uniaffiliate request"
      >
        <div className="create-form py-0">
          <p>Are you sure you want to reject this uniaffiliate request?</p>
          <div className="formField">
            <span className="p-float-label">
              <InputTextarea rows={4} cols={30} />
              <label htmlFor="tile">Type your reason </label>
            </span>
            <div
              style={{ color: "#DC362E", textAlign: "initial" }}
              className="errorSize"
            >
              Your reason error
            </div>
          </div>
          <div className="text-right">
            <Button className="btn btn-orange">Yes, Reject</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RejectUniaffiliateRequestModal;
