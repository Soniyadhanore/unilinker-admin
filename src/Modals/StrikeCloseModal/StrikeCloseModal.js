import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { InputTextarea } from "primereact/inputtextarea";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";

function StrikeCloseModal(props) {
  // eslint-disable-next-line react/prop-types
  const { show, onHide, id } = props;

  const dispatch = useDispatch();
  // const toast = useRef(null);
  const [reason, setReason] = useState("");
  const [reasonErr, setReasonErr] = useState("");

  const submitHandler = async () => {

    console.log(reason);
    
    if (!reason ||  reason === "") {
      setReasonErr("reason is required");
      return false;
    }
    
    const data = {
      reason: reason,
      status: 'rejected',
    };

    let url = API_ROUTES?.CHANGEOFSTATUSSTRIKEDATA + '/' + id;
    let method = "put";
    
    await globalRequest(url, method, data, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          onHide();          
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Data successfully updated.",
              state: "success",
            })
          );
        } else {
          // dispatch(
          //   setSnackbar({
          //     isOpen: true,
          //     message: "Something went wrong please try again some time later.",
          //     state: "error",
          //   })
          // );
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
        className="delete-modal"
        header="What's your reason?"
      >
        <div className="create-form">
          <div className="formField">
            <span className="p-float-label">
              <InputTextarea rows={5} cols={30} value={reason}
                  onChange={(e) => {
                    setReason(e.target.value.trimStart());
                    setReasonErr("");
                  }} />
              <label htmlFor="tile">Enter your reason </label>
            </span>
            {reasonErr && (
                        <div
                          style={{ color: "#DC362E", textAlign: "initial" }}
                          className="errorSize"
                        >
                          {reasonErr}
                        </div>
                      )}
          </div>
        </div>
        <div className="text-right">
            <Button className="btn btn-orange ml-1 mr-1" onClick={() => {
              submitHandler();              
            }}>Submit</Button>
        </div>
      </Dialog>
    </>
  );
}

export default StrikeCloseModal;
