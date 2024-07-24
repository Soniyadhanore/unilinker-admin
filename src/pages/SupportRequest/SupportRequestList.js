/** @format */
import { React, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import FilterSupport from "./FilterSupport";
import { PAGIANTION, capitalizeFirstLetter } from "../../common/HelperFunctions";
import globalRequest from "../../prototype/globalRequest";
import { API_ROUTES } from "../../common/Enum";
import { formatDateFunction } from "../../common/HelperFunctions";
import { Paginator } from "primereact/paginator";
// import EmptyComponent from "../../Modals/EmptyComponent/EmptyComponent";
import EmptyComponent from "../EmptyComponent/EmptyComponent";

const SupportRequestList = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(PAGIANTION);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState({
    userType: [
      { name: "student", isActive: false },
      { name: "company", isActive: false },
    ],
    status: [
      { name: "open", isActive: false },
      { name: "resolved", isActive: false },
    ],
  });

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const getAllData = async () => {
    let userType = [];
    let status = [];
    for (let item of filter.userType)
      if (item.isActive) userType.push(item.name);
    for (let item of filter.status) if (item.isActive) status.push(item.name);

    let params = {
      page: page,
      limit: PAGIANTION,
      search: search,
      userType: userType,
      status: status,
    };
    await globalRequest(
      API_ROUTES?.GETHELPANDSUPPORTDATA,
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
  }, [page, search]);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Support Request</h4>
              <div className="tableFilterRow">
                <div className="tableFilterRow ml-auto">
                  <div className="FilterCol" style={{ width: "auto" }}>
                    <div className="p-inputgroup w-320">
                      <span className="p-input-icon-left small-input">
                        <i className="pi pi-search" />
                        <InputText
                          id="tile"
                          placeholder="Search by user name or any text"
                          className="w-full"
                          onKeyUp={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="FilterCol ml-2" style={{ width: "auto" }}>
                    <Button className="btn btn-light" onClick={toggleFilter}>
                      <i className="pi pi-filter "></i> Filter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-1" />
          <div className="container-fluid adminTableContent p-4">
            {listData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="support-card"
                  onClick={() => {
                    navigate("/support-request-details/" + item.id);
                  }}
                >
                  <div className="support-head">
                    <div>
                      <h6>{item.help_n_support_type.type_en}</h6>
                    </div>
                    <div>
                      <h4>
                        {formatDateFunction(item.createdAt, "dd/mm/yyyy", true)}
                      </h4>
                    </div>
                  </div>
                  <span>{`Received from '${item?.user?.first_name} ${item?.user?.last_name}'`} ({item?.user?.email})</span>
                  <h5>{item.title}</h5>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                  <div className="text-right">
                    <div className="btn btn-light">
                      <b>{ capitalizeFirstLetter(item.status)}</b>                      
                    </div>                    
                  </div>
                  {
                    (item.status==='resolved') ? (
                      <div className="text-right">
                        <small>{formatDateFunction(item.updatedAt, "dd/mm/yyyy", true)}</small>
                      </div>
                    ) : null
                  }                  
                </div>
              );
            })}
          <div className="Pagination-content mb-3">
          <span className="ml-3 ">Total Count : {totalCount}</span>
            {(totalCount && totalCount>0) ? (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={totalCount}
                className="mt-2 p-0"
                onPageChange={onPageChange}
              />
            ) : (
             <div className="text-center">
                <EmptyComponent noDataMessage="No Data Found"/>
              </div>
            ) }
          </div>
          </div>
        </div>
      </section>
      {filterOpen && (
        <FilterSupport
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
};

export default SupportRequestList;
