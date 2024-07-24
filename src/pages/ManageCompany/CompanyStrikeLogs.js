/** @format */
// import "../SubAdmin/SubAdmin.scss";
import { React, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Divider } from "primereact/divider";
import { useNavigate, useParams } from "react-router-dom";
import Loaders from "../../Loaders";
// import { useDispatch } from "react-redux";
// import { setSnackbar } from "../../redux/reducers/snackbar";
import { PAGIANTION, formatDateFunction  } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

const CompanyStrikeLogs = () => {
  const navigate = useNavigate();
  let {id} = useParams();
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
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
      // search: search,
      sort_by: sortBy,
      order_by: orderBy      
    };
    await globalRequest(
      API_ROUTES?.GETALLCOMPANYSTRIKE(id),
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

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
              <i
                className="pi pi-angle-left cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
                style={{ fontSize: "30px", margin: "0 12px 0 0" }}
              />
              <h4 className="h4 mb-0">Strike Logs</h4>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Job ID  <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("job_id")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>
                      Job Title  <span
                        className="sort-arrow-table"
                        onClick={() => sortFunction("job_title")}
                      >
                        {" "}
                        <ImportExportIcon />{" "}
                      </span>
                    </th>
                    <th>Strike Date & time</th>
                    <th>Strike Count</th>
                    <th className="text-center">Mode</th>
                  </tr>
                </thead>
                <tbody>
                    {/* <tr>
                      <td colSpan="4">
                        <Loaders />{" "}                        
                      </td>
                    </tr> */}
                  {/* <tr>
                    <td>#0001</td>
                    <td>Software Engineer</td>
                    <td>05-02-2024 6:55 PM</td>
                    <td className="text-center">
                      <span className="btn btn-light">job cancellation</span>
                    </td>
                  </tr> */}
                  {loading ? (
                    <tr>
                      <td colSpan="5">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  ) : listData && listData.length > 0 ? (
                    listData?.map((item, index) => (
                      <tr key={index}>
                        <td>#{ item.job_id }</td>
                        <td>{ item.job.job_title }</td>
                        <td>{ formatDateFunction(item.createdAt,'dd-mm-yyyy',true) }</td>
                        <td className="text-center">{ item?.total_count }</td>
                        <td className="text-center">
                          <span className="btn btn-light">{ item.mode=='admin_approved' ? 'admin approved' : ( item.mode=='admin_updated' ? 'admin updated' : 'automatic' ) }</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
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
    </>
  );
};

export default CompanyStrikeLogs;
