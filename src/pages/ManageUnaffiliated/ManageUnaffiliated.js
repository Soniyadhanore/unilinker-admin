/** @format */
import { InputText } from "primereact/inputtext";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef, useState, React } from "react";
import { Paginator } from "primereact/paginator";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import RejectUniaffiliateRequestModal from "../../Modals/RejectUniaffiliateRequestModal/RejectUniaffiliateRequestModal";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import { Divider } from "primereact/divider";
import FilterUnaffiated from "./FilterUnaffiated";
import Loaders from "../../Loaders";

const ManageUnaffiliated = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const navigate = useNavigate();
  const toast = useRef(null);
  const [rejectUniaffiliateRequestModal, setRejectUniaffiliateRequestModal] = useState(false);

  
  const showAccept = () => {
    toast.current.show({
      severity: "success",
      summary: "Approved",
      detail: "Approve Uniaffiliates request",
      life: 3000,
    });
  };
  const showMarkExpired = () => {
    toast.current.show({
      severity: "success",
      summary: "Mark Us Expired",
      life: 3000,
    });
  };
  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">Uniaffiliates</h4>
              <div className="tableFilterRow ml-auto">
                <div className="tableSearchCol mr-1 ml-1">
                  <div className="p-inputgroup affiliateFilter">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText placeholder="Search by affiliate title, company name" className="w-full" />
                    </span>
                  </div>
                </div>
                <div className="tableSearchCol ml-1 mr-1">
                  <div className="tableFilterRow ml-auto">
                    <div className="FilterCol" style={{ width: "auto" }}>
                      {/* <Menu model={items} popup ref={menuRight} id="popup_menu_right" /> */}
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
                  <Button
                    className="btn btn-orange"
                    onClick={() => {
                      navigate("/add-affiliates");
                    }}
                  >
                    <i className="pi pi-plus mr-2"></i> Create affiliate
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-2" />
          <div className="container-fluid adminTableContent">
            <div className="tableContent">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      Company Name <ImportExportIcon />
                    </th>
                    <th>
                      Affiliate type, <ImportExportIcon />
                    </th>
                    <th>
                      Category <ImportExportIcon />
                    </th>
                    <th>
                      Title <ImportExportIcon />
                    </th>
                    <th>
                      Status <ImportExportIcon />
                    </th>
                    <th>
                      Expiry date <ImportExportIcon />
                    </th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td colSpan="7">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                  <tr>
                    <td
                      onClick={() => {
                        navigate("/affiliates-details");
                      }}
                    >
                      Amazon
                    </td>
                    <td>Online discount</td>
                    <td>Shopping</td>
                    <td>Coupon title</td>
                    <td>
                      <span className="btn btn-light">Review pending</span>
                    </td>
                    <td>01-03-2024</td>
                    <td className="text-center">
                      <CustomTooltip tooltipText="View">
                        <i
                          className="fa fa-eye"
                          onClick={() => {
                            navigate("/affiliates-details");
                          }}
                        />
                      </CustomTooltip>
                      <CustomTooltip tooltipText="Approve">
                        <i className="fa fa-check" onClick={showAccept} />
                      </CustomTooltip>
                      <CustomTooltip tooltipText="Reject">
                        <i
                          className="fa fa-remove"
                          onClick={() => setRejectUniaffiliateRequestModal(true)}
                        />
                      </CustomTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => {
                        navigate("/affiliates-details");
                      }}
                    >
                      Vila Vita Parc Resort & Spa
                    </td>
                    <td>General Ads/Announcement</td>
                    <td>Entertainment</td>
                    <td>Coupon title</td>
                    <td>
                      <span className="btn btn-light">Approved</span>
                    </td>
                    <td>10/03/2024</td>
                    <td className="text-center">
                      <CustomTooltip tooltipText="View">
                        <i
                          className="fa fa-eye"
                          onClick={() => {
                            navigate("/affiliates-details");
                          }}
                        />
                      </CustomTooltip>
                      <CustomTooltip tooltipText="Mark as expire">
                        <i
                          className="fa fa-calendar-check-o"
                          onClick={showMarkExpired}
                        />
                      </CustomTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => {
                        navigate("/affiliates-details");
                      }}
                    >
                      Vila Vita Parc Resort & Spa
                    </td>
                    <td>Online discount</td>
                    <td>Food</td>
                    <td>Coupon title</td>
                    <td>
                      <span className="btn btn-light">Rejected</span>
                    </td>
                    <td>-</td>
                    <td className="text-center">
                      <CustomTooltip tooltipText="View">
                        <i
                          className="fa fa-eye"
                          onClick={() => {
                            navigate("/affiliates-details");
                          }}
                        />
                      </CustomTooltip>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="Pagination-content mb-3">
                <Paginator
                  first={'2'}
                  rows={'1'}
                  totalRecords={25}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RejectUniaffiliateRequestModal
        show={rejectUniaffiliateRequestModal}
        onHide={() => setRejectUniaffiliateRequestModal(false)}
      />
      <Toast ref={toast} />
      <FilterUnaffiated open={filterOpen} onClose={toggleFilter} />
    </>
  );
};

export default ManageUnaffiliated;
