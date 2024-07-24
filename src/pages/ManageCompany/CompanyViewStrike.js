/** @format */
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState, React, useEffect } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import StrikeCloseModal from "../../Modals/StrikeCloseModal/StrikeCloseModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { PAGIANTION, capitalizeFirstLetter, formatDateFunction } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/reducers/snackbar";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import ViewResaonModal from "../../Modals/ViewResaonModal/ViewResaonModal";
import Loaders from "../../Loaders";

const CompanyViewStrike = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const toast = useRef(null);
  const [strikeCloseModal, setStrikeCloseModal] = useState(false);  
  const [viewResaonModal, setViewResaonModal] = useState(false);
  const [resaonMessage, setResaonMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const getAllData = async () => {
    setLoading(true);
    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = {
      page: page,
      limit: PAGIANTION,
      sort_by: sortBy,
      order_by: orderBy,      
    };
    await globalRequest(
      API_ROUTES?.GETALLSTUDENTSTRIKE,
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
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  const approveStatus = async (id) => {

    const data = {
      status: 'approved',
    };
    
    await globalRequest(API_ROUTES?.CHANGEOFSTATUSSTRIKEDATA + '/' + id, 'put', data, {}, true)
      .then((res) => {
        if (res.ack === 1) {         
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Data successfully updated.",
              state: "success",
            })
          );
          getAllData();
        } else {
          dispatch(
            setSnackbar({
              isOpen: true,
              message: "Something went wrong please try again some time later.",
              state: "error",
            })
          );
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
  }, [page, sortby, sortOrder]);

  //sort function
  const sortFunction = (sortType) => {
    setSortby(sortType);
    if (sortOrder == "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder("ASC");
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="tooltip-area">
      Back to all Students
    </Tooltip>
  );
  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <i
                  className="pi pi-angle-left cursor-pointer"
                  onClick={() => {
                    navigate("/manage-company");
                  }}
                  style={{ fontSize: "30px", margin: "0 12px 0 0" }}
                />
              </OverlayTrigger>
              <h4 className="h4 mb-0">Strike ({totalCount})</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Unicompany name <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("company")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Contact Person full name <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("company_name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Date <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("date")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Job <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("job_title")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Student name <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("student_name")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>Reason text</th>
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
                        <td>{ item?.StrikeForUser?.company_institutes[0]?.company_institute_name }</td>
                        <td>{ item?.StrikeForUser?.first_name } { item?.StrikeForUser?.last_name }</td>
                        <td>{ formatDateFunction(item?.createdAt,'dd-mm-yyyy') }</td>
                        <td>{item?.job?.job_title}</td>
                        <td>{ item?.AddedByUser?.first_name } { item?.AddedByUser?.last_name }</td>
                        <td><span className="link cursor-pointer" onClick={() => {setViewResaonModal(true);setResaonMessage(item.reason);}}>View reason</span></td>
                        <td className='text-center'>
                          {
                            item?.status=='new' ? (
                              <>
                              <CustomTooltip tooltipText={"Reject"}>
                                <i
                                  className="fa fa-times"
                                  onClick={() => {
                                    setStrikeCloseModal(true);
                                    setItemData(item);
                                  }}
                                />
                              </CustomTooltip> 
                              <CustomTooltip tooltipText={"Approve"}>
                                <i className="fa fa-check" onClick={() => {
                                    approveStatus(item.id);
                                  }} />
                              </CustomTooltip>
                              </>
                            ) : <span>{ capitalizeFirstLetter(item.status) }</span>
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
              {totalCount && totalCount > PAGIANTION ? (
                <div className="Pagination-content mb-3">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalCount}
                    className="mt-2"
                    onPageChange={onPageChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <Toast ref={toast} />
      <StrikeCloseModal
        show={strikeCloseModal}
        onHide={() => {setStrikeCloseModal(false);getAllData();}}
        id={itemData.id}
      />
      
      <ViewResaonModal
        show={viewResaonModal}
        onHide={() => {setViewResaonModal(false)}}
        resaonMessage={resaonMessage}
      />
    </>
  );
};

export default CompanyViewStrike;
