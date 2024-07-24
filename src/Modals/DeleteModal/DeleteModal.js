/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { React } from "react";
import { Button } from "react-bootstrap";
// import { Toast } from 'primereact/toast'; 

function DeleteModal({ show, onHide, deleteFunction }) {
  // const toast = useRef(null);
  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Faculty successfully Deleted.",
  //     life: 10000,
  //   });
  // };
  return (
    <>
      <Dialog
        visible={show}
        onHide={onHide}
        draggable={false}
        style={{ width: "500px" }}
        className="delete-modal"
        header="Delete"
      >
        <p>Are you sure you want to delete.</p>
        <div className="grid text-right justify-content-end ">
          <div className="lg:col-10 md:col-5 sm:col-12">
            <Button className="btn btn-gray mr-1" onClick={onHide}>Cancel</Button>
            <Button
              className="btn btn-orange ml-1 mr-1"
              onClick={() => {
                deleteFunction();
                // showSuccess();
              }}
            >
              Delete
            </Button>
            {/* <Toast ref={toast} /> */}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteModal;