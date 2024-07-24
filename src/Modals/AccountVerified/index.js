/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import {React} from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function AccountVerifiedModal({ show, onHide,student,approveFunction }) {
    // const { show, onHide } = props;
    console.log(student);
  return (
    <>
      <Dialog
       visible={show} 
       onHide={onHide}
       draggable={false}
       style={{ width: "500px" }}
       className="delete-modal"
       header="Confirm Account Verification"
      >
        <p className="p1 mb-4">Are you sure you want to mark this account as { student.university_email_isverified ? 'unverified' : 'verified'  }?</p>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button className="btn btn-gray mr-1">Cancel</Button>
            <Button className="btn btn-orange ml-1 mr-1" onClick={() => {
                approveFunction();
              }}>Confirm</Button>
          </div>
        </div>
      </Dialog>

   
    </>
  );
}
AccountVerifiedModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired, 
  student:PropTypes.object.isRequired, 
};
export default AccountVerifiedModal;
