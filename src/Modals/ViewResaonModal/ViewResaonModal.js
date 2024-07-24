import { Dialog } from "primereact/dialog";
import React from "react";
import { Button } from "react-bootstrap";

function ViewResaonModal(props) {
  // eslint-disable-next-line react/prop-types
  const { show, onHide, resaonMessage } = props;

  

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header="View Resaon"
      >
        <div className="create-form">
          <p>{resaonMessage}</p>
        </div>
        <div className="text-right">
            <Button className="btn btn-orange ml-1 mr-1" onClick={() => {onHide();              
            }}>Close</Button>
        </div>
      </Dialog>
    </>
  );
}

export default ViewResaonModal;
