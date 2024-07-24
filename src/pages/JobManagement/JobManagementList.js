/** @format */
import { InputText } from "primereact/inputtext";
import { Button, Form, Table } from "react-bootstrap"; //
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import { useRef, useState, React, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
// import RejectJobRequestModal from "../../Modals/RejectJobRequestModal/RejectJobRequestModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import Filter from "../Filter/Filter";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import {
  PAGIANTION,
  capitalizeFirstLetter,
  formatDateFunction,
  getPermissionFromAll,
} from "../../common/HelperFunctions";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const JobManagementList = () => {
  // const navigate = useNavigate();
  // const [first, setFirst] = useState(0);
  // const [rows, setRows] = useState(10);
  // useEffect(() => {
  //   setFirst(1);
  //   setRows(0);
  // }, []);
  // const toast = useRef(null);
  // let params = useLocation();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let JobManagement = getPermissionFromAll("job management", accessToken);

  console.log(JobManagement);

  const dispatch = useDispatch();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  // const [rejectJobRequestModal, setRejectJobRequestModal] = useState(false);
  const menuRight = useRef(null);
  const items = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
  ];
  // const [filterOpen, setFilterOpen] = useState(false);
  // const toggleFilter = () => {
  //   setFilterOpen(!filterOpen);
  // };
  const [filterOpen, setFilterOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const navigate = useNavigate();
  const toast = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const [filter, setFilter] = useState({
    degree_of_specialization: [
      { name: "specialized", isActive: false },
      { name: "non-specialized", isActive: false },
    ],
    shedule_type: [
      { name: "full-time", isActive: false },
      { name: "weekly", isActive: false },
      { name: "custom", isActive: false },
    ],
    status: [
      { name: "active", isActive: false },
      { name: "inactive", isActive: false },
    ],
  });

  const getAllData = async (filter) => {
    setLoading(true);
    // let status = [];
    let degree_of_specialization = [];
    let shedule_type = [];
    let status = [];

    for (let item of filter.degree_of_specialization)
      if (item?.isActive) degree_of_specialization.push(item?.name);
    for (let item of filter.shedule_type)
      if (item?.isActive) shedule_type.push(item?.name);
    for (let item of filter.status) if (item?.isActive) status.push(item?.name);
    // if (filter?.start_date && filter?.start_date !== "")
    //   start_date = formatDateFunction(filter?.start_date, "yyyy-mm-dd", false);
    // if (filter?.end_date && filter?.end_date !== "")
    //   end_date = formatDateFunction(filter?.end_date, "yyyy-mm-dd", false);

    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = {
      sort_by: sortBy,
      order_by: orderBy,
      page: page,
      limit: PAGIANTION,
      search: search,
      status: status,
      requst_type: "management",
      degree_of_specialization: degree_of_specialization,
      shedule_type: shedule_type,
    };
    if (companyId != null) params.companyId = companyId;
    await globalRequest(
      API_ROUTES?.GETALLJOBS,
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

  useEffect(() => {
    getAllData(filter);
  }, [page, search, sortby, sortOrder]);

  const onPageChange = (event) => {
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };

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
      API_ROUTES?.UPDATEJOBSTATUS + "/" + item?.id,
      "put",
      { status: item?.status === "active" ? "inactive" : "active" },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getAllData(filter);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const deleteData = async () => {
    await globalRequest(
      API_ROUTES?.DELETEJOB + "/" + itemData.id,
      "delete",
      {},
      {},
      true
    )
      .then((res) => {
        setDeleteModalShow(false);
        if (res.ack === 1) {
          getAllData(filter);
          dispatch(
            setSnackbar({
              isOpen: true,
              message: res?.message,
              state: "success",
            })
          );
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

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Job Management</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup searchFilterAcademic">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by title, company name, description "
                        className="w-full"
                        onKeyUp={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol ml-2 mr-1">
                  <div className="tableFilterRow ml-auto">
                    <div className="FilterCol" style={{ width: "auto" }}>
                      <Menu
                        model={items}
                        popup
                        ref={menuRight}
                        id="popup_menu_right"
                      />
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
                  {JobManagement.create ? (
                    <Button
                      className="btn btn-orange"
                      onClick={() => {
                        navigate("/create-job");
                      }}
                    >
                      <i className="pi pi-plus mr-2"></i> Post New Job
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
                      Job ID{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("id")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Title{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("job_title")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Company Name{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("company_institute_name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      specialization{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("degree_of_specialization")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      schedule type{" "}
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("shedule_type")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>job start date</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData.map((item, index) => (
                      <tr key={index}>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          #{item?.slug}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          {item?.job_title}{" "}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          {item?.company_institute?.company_institute_name}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          {capitalizeFirstLetter(item?.degree_of_specialization)}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          {capitalizeFirstLetter(item?.schedule_type)}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          {item?.job_shifts[0]?.start_date
                            ? formatDateFunction(
                                item?.job_shifts[0]?.start_date,
                                "dd-mm-yyyy"
                              )
                            : ""}
                        </td>
                        {/* 01-03-2024 */}
                        <td>
                          <Form.Check
                            type="switch"
                            checked={item?.status === "active" ? true : false}
                            disabled={
                              JobManagement.status_update ? true : false
                            }
                            onChange={() => {
                              handleStatusChange(item);
                            }}
                          />
                          {/* {item?.status} */}
                        </td>
                        <td className="text-center">
                          {JobManagement.create ? (
                            <CustomTooltip tooltipText={"Copy"}>
                              <i
                                className="fa fa-copy"
                                onClick={() => {
                                  localStorage.setItem("jobId", item?.id);
                                  navigate("/create-job");
                                }}
                              />
                            </CustomTooltip>
                          ) : null}
                          {JobManagement.edit ? (
                            <CustomTooltip tooltipText={"Edit"}>
                              <i
                                className="fa fa-pencil"
                                onClick={() => {
                                  navigate("/job-edit/" + item.id);
                                }}
                              />
                            </CustomTooltip>
                          ) : null}
                          {JobManagement.delete ? (
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
                      <td colSpan="8">
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
      <DeleteModal
        show={DeleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        deleteFunction={() => {
          //call here
          deleteData();
        }}
      />
      {/* <RejectJobRequestModal
        show={rejectJobRequestModal}
        onHide={() => setRejectJobRequestModal(false)}
      /> */}
      <Toast ref={toast} />
      {/* <Filter open={filterOpen} onClose={toggleFilter} /> */}
      {filterOpen && (
        <Filter
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={() => {
            getAllData(filter);
          }}
        />
      )}
    </>
  );
};

export default JobManagementList;
