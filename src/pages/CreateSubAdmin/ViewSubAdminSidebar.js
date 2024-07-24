import { useRef, useState, React, useEffect } from "react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import "react-phone-input-2/lib/style.css";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import {
  capitalizeFirstLetter,
  formatDateFunction,
  getPermissionFromAll,
} from "../../common/HelperFunctions";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const ViewSubCategorySidebar = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [subadminData, setSubadminData] = useState(null);

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let subadmin = getPermissionFromAll("subadmin", accessToken);

  //Get subadmin Data
  const getData = async () => {
    await globalRequest(
      API_ROUTES?.GETSPECIFICSUBADMIN + "/" + id,
      "get",
      {},
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          let data = res.data;
          setSubadminData(data);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    if (id) getData();
  }, []);

  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Message Content",
  //     life: 3000,
  //   });
  // };

  const deleteSubadmin = async () => {
    await globalRequest(
      API_ROUTES?.DELETESUBADMIN + "/" + subadminData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        setDeleteModalShow(false);
        if (res.ack === 1) {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })
          );
          navigate("/sub-admin");
        } else {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const resentInvitation = async (id) => {
    let params = {};
    await globalRequest(
      API_ROUTES?.RESENTINVITATIONSUBADMIN + "/" + id,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })
          );
          // getAllData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <section className="admin-content-wrapper">
      <div className="adminContent">
        <div className="tablefilterheader">
          <div className="tableHeader">
            <i
              className="pi pi-angle-left cursor-pointer"
              onClick={() => {
                navigate("/sub-admin");
              }}
              style={{ fontSize: "30px", margin: "0 12px 0 0" }}
            />
            <h4 className="h4 mb-0">View Sub admin Details</h4>
            <div className="tableFilterRow ml-auto">
              <div className="tableFilterCol" style={{ width: "auto" }}>
                {subadminData?.is_first_login === true ? (
                  <Button
                    className="btn btn-outline ml-1 mr-1"
                    onClick={() => {
                      resentInvitation(subadminData?.id);
                    }}
                  >
                    <i className="pi pi-refresh" /> Resend Password link
                  </Button>
                ) : null}
                {subadmin.edit ? (
                  <CustomTooltip tooltipText={"Edit"}>
                    <Button
                      className="btn btn-outline ml-1 mr-1"
                      onClick={() => {
                        navigate("/edit-sub-admin/" + subadminData?.id);
                      }}
                    >
                      <i className="fa fa-pencil" />
                    </Button>
                  </CustomTooltip>
                ) : null}

                {subadmin.delete ? (
                  <CustomTooltip tooltipText={"Delete"}>
                    <Button
                      className="btn btn-outline ml-1"
                      onClick={() => setDeleteModalShow(true)}
                    >
                      <i className="fa fa-trash" />
                    </Button>
                  </CustomTooltip>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Divider className="mt-0 mb-1" />
        <div className="create-form">
          <div className="grid">
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Name</h5>
                </div>
                <div className="formField-details">
                  <h6>
                    {capitalizeFirstLetter(subadminData?.first_name)}{" "}
                    {capitalizeFirstLetter(subadminData?.last_name)}
                  </h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Email Address</h5>
                </div>
                <div className="formField-details">
                  <h6>{subadminData?.email}</h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Mobile Number</h5>
                </div>
                <div className="formField-details">
                  <h6>
                    +{subadminData?.country_code} {subadminData?.mobile}
                  </h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Designation</h5>
                </div>
                <div className="formField-details">
                  <h6>{subadminData?.employees[0]?.designation}</h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Role</h5>
                </div>
                <div className="formField-details">
                  <h6>{subadminData?.employees[0]?.role?.role_name}</h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view">
                <div className="formField-heading">
                  <h5>Account created on</h5>
                </div>
                <div className="formField-details">
                  <h6>{formatDateFunction(subadminData?.createdAt)}</h6>
                </div>
              </div>
            </div>
            <div className="lg:col-8 md:col-8 sm:col-12 py-0">
              <div className="formField-view ">
                <div className="formField-heading">
                  <h5 className="mt-2">Status</h5>
                </div>
                <div className="formField-details">
                  <span className="btn btn-light">
                    {subadminData?.is_first_login !== true
                      ? subadminData?.status
                      : "Invitation pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {DeleteModalShow && (
        <DeleteModal
          show={DeleteModalShow}
          onHide={() => {
            setDeleteModalShow(false);
          }}
          deleteFunction={() => {
            deleteSubadmin();
          }}
        />
      )}
      <Toast ref={toast} />
    </section>
  );
};
export default ViewSubCategorySidebar;
