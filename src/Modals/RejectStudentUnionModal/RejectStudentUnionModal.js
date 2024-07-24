import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { InputTextarea } from "primereact/inputtextarea";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
function RejectStudentUnionModal({ show, onHide, item }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handleStatusChange = async () => {
    if (reason === "") {
      setReasonError("Reason is required");
      return false;
    }

    let data = {
      status: "rejected",
      reason: reason,
    };
    await globalRequest(
      API_ROUTES?.UPDATESTATUSOFCOMPANYDATA(item?.addedBy),
      "put",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          console.log("success");
          onHide();
          setReason ('');
          setReasonError('')
          dispatch(
            setSnackbar({
              isOpen: true,
              message: 'Academic Institutions successfully rejected.',
              state: "success",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="reject-modal"
        header="Reject student union request"
      >
        <div className="create-form py-0">
          <p>
            Are you sure you want to reject this Academic Institution request?{" "}
          </p>
          <div className="formField">
            <span className="p-float-label">
              <InputTextarea
                rows={4}
                cols={30}
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value.trimStart());
                  setReasonError("");
                }}
              />
              <label htmlFor="tile">Type your reason </label>
            </span>
            {reasonError && (
              <div
                style={{ color: "#DC362E", textAlign: "initial" }}
                className="errorSize"
              >
                {reasonError}
              </div>
            )}
          </div>
          <div className="text-right">
            <Button className="btn btn-orange" onClick={handleStatusChange}>
              Yes, Reject
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RejectStudentUnionModal;

RejectStudentUnionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
