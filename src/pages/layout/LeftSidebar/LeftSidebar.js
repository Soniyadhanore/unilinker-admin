/** @format */
import "./LeftSidebar.scss";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SidebarLogo from "../../../assets/images/logo/SidebarLogo.svg";
import masterTableIcon from "../../../assets/images/icons/MasterTable.svg";
import subAdminIcon from "../../../assets/images/icons/subadmin.svg";
import rolesIcon from "../../../assets/images/icons/role.svg";
import studentListIcon from "../../../assets/images/icons/studentlist.svg";
import supportRequestIcon from "../../../assets/images/icons/support.svg";
import cmsIcon from "../../../assets/images/icons/cms.svg";
import faqIcon from "../../../assets/images/icons/faq.svg";
import manageUnaffiliatedIcon from "../../../assets/images/icons/ManageUnaffiliated.svg";
import profileIcon from "../../../assets/images/icons/profile.svg";
import academicInstitutionsIcon from "../../../assets/images/icons/AcademicInstitutions.svg";
import paymentIcon from "../../../assets/images/icons/payment.svg";
import manageCompanyIcon from "../../../assets/images/icons/managecompany.svg";
import jobRequestIcon from "../../../assets/images/icons/jobrequst.svg";
import jobManagementIcon from "../../../assets/images/icons/jobmanagment.svg";
import notificationIcon from "../../../assets/images/icons/notification-icon.svg";
import addDeleteGetLocalStorage from "../../../prototype/addDeleteGetLocalStorage";
import { STORAGE } from "../../../common/LocalVariable";
import jwtDecode from "jwt-decode";
import { getPermissionFromAll } from "../../../common/HelperFunctions";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [active_link, setActiveLink] = useState("");

  let accessToken = addDeleteGetLocalStorage(STORAGE?.USER_TOKEN, {}, "get");
  accessToken = jwtDecode(accessToken);

  let master = getPermissionFromAll("master", accessToken);
  let student = getPermissionFromAll("student", accessToken);
  // let AcademicRequests = getPermissionFromAll("Academic requests", accessToken);
  let ManageUnicompanies = getPermissionFromAll(
    "Manage unicompanies",
    accessToken
  );
  // let jobRequests = getPermissionFromAll("job requests", accessToken);
  let jobManagement = getPermissionFromAll("job management", accessToken);
  let SupportRequest = getPermissionFromAll("support request", accessToken);
  let CMS = getPermissionFromAll("cms", accessToken);
  let FAQ = getPermissionFromAll("faq", accessToken);
  let SubAdmin = getPermissionFromAll("subAdmin", accessToken);
  let Roles = getPermissionFromAll("roles", accessToken);
  // let Transactions = getPermissionFromAll("Transactions", accessToken);
  // let Payment = getPermissionFromAll("Payment", accessToken);
  // let Chat = getPermissionFromAll("Chat", accessToken);

  const handleNavigation = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  return (
    <>
      <div className="leftSidebar">
        <div className="sidebar__logo">
          <Link to="/">
            <img src={SidebarLogo} alt="logo" width="auto" />
          </Link>
        </div>
        <div className="leftSidebar__menu">
          <ul>
            {master.view ? (
              <li>
                <div
                  className={
                    active_link === "/master-table"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => handleNavigation("/master-table")}
                >
                  <img src={masterTableIcon} />
                  <span>Master Table</span>
                </div>
              </li>
            ) : null}
            {student.view ? (
              <li>
                <div
                  className={
                    active_link === "/student-listing"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => handleNavigation("/student-listing")}
                >
                  <img src={studentListIcon} />
                  <span>Student Listing</span>
                </div>
              </li>
            ) : null }
            <li>
              <div
                className={
                  active_link === "/academic-institutions"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/academic-institutions");
                }}
              >
                <img src={academicInstitutionsIcon} />
                <span>Academic Requests</span>
              </div>
            </li>
            {ManageUnicompanies.view ? (
              <li>
                <div
                  className={
                    active_link === "/manage-company"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/manage-company");
                  }}
                >
                  <img src={manageCompanyIcon} />
                  <span>Manage Unicompanies</span>
                </div>
              </li>
            ) : null}
            <li>
              <div
                className={
                  active_link === "/job-request"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/job-request");
                }}
              >
                <img src={jobRequestIcon} />
                <span>Job Request</span>
              </div>
            </li>
            {jobManagement.view ? (
              <li>
                <div
                  className={
                    active_link === "/job-management"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/job-management");
                  }}
                >
                  <img src={jobManagementIcon} />
                  <span>Job Management</span>
                </div>
              </li>
            ) : null}
            <li>
              <div
                className={
                  active_link === "/manage-unaffiliated"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/manage-unaffiliated");
                }}
              >
                <img src={manageUnaffiliatedIcon} />
                <span>Manage Uniaffiliates</span>
              </div>
            </li>

            {SupportRequest.view ? (
              <li>
                <div
                  className={
                    active_link === "/support-requestList"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/support-requestList");
                  }}
                >
                  <img src={supportRequestIcon} />
                  <span>Support Request</span>
                </div>
              </li>
            ) : null}
            <li>
              <div
                className={
                  active_link === "/payment"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/payment");
                }}
              >
                <img src={paymentIcon} />
                <span>Payment</span>
              </div>
            </li>
            {CMS.view ? (
              <li>
                <div
                  className={
                    active_link === "/cms"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/cms");
                  }}
                >
                  <img src={cmsIcon} />
                  <span>CMS</span>
                </div>
              </li>
            ) : null}

            <li>
              <div
                className={
                  active_link === "/notification"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/notification");
                }}
              >
                <img src={notificationIcon} />
                <span>Notification</span>
              </div>
            </li>
            {SubAdmin.view ? (
              <li>
                <div
                  className={
                    active_link === "/sub-admin"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/sub-admin");
                  }}
                >
                  <img src={subAdminIcon} />
                  <span>Sub Admin</span>
                </div>
              </li>
            ) : null}

            {Roles.view ? (
              <li>
                <div
                  className={
                    active_link === "/roles-permission"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/roles-permission");
                  }}
                >
                  <img src={rolesIcon} />
                  <span>Roles & Permissions</span>
                </div>
              </li>
            ) : null}

            {FAQ.view ? (
              <li>
                <div
                  className={
                    active_link === "/faqs"
                      ? "sidebar-a activeLink"
                      : "sidebar-a"
                  }
                  onClick={() => {
                    handleNavigation("/faqs");
                  }}
                >
                  <img src={faqIcon} />
                  <span>FAQ</span>
                </div>
              </li>
            ) : null }

            <li>
              <div
                className={
                  active_link === "/profile"
                    ? "sidebar-a activeLink"
                    : "sidebar-a"
                }
                onClick={() => {
                  handleNavigation("/profile");
                }}
              >
                <img src={profileIcon} />
                <span>Profile</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LeftSidebar;
