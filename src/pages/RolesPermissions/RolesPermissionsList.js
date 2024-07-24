/** @format */
import { useRef, useState, React, useEffect } from "react";
// import "../SubAdmin/SubAdmin.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Paginator } from "primereact/paginator";
import { Divider } from "primereact/divider";
// import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { PAGIANTION, formatDateFunction, getPermissionFromAll } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const RolesPermission = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let roles = getPermissionFromAll("roles", accessToken);

  const getAllData = async () => {
    // console.log(filter);
    setLoading(true);
    let areaOfStudy = [];
    let degree = [];
    let location = [];
    let profileVerification = [];
    let profileVisibility = [];
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = {
      page: page,
      limit: PAGIANTION,
      search: search,
      sort_by: sortBy,
      order_by: orderBy,
      areaOfStudy: areaOfStudy,
      degree: degree,
      location: location,
      profileVerification: profileVerification,
      profileVisibility: profileVisibility,
    };
    await globalRequest(
      API_ROUTES?.GETALLROLES,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setListData(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setLoading(false);
          // setFilterOpen(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    getAllData();
  }, [page, search, sortby, sortOrder]);

    //sort function
    const sortFunction = (sortType) => {
      setSortby(sortType);
      if (sortOrder == "ASC") {
        setSortOrder("DESC");
      } else {
        setSortOrder("ASC");
      }
    };

    const handleStatusChange = async (item) => {
      await globalRequest(
        API_ROUTES?.CHANGEOFSTATUSROLEDATA + "/" + item?.id,
        "put",
        { status: item?.status === "active" ? "inactive" : "active" },
        {},
        true
      )
        .then((res) => {
          if (res.ack === 1) {
            getAllData();
          }
          else{
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

    const deletePermission = async () => {
      await globalRequest(
        API_ROUTES?.DELETEROLE + "/" + itemData.id,
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
            getAllData();       
          }
          else {
            dispatch(
              setSnackbar({
                isOpen: true,
                message: res?.message,
                state: "error",
              })
            );
            getAllData();
          }
        })
        .catch((err) => {
          console.error("err", err);
        });
    };

    const handleKeyUp = (e) => {
      const value = e.target.value;
      if (value.length >= 3) setSearch(value); else setSearch('');
    };


  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Roles & Permissions</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup searchFilter">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by role name"
                        className="w-full"
                        onKeyUp={handleKeyUp}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableFilterCol ml-2" style={{ width: "auto" }}>
                  {
                    roles.create ? (
                      <Button
                        className="btn btn-orange"
                        onClick={() => {
                          navigate("/create-roles-permission");
                        }}
                      >
                        <i className="pi pi-plus mr-2"></i> New Role
                      </Button>
                    ) : null
                  }                  
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th style={{width:'550px'}}>Role <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("role_name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span></th>
                    <th>Created Date <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("createdAt")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span> </th>
                    <th className="text-right">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="9">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.role_name}</td>
                        <td>{ formatDateFunction(item.createdAt,'dd/mm/yyyy') }</td>
                        <td className="text-right">
                          <Form.Check type="switch" 
                          checked={
                            item?.status === "active" ? true : false
                          }
                          onChange={() => {
                            handleStatusChange(item);
                          }}
                          disabled={roles.update_status ? false : true} />
                        </td>
                        <td  className="text-center">
                          {
                            roles.edit ? (
                              <CustomTooltip tooltipText={"Edit"}>
                            <i
                              className="fa fa-pencil"
                              onClick={() => {
                                navigate("/edit-roles-permission/"+item.id);
                              }}
                            />
                          </CustomTooltip>
                            ) : null
                          }
                          {
                            roles.delete ? (
                              <CustomTooltip tooltipText={"Delete"}>
                            <i
                              className="fa fa-trash"
                              onClick={() => {
                                setDeleteModalShow(true);
                                setItemData(item);
                              }}                             
                            />
                          </CustomTooltip>
                            ) : null
                          }                                                    
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">
                        <EmptyComponent noDataMessage="No Data Found" />
                      </td>
                    </tr>
                  )}
                  
                  
                </tbody>
              </Table>
                <div className="Pagination-content mb-3">
                  <span className="ml-3 ">Total Count : {totalCount}</span>
                  {totalCount && totalCount > PAGIANTION ? (
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalCount}
                    className="mt-2"
                    onPageChange={onPageChange}
                  />
                  ) : null}
                </div>
              
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          deletePermission();
        }}
      />
    </>
  );
};

export default RolesPermission;
