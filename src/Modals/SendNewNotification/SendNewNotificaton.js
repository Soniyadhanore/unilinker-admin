import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const allUser = [
  { name: "Company", code: "Company" },
  { name: "Student", code: "Student" },
];

function SendNewNotification(props) {
  // eslint-disable-next-line react/prop-types
  const { show, onHide } = props;
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header="Send Notification"
      >
        <div className="create-form">
          <div className="formField">
            <span className="p-float-label">
              <InputTextarea rows={3} cols={30} />
              <label htmlFor="tile">Enter Message</label>
            </span>            
          </div>
          <div className="formField">
            <span className="p-float-label w-full dropdownnew">
              <Dropdown
                inputId="userType"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.value)}
                options={allUser}
                optionLabel="name"
                className="w-full"
              />
              <label htmlFor="userType">User Type</label>
            </span>
          </div>
        </div>
        <div className="text-right">
          <Button className="btn btn-orange ml-1 mr-1">Send</Button>
        </div>
      </Dialog>
    </>
  );
}

export default SendNewNotification;
