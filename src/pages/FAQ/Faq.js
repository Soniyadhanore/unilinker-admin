/** @format */
import React from "react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { useNavigate } from "react-router-dom";
import { Form, Table } from "react-bootstrap";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import { Divider } from "primereact/divider";
import CustomTooltip from "../../Styles-Elements/CustomTooltip/CustomTooltip";
import Loaders from "../../Loaders";

const Faq = () => {
  const navigate = useNavigate();
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader">
            <div className="tableHeader">
              <h4 className="h4 mb-0">FAQ</h4>
              <div className="tableFilterRow">
                <div className="tableFilterCol">
                  <div className="p-inputgroup searchFilter">
                    <span className="p-input-icon-left w-full small-input">
                      <i className="pi pi-search" />
                      <InputText
                        placeholder="Search by All"
                        className="w-full"
                      />
                    </span>
                  </div>
                </div>
                <div className="tableFilterCol" style={{ width: "auto" }}>
                  <Button
                    className="btn btn-orange"
                    onClick={() => {
                      navigate("/add-faqs");
                    }}
                  >
                    <i className="pi pi-plus mr-2"></i> Add FAQ
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider className="mt-0 mb-2" />
          <div className="container-fluid adminTableContent">
            <TabView
              activeIndex={tabIndex}
              onTabChange={(e) => {
                setTabIndex(e.index);
              }}
            >
              <TabPanel header="Student">
                <div className="tableContent">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          Order No. <ImportExportIcon />
                        </th>
                        <th>Questions</th>
                        <th>Answers</th>
                        <th>Added on</th>
                        <th>Added By</th>
                        <th>Status</th>
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
                        <td>1</td>
                        <td>How might I get in touch with you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>03-02-2024</td>
                        <td>Erick Gibson</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i
                              className="fa fa-pencil"
                              onClick={() => {
                                navigate("/edit-faqs");
                              }}
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
                        <td>2</td>
                        <td>What does the guarantee cover?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>03-02-2024</td>
                        <td>Erick Gibson</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" defaultChecked />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
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
                        <td>3</td>
                        <td>How might I get in touch with you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>03-02-2024</td>
                        <td>Erick Gibson</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
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
                        <td>4</td>
                        <td>Where can I fnd you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>03-02-2024</td>
                        <td>Erick Gibson</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" defaultChecked />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
                          </CustomTooltip>
                          <CustomTooltip tooltipText={"Delete"}>
                            <i
                              className="fa fa-trash"
                              onClick={() => setDeleteModalShow(true)}
                            />
                          </CustomTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </TabPanel>
              <TabPanel header="Company Admin">
                <div className="tableContent">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          Order No. <ImportExportIcon />
                        </th>
                        <th>Questions</th>
                        <th>Answers</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td colSpan="5">
                        <Loaders />{" "}
                        {/* Replace with your actual Loader component */}
                      </td>
                    </tr>
                      <tr>
                        <td>1</td>
                        <td>How might I get in touch with you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i
                              className="fa fa-pencil"
                              onClick={() => {
                                navigate("/edit-company-faqs");
                              }}
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
                        <td>2</td>
                        <td>What does the guarantee cover?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" defaultChecked />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
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
                        <td>3</td>
                        <td>How might I get in touch with you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
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
                        <td>4</td>
                        <td>Where can I fnd you?</td>
                        <td> Lorem ipsum dolor sit</td>
                        <td>
                          {" "}
                          <Form.Check type="switch" defaultChecked />
                        </td>
                        <td className="text-center">
                          <CustomTooltip tooltipText={"Edit"}>
                            <i className="fa fa-pencil" />
                          </CustomTooltip>
                          <CustomTooltip tooltipText={"Delete"}>
                            <i
                              className="fa fa-trash"
                              onClick={() => setDeleteModalShow(true)}
                            />
                          </CustomTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
      {DeleteModalShow && (
        <DeleteModal
          show={DeleteModalShow}
          onHide={() => {
            setDeleteModalShow(false);
          }}
          deleteFunction={() => {
            setDeleteModalShow();
          }}
        />
      )}
    </>
  );
};

export default Faq;
