/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
// import { Button, Text } from "components";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch } from "react-redux";
import { handleUploadImage } from "../../common/HelperFunctions";
import { setSnackbar } from "../../redux/reducers/snackbar";
import { Button } from "react-bootstrap";
const CropImgModal = ({ open, onClose, select_img, setCropImg }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    onClose(false);
  };

  ///states for image cropper
  const cropperRef = useRef(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  //handle crop images
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImageUrl(cropper.getCroppedCanvas().toDataURL());
    // setCroppedImageUrl(
    //   cropper.getCroppedCanvas({ width: 500, height: 500 }).toDataURL()
    // );
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="!rounded-xl"
      >
        <div className="p-3" style={{width:"400px"}}>
          <div className="p-[24px] mb-3">
            <span className="font-bold">
              {"Crop Image"}
            </span>
          </div>
          <div>
            {select_img && (
              <Cropper
                src={select_img}
                aspectRatio={1}
                // guides={false}
                crop={onCrop}
                ref={cropperRef}
                zoomable={false}
                style={{width:'100%'}}
              />
            )}
          </div>
          <div className="mt-3 text-right">
          <Button className="btn btn-gray mr-1"  onClick={handleClose} >
            Cancel
          </Button>
          <Button
            className="btn btn-orange ml-1 mr-1"  onClick={async () => {
              // console.log("croppedImageUrl", croppedImageUrl);
              let res = await handleUploadImage(croppedImageUrl);
              if (res?.res === "success") {
                setCropImg(res?.data);
              } else if (res?.res === "error") {
                dispatch(
                  setSnackbar({
                    isOpen: true,
                    message: res?.data,
                    state: "error",
                  })
                );
              }
            }}
          >
            Crop
          </Button>
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default CropImgModal;
