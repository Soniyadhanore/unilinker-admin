import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Paginator } from "primereact/paginator";
import CustomTooltip from "../../../Styles-Elements/CustomTooltip/CustomTooltip";
import FilterJobDetailHired from "./FilterJobDetailHired";
import { PAGIANTION, formatDateFunction } from "../../../common/HelperFunctions";
import globalRequest from "../../../prototype/globalRequest";
import { API_ROUTES } from "../../../common/Enum";
import PropTypes from 'prop-types';
import Loaders from "../../../Loaders";
import { IMAGE_BASE_URL } from "../../../BaseUrl";
import EmptyComponent from "../../EmptyComponent/EmptyComponent";
// import Loaders from "../../../Loaders";


export default function JobRequestHired({jobData}) {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    shift: [],
    application_type: [
      { name: "public",code: "public", isActive: false },
      { name: "private",code: "private", isActive: false },
    ],
    student_status: [
      { name: "applied",code: "applied", isActive: false },
      { name: "in-review",code: "in-review", isActive: false },      
    ],
  });
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const [hiredList, setHiredList] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [sortby, setSortby] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  
  const getAllData = async () => {
    setLoading(true);
    let shift = [];
    let application_type = [];
    let student_status = [];
    if (filter.shift)
      for (let item of filter.shift)
        if (item?.isActive) shift.push(item?.code);
    if (filter.application_type)
      for (let item of filter.application_type)
        if (item?.isActive) application_type.push(item?.code);
    if (filter.student_status)
      for (let item of filter.student_status)
        if (item?.isActive) student_status.push(item?.code);

    let sortBy = "id";
    let orderBy = "desc";
    if (sortby != "") sortBy = sortby;
    if (sortOrder != "") orderBy = sortOrder;

    let params = { 
      page: page, 
      limit: PAGIANTION,
      sort_by: sortBy,
      order_by: orderBy,
      search: search,
      shift: shift,
      application_type:application_type,
      student_status:student_status
    };
    console.log(jobData);
    await globalRequest(
      API_ROUTES?.GETALLHIREDAPPLICATION+'/'+jobData?.id,
      "get",
      {},
      { params: params },
      true
    )
      .then((res) => {
        if (res.ack === 1) {
          setHiredList(res.data?.rows || []);
          setTotalCount(res.data?.count || 0);
          setFilterOpen(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };
  const getShiftData = async () => {
    await globalRequest(API_ROUTES?.GETALLSHIFTS+'/'+jobData?.id, "get", {}, {}, true)
      .then((res) => {
        if (res.ack === 1) {
          let data = [];
          for (let row of res.data.rows){
            data.push({ name: row.district_en, code: row?.id });            
          }
          setFilter((prev)=>({
            ...prev,
            shift:data
          }))          
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
    getShiftData();
  }, []);
  useEffect(() => {
    getAllData();
  }, [page,search, sortby, sortOrder]); //selectedDistrict
  
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
      <div className="container-fluid adminTableContent">
        <div className="tableHeader">
          <div className="tableFilterRow ml-auto px-3 relative" style={{top: '-10px'}}>
            <div className="tableSearchCol">
              <div className="p-inputgroup jobRequestSearch">
                <span className="p-input-icon-left w-full small-input">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Search by student name or email address"
                    className="w-full"
                    value={search}
                    onKeyUp={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="tableSearchCol ml-2">
              <div className="FilterCol" style={{ width: "auto" }}>
                <Button
                  className="btn btn-light flex border-none"
                  onClick={toggleFilter}
                >
                  <i className="pi pi-filter mr-2"></i> Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="tableContent">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  Application Id <span className="sort-arrow-table" onClick={() => sortFunction("id")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                  Student Name <span className="sort-arrow-table" onClick={() => sortFunction("name")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                  Email Address <span className="sort-arrow-table" onClick={() => sortFunction("email")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                  Shift name <span className="sort-arrow-table" onClick={() => sortFunction("shift_name")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                  Applicant Type <span className="sort-arrow-table" onClick={() => sortFunction("application_type")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                    Hired on <span className="sort-arrow-table" onClick={() => sortFunction("hired_date")} >{" "}<ImportExportIcon />{" "}</span>
                </th>
                <th>
                    Offer letter 
                </th>
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
                  ) : hiredList && hiredList.length > 0 ? ( hiredList?.map((item, index) => (
                  <tr key={index} >
                    <td>{ item?.id }</td>
                    <td>{ item?.user?.first_name } { item.user.last_name }</td>
                    <td>{ item?.user?.email }</td>
                    <td>{ item?.job_shift?.shift_name ? item?.job_shift?.shift_name : '-' }</td>
                    <td>{ item?.user?.students[0]?.is_profile_public === true ? 'Public' : 'Private' }</td>
                    <td>{ formatDateFunction(item?.job_application_logs[0]?.createdAt,'dd-mm-yyyy') }</td>
                    <td className="cursor-pointer">
                      {
                        item?.offer_letter!='' ? (
                          <a href={IMAGE_BASE_URL+'resume/'+item.applicant_resume} target='_blank' rel="noreferrer" >{item?.offer_letter}</a>
                        ) : null
                      }                      
                    </td>
                    <td className="text-center">
                      {
                        item?.applicant_resume!='' ? (
                          <CustomTooltip tooltipText={"Download CV"}>
                            <a href={IMAGE_BASE_URL+'resume/'+item.applicant_resume} target='_blank' rel="noreferrer" ><i className="fa fa-download" /></a>                      
                          </CustomTooltip>
                        ) : '-'
                      }
                    </td>
                  </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <EmptyComponent noDataMessage="No Data Found"/>
                </td>
              </tr>
            )}
                    
              {/* <tr>
                <td>54321</td>
                <td>Jenny Wilson</td>
                <td>sara@gmail.com</td>
                <td>Shift name4</td>                
                <td>Public</td>
                <td>25/01/2024</td>
                <td className="cursor-pointer">Joboffer.pdf</td>
                <td className="text-center">
                  <CustomTooltip tooltipText={"Download CV"}>
                    <i className="fa fa-download" />
                  </CustomTooltip>
                </td>
              </tr> */}
            </tbody>
          </Table>
          <div className="Pagination-content mb-3">
          {totalCount && totalCount > 0 ? (
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

      {filterOpen && (
        <FilterJobDetailHired
          open={filterOpen}
          onClose={toggleFilter}
          filter={filter}
          setFilter={setFilter}
          callApi={() => {
            getAllData();
          }}
        />
      )}
    </>
  );
}

JobRequestHired.propTypes = {
  jobData: PropTypes.object.isRequired,
  jobType: PropTypes.string.isRequired
};