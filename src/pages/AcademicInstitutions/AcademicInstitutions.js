/** @format */
import { InputText } from "primereact/inputtext";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import { useRef, useState, React, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import RejectStudentUnionModal from "../../Modals/RejectStudentUnionModal/RejectStudentUnionModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import FilterAcademicInstitution from "./FilterAcademicInstitution";
import { PAGIANTION, capitalizeFirstLetter, formatDateFunction, getPermissionFromAll } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
// import { format } from 'date-fns';
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import Loaders from "../../Loaders";
import addDeleteGetLocalStorage from "../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../common/LocalVariable";
import jwtDecode from "jwt-decode";

const AcademicInstitutions = () => {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [itemData, setItemData] = useState([]);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const navigate = useNavigate();
  const toast = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [rejectStudentUnionModal, setRejectStudentUnionModal] = useState(false);
  const menuRight = useRef(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    status: [
      { name: "pending", isActive: false },
      { name: "rejected", isActive: false },
    ],
    start_date: null,
    end_date: null,
  });

  const items = [
    { label: "option1" },
    { label: "option2" },
    { label: "option3" },
  ];
  useEffect(() => {
    setFirst(1);
    setRows(0);
  }, []);

  const getAllData = async (filter) => {
    setLoading(true);
    let status = [];
    let start_date = "";
    let end_date = "";

    for (let item of filter.status) if (item?.isActive) status.push(item?.name);
    if (filter?.start_date && filter?.start_date !== "")
      start_date = formatDateFunction(filter?.start_date, "yyyy-mm-dd", false);
    if (filter?.end_date && filter?.end_date !== "")
      end_date = formatDateFunction(filter?.end_date, "yyyy-mm-dd", false);

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
      start_date: start_date,
      end_date: end_date,
    };
    await globalRequest(
      API_ROUTES?.GETCOMPANYREQUESTDATA,
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

  const handleStatusChange = async (status, item) => {
    await globalRequest(
      API_ROUTES?.UPDATESTATUSOFCOMPANYDATA(item?.addedBy),
      "put",
      { status: status },
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: status==='active'?"Academic Institutions successfully approved.":'Academic Institutions successfully rejected.',
              state: "success",
            })
          );
          getAllData(filter);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
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

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);
  let AcademicRequests = getPermissionFromAll("Academic requests", accessToken);

  return (
    <>
      <section className="admin-content-wrapper ">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Academic Requests</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup searchFilterAcademic small-input">
                    <span className="p-input-icon-left w-full">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by Faculty,academic institution name, contact person"
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
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th >
                      Faculty name <span className="sort-arrow-table" onClick={() => sortFunction("facultyName")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>
                      Academic institution name <span className="sort-arrow-table" onClick={() => sortFunction("company_institute_name")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>
                      Contact person full name <span className="sort-arrow-table" onClick={() => sortFunction("first_name")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>
                      Requested date <span className="sort-arrow-table" onClick={() => sortFunction("createdAt")} >{" "}<ImportExportIcon />{" "}</span>
                    </th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="6">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData.map((item, index) => (
                      <tr key={index}>
                        <td className="cursor-pointer"
                          onClick={() => {
                            navigate(
                              "/academic-institutions-details/" + item.id
                            );
                          }}
                        >
                          {item?.facultyName}                          
                        </td>
                        <td className="cursor-pointer" onClick={() => {
                            navigate(
                              "/academic-institutions-details/" + item.id
                            );
                          }} >{item?.company_institute_name}</td>
                        <td className="cursor-pointer" onClick={() => {
                            navigate(
                              "/academic-institutions-details/" + item.id
                            );
                          }}>
                          {item?.user?.first_name} {item?.user?.last_name}
                        </td>
                        <td className="cursor-pointer" onClick={() => {
                            navigate(
                              "/academic-institutions-details/" + item.id
                            );
                          }} >{formatDateFunction(item?.createdAt)}</td>
                        <td className="cursor-pointer" onClick={() => {
                            navigate(
                              "/academic-institutions-details/" + item.id
                            );
                          }} >
                          <span className="btn btn-light">{ capitalizeFirstLetter(item?.status)}</span>
                        </td>
                        <td className="text-center">
                          {item?.status === "pending" && (
                            <>
                            {
                              AcademicRequests.approve ? (
                                <CustomTooltip tooltipText={"Approve"}>
                                <i
                                  className="fa fa-check"
                                  onClick={() => {
                                    handleStatusChange("active", item);
                                  }}
                                />
                              </CustomTooltip>
                              ) : null
                            }
                            {
                              AcademicRequests.reject ? (
                                <CustomTooltip tooltipText={"Reject"}>
                                <i
                                  className="fa fa-remove"
                                  onClick={() => {
                                    setRejectStudentUnionModal(true),
                                    setItemData(item);
                                  }}
                                />
                              </CustomTooltip>
                              ) : null
                            }
                            {
                              AcademicRequests.edit ? (
                                <CustomTooltip tooltipText={"Edit"}>
                                <i
                                  className="fa fa-pencil"
                                  onClick={() => {
                                    navigate(
                                      "/edit-company/" + item?.id
                                    );
                                  }}
                                />
                              </CustomTooltip>
                              ) : '-'
                            }
                            </>
                          )}
                          {item?.status === "rejected" && (
                            <>
                              <CustomTooltip tooltipText={"View"}>
                                <i
                                  className="fa fa-eye"
                                  onClick={() => {
                                    navigate(
                                      "/academic-institutions-details/" + item?.id
                                    );
                                  }}
                                />
                              </CustomTooltip>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <EmptyComponent noDataMessage="No Data Found"/>
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
      <RejectStudentUnionModal
        show={rejectStudentUnionModal}
        onHide={() => {
          setRejectStudentUnionModal(false);
          getAllData(filter);
        }}
        item={itemData}
      />
      {/* <FilterAcademicInstitution open={filterOpen} onClose={toggleFilter} /> */}
      {filterOpen && (
        <FilterAcademicInstitution
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={(data) => {
            getAllData(data);
          }}
        />
      )}
    </>
  );
};

export default AcademicInstitutions;
