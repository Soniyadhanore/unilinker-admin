/** @format */
import React from 'react';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditFaq = () => {
  const navigate = useNavigate();
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="tooltip-area">
      Back to all faqs
    </Tooltip>
  );

  return (
    <>
      <section className="admin-content-wrapper">
        <div className="adminContent">
          <div className="tablefilterheader p-4">
            <div className="tableHeader">
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <i
                  className="pi pi-angle-left cursor-pointer"
                  onClick={() => {
                    navigate("/faqs");
                  }}
                  style={{ fontSize: "30px", margin: "0 12px 0 0" }}
                />
              </OverlayTrigger>

              <h4 className="h4 mb-0">Edit Faq for student</h4>
            </div>
          </div>

          <Divider className="mt-0 mb-1" />
          <div className="create-form">
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputText id="tile" />
                    <label htmlFor="tile">Order No*</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputTextarea id="username" rows={5} cols={30} />
                    <label htmlFor="username">Question(English)*</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputTextarea id="username" rows={5} cols={30} />
                    <label htmlFor="username">Question(Portuguese)*</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputTextarea id="username" rows={5} cols={30} />
                    <label htmlFor="username">Answer(English)*</label>
                  </span>
                </div>
              </div>
              <div className="lg:col-5 md:col-5 sm:col-12">
                <div className="formField">
                  <span className="p-float-label">
                    <InputTextarea id="username" rows={5} cols={30} />
                    <label htmlFor="username">Answer(Portuguese)*</label>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid">
              <div className="lg:col-10 md:col-12 sm:col-12 text-right">
                <Button className="btn btn-gray mr-1">Cancel</Button>
                <Button className="btn btn-orange ml-1 mr-1">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditFaq;
