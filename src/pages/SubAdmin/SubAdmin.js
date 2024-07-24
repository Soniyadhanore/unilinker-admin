/** @format */

import { React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Divider } from "primereact/divider";
import FilterSubAdmin from "./FilterSubAdmin";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { PAGIANTION, getPermissionFromAll } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const SubAdminRole = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [roleList, setRoleList] = useState({});
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
  let subadmin = getPermissionFromAll("subadmin", accessToken);

  const [filter, setFilter] = useState({
    role: [],
    status: [
      { name: "active", code: "active" },
      { name: "inactive", code: "inactive" },
      { name: "invitation pending", code: "invitation_pending" },
    ],
  });

  const getAllData = async () => {
    setLoading(true);
    let role = [];
    let status = [];
    if (filter.role)
      for (let item of filter.role) if (item?.isActive) role.push(item?.code);
    if (filter.status)
      for (let item of filter.status)
        if (item?.isActive) status.push(item?.code);

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
      role: role,
      status: status,
    };
    await globalRequest(
      API_ROUTES?.GETALLSUBADMIN,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setListData(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setFilterOpen(false);
          setLoading(false);
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

  // const showSuccess = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Success",
  //     detail: "Message Content",
  //     life: 3000,
  //   });
  // };

  const handleKeyUp = (e) => {
    const value = e.target.value;
    if (value.length >= 3) setSearch(value);
    else setSearch("");
  };

  const handleStatusChange = async (item) => {
    await globalRequest(
      API_ROUTES?.CHANGEOFSTATUSSUBADMINDATA + "/" + item?.id,
      "put",
      { status: item?.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getAllData();
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

  const deleteSubadmin = async () => {
    await globalRequest(
      API_ROUTES?.DELETESUBADMIN + "/" + itemData.id,
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
        } else {
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

  //Get Role Data
  const getRoleList = async () => {
    await globalRequest(API_ROUTES?.GETALLROLES, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          let data = res.data;
          let list = [];
          for (let item of data.rows)
            list.push({ name: item.role_name, code: item.id });
          setFilter((prevData) => {
            return {
              ...prevData,
              role: list,
            };
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    getRoleList();
  }, []);

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
          getAllData();
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  return (
    <>
      <section className="admin-content-wrapper subAdminCss">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Sub Admin</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup searchFilter">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by name & email"
                        className="w-full "
                        onKeyUp={handleKeyUp}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol ml-1">
                  <div className="tableFilterRow ml-auto">
                    <div className="FilterCol" style={{ width: "auto" }}>
                      <Button
                        className="btn btn-light"
                        onClick={toggleFilter}
                        aria-controls="popup_menu_right"
                        aria-haspopup
                      >
                        <i className="pi pi-filter mr-2"></i> Filter
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="tableFilterCol ml-1" style={{ width: "auto" }}>
                  {subadmin.create ? (
                    <Button
                      className="btn btn-orange"
                      onClick={() => {
                        navigate("/create-sub-admin");
                      }}
                    >
                      <i className="pi pi-plus mr-2"></i> Create Sub Admin
                    </Button>
                  ) : null}
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
                    <th>
                      Name{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Email Address{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("email")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Role{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("role")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Status{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("status")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
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
                        <td
                          onClick={() => {
                            navigate("/view-sub-admin/" + item.id);
                          }}
                        >
                          <span className="cursor-pointer">
                            {item?.first_name} {item?.last_name}
                          </span>
                        </td>
                        <td>{item?.email} </td>
                        <td>{item?.employees[0]?.role?.role_name}</td>
                        <td>
                          {item?.is_first_login === true ? (
                            <span className="btn btn-light">
                              Invitation pending
                            </span>
                          ) : (
                            <Form.Check
                              type="switch"
                              checked={item?.status === "active" ? true : false}
                              onChange={() => {
                                handleStatusChange(item);
                              }}
                              disabled={subadmin.update_status ? false : true }
                            />
                          )}
                        </td>
                        <td className="text-center">
                          {item?.is_first_login === true ? (
                            <>
                              <CustomTooltip
                                tooltipText={"Resend Password Link"}
                              >
                                <i
                                  onClick={() => {
                                    // setItemData(item);
                                    resentInvitation(item.id);
                                  }}
                                  className="pi pi-refresh"
                                />
                              </CustomTooltip>
                            </>
                          ) : null}
                          {subadmin.edit ? (
                            <CustomTooltip tooltipText={"Edit"}>
                              <i
                                onClick={() => {
                                  navigate("/edit-sub-admin/" + item.id);
                                }}
                                className="fa fa-pencil"
                              />
                            </CustomTooltip>
                          ) : null}
                          {subadmin.delete ? (
                            <CustomTooltip tooltipText={"Delete"}>
                              <i
                                className="fa fa-trash"
                                onClick={() => {
                                  setDeleteModalShow(true), setItemData(item);
                                }}
                              />
                            </CustomTooltip>
                          ) : null}
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
                  {/* <tr>
                    <td>
                      <span className="cursor-pointer">Robert Campbell</span>
                    </td>
                    <td>robertc@armyspy.com </td>
                    <td>Employee</td>
                    <td>
                      <Form.Check type="switch" checked />
                    </td>
                    <td className="text-center">
                      <CustomTooltip tooltipText={"Resend Password Link"}>
                        <i onClick={showSuccess} className="pi pi-refresh" />
                      </CustomTooltip>
                      <CustomTooltip tooltipText={"Edit"}>
                        <i
                          onClick={() => {
                            navigate("/edit-sub-admin");
                          }}
                          className="fa fa-pencil"
                        />
                      </CustomTooltip>
                      <CustomTooltip tooltipText={"Delete"}>
                        <i
                          className="fa fa-trash"
                          onClick={() => setDeleteModalShow(true)}
                        />
                      </CustomTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="cursor-pointer">Albert Smith </span>
                    </td>
                    <td>Albert@Smith.com</td>
                    <td>Administrator</td>
                    <td>
                      <Form.Check type="switch" />
                    </td>
                    <td className="text-center">
                       <CustomTooltip tooltipText={"Resend Password Link"}>
                        <i onClick={showSuccess} className="pi pi-refresh" />
                      </CustomTooltip> 
                      <CustomTooltip tooltipText={"Edit"}>
                        <i
                          onClick={() => {
                            navigate("/edit-sub-admin");
                          }}
                          className="fa fa-pencil"
                        />
                      </CustomTooltip>
                      <CustomTooltip tooltipText={"Delete"}>
                        <i
                          className="fa fa-trash"
                          onClick={() => setDeleteModalShow(true)}
                        />
                      </CustomTooltip>
                    </td>
                  </tr> */}
                </tbody>
              </Table>

              <div className=" mb-3">
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
      {/* <FilterSubAdmin open={filterOpen} onClose={toggleFilter}  /> */}
      {filterOpen && (
        <FilterSubAdmin
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={() => {
            getAllData();
          }}
        />
      )}

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
    </>
  );
};

export default SubAdminRole;
