/** @format */
import { React, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
// import RejectJobRequestModal from "../../Modals/RejectJobRequestModal/RejectJobRequestModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import FilterJob from "./FilterJob";
import { API_ROUTES } from "../../common/Enum";
import globalRequest from "../../prototype/globalRequest";
import {
  PAGIANTION,
  capitalizeFirstLetter,
  formatDateFunction,
} from "../../common/HelperFunctions";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Loaders from "../../Loaders";
import ViewResaonModal from "../../Modals/ViewResaonModal/ViewResaonModal";

const JobRequestCancelListing = () => {
  const [loading, setLoading] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  // const [rejectJobRequestModal, setRejectJobRequestModal] = useState(false);
  const [viewResaonModal, setViewResaonModal] = useState(false);
  const [resaonMessage, setResaonMessage] = useState(false);

  const showAccept = async (item,status) => {
    let data = {
      status: status,
    };
    await globalRequest(
      API_ROUTES?.UPDATECANCELLEDREQESTJOBSTATUS + "/" + item?.id,
      "put",
      data,
      {},
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          getAllData(filter);
          toast.current.show({
            severity: "success",
            summary: "Approved",
            detail: status=='approved' ? "Request Aprroved" : 'Request Rejected' ,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  // const [itemData, setItemData] = useState([]);
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
      { name: "pending", isActive: false },
      { name: "rejected", isActive: false },
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
      degree_of_specialization: degree_of_specialization,
      shedule_type: shedule_type,
      requst_type: "request",
    };
    await globalRequest(
      API_ROUTES?.GETCANCLLEDJOBREQUEST,
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

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Job Request Cancel</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol">
                  <div className="p-inputgroup  jobRequestSearch">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by company name or job title or description text"
                        className="w-full"
                        onKeyUp={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol ml-2 mr-2">
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
                    company
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("company_institute_name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                    company user name
                      <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("degree_of_specialization")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>requested date</th>
                    <th>Reason </th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
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
                            navigate("/job-detail/" + item?.id);
                          }}
                        >
                          #{item?.id}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item?.id);
                          }}
                        >
                          {capitalizeFirstLetter(item?.job?.job_title)}{" "}
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
                          Company User name XYZ
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            navigate("/job-detail/" + item.id);
                          }}
                        >
                          { formatDateFunction(item.createdAt,'dd-mm-yyyy') }
                        </td>
                        <td
                          className="cursor-pointer"
                        >
                          <span
                            className="link cursor-pointer"
                            onClick={() => {
                              setViewResaonModal(true);
                              setResaonMessage(item.reason);
                            }}
                          >
                            View reason
                          </span>
                        </td>
                        <td
                          className="cursor-pointer"
                        >
                          <span className="btn btn-light">
                            {capitalizeFirstLetter(item?.status)}
                          </span>
                        </td>
                        <td className="text-center">
                            <CustomTooltip tooltipText={"Approve"}>
                                <i
                                  className="fa fa-check"
                                  onClick={() => {
                                    showAccept(item,'approved');
                                  }}
                                />
                              </CustomTooltip>
                              <CustomTooltip tooltipText={"Reject"}>
                                <i
                                  className="fa fa-remove"
                                  // onClick={() => {
                                  //   setRejectJobRequestModal(true),
                                  //     setItemData(item);
                                  // }}
                                  onClick={() => {
                                    showAccept(item,'rejected');
                                  }}
                                />
                            </CustomTooltip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
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
      />
      {/* <RejectJobRequestModal
        show={rejectJobRequestModal}
        onHide={() => {
          setRejectJobRequestModal(false);
        }}
        callApi={() => {
          getAllData(filter);
        }}
        item={itemData}
      /> */}
      <Toast ref={toast} />
      {/* <FilterJob open={filterOpen} onClose={toggleFilter} /> */}
      {filterOpen && (
        <FilterJob
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={() => {
            getAllData(filter);
          }}
        />
      )}
      <ViewResaonModal
        show={viewResaonModal}
        onHide={() => {
          setViewResaonModal(false);
        }}
        resaonMessage={resaonMessage}
      />
    </>
  );
};

export default JobRequestCancelListing;
