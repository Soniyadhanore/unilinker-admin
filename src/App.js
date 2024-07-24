import { React, useEffect, useRef } from "react";
import Routing from "./Route/routing";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSnackbar, snackObj } from "./redux/reducers/snackbar";
import { Toast } from "primereact/toast";
import { capitalizeFirstLetter } from "./common/HelperFunctions";
const App = () => {
  const snackBar = useSelector(snackObj);
  const dispatch = useDispatch();

  const toast = useRef(null);
  const showSuccess = (msg,state) => {
    let summary = capitalizeFirstLetter(state);
    toast.current.show({
      severity: state,
      summary: summary,
      detail: msg,
      life: 5000,
    });
  };

  useEffect(() => {
    if (snackBar?.isOpen) {
      setTimeout(() => {
        dispatch(
          setSnackbar({
            ...snackBar,
            isOpen: false,
          })
        );
      }, 2000);
      showSuccess(snackBar?.message,snackBar?.state);
    }
  }, [snackBar?.isOpen]);

  return (
    <>
      <Toast ref={toast} />
      <Routing />;
    </>
  );
};

export default App;
