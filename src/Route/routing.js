import React from "react";
import { Routes, Route } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.scss";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import { ToastContainer } from "react-toastify";
import Header from "../pages/layout/header/Header";
import Login from "../pages/auth/Login/Login";
import LeftSidebar from "../pages/layout/LeftSidebar/LeftSidebar";
import CreateSubAdmin from "../pages/CreateSubAdmin/CreateSubAdmin";
import SubAdminRoles from "../pages/SubAdmin/SubAdmin";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import ViewSubCategorySidebar from "../pages/CreateSubAdmin/ViewSubAdminSidebar";
import EditSubAdminSidebar from "../pages/CreateSubAdmin/EditSubAdminSidebar";
import RolesPermission from "../pages/RolesPermissions/RolesPermissionsList";
import CreateRolesPermission from "../pages/RolesPermissions/CreateRolesPermission";
import CmsList from "../pages/Cms/CmsList";
import EditCms from "../pages/Cms/EditCms";
// import TermsConditions from "../pages/Cms/TermsConditions";
import PrivacyPolicy from "../pages/Cms/PrivacyPolicy";
import Disclaimer from "../pages/Cms/Disclaimer";
import SupportRequestList from "../pages/SupportRequest/SupportRequestList";
import SupportRequestDetails from "../pages/SupportRequest/SupportRequestDetails";
import MasterTable from "../pages/MasterTable/MasterTable";
import ManageUnaffiliated from "../pages/ManageUnaffiliated/ManageUnaffiliated";
import AffiliatesDetails from "../pages/ManageUnaffiliated/AffiliatesDetails/AffiliatesDetails";
import Profile from "../pages/Profile/Profile";
import Faq from "../pages/FAQ/Faq";
import AddFaq from "../pages/FAQ/AddFaq";
import EditFaq from "../pages/FAQ/EditFaq";
import EditFaqCompany from "../pages/FAQ/EditFaqCompany";
import AddFaqCompany from "../pages/FAQ/AddFaqCompany";
import StudentListing from "../pages/StudentListing/StudentListing";
import ViewStrike from "../pages/StudentListing/ViewStrike";
import EditStudent from "../pages/StudentListing/EditStudent";
import ViewStudent from "../pages/StudentListing/ViewStudent";
import StrikeLogs from "../pages/StudentListing/StrikeLogs";
import JobRequestListing from "../pages/JobRequest/JobRequest";
import JobRequestCancelListing from "../pages/JobRequest/JobRequestCancel";
import JobEdit from "../pages/JobRequest/JobEdit";
import JobDetail from "../pages/JobRequest/JobRequestDetail/JobDetail";
import CreateJob from "../pages/CreateJob/CreateJob";
import AcademicInstitutions from "../pages/AcademicInstitutions/AcademicInstitutions";
import AcademicInstitutionsDetail from "../pages/AcademicInstitutions/AcademicInstitutionsDetail";
import AcademicInstitutionsEdit from "../pages/AcademicInstitutions/AcademicInstitutionsEdit";
import AcademicInstitutionsView from "../pages/AcademicInstitutions/AcademicInstitutionsView";
import CreateAcademicInstitution from "../pages/AcademicInstitutions/CreateAcademicInstitution";
import Payments from "../pages/Payments/Payments";
import ManageCompanyList from "../pages/ManageCompany/ManageCompanyList";
import CompanyViewStrike from "../pages/ManageCompany/CompanyViewStrike";
import CompanyStrikeLogs from "../pages/ManageCompany/CompanyStrikeLogs";
import CreateCompany from "../pages/ManageCompany/CreateCompany";
import EditCompany from "../pages/ManageCompany/EditCompany";
import CompanyDetail from "../pages/ManageCompany/CompanyDetail";
import EmployeesList from "../pages/ManageCompany/EmployeesList";
import TransactionHistory from "../pages/ManageCompany/TransactionHistory";
import JobManagementList from "../pages/JobManagement/JobManagementList";
import JobManagementDetail from "../pages/JobManagement/JobManagementDetail/JobManagementDetail";
import StudentProfile from "../pages/JobManagement/StudentProfile";
import AffiliatesEdit from "../pages/ManageUnaffiliated/AffiliatesEdit";
import AddAffiliate from "../pages/ManageUnaffiliated/AddAffiliate";
import Notification from "../pages/Notification/Notification";
import { AdminPrivateRoutes } from "../routeHandler/AdminPrivateRoutes"
const Routing = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password/:code" element={<ResetPassword />} />
        <Route path="/" element={<AdminPrivateRoutes />}>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<LeftSidebar />}>
              <Route exact path="/master-table" element={<MasterTable />} />
              <Route exact path="/sub-admin" element={<SubAdminRoles />} />
              <Route exact path="/view-sub-admin/:id" element={<ViewSubCategorySidebar />} />
              <Route exact path="/create-sub-admin" element={<CreateSubAdmin />} />
              <Route exact path="/edit-sub-admin/:id" element={<EditSubAdminSidebar />} />
                <Route
                  exact
                  path="/roles-permission"
                  element={<RolesPermission />}
                />
              <Route
                exact
                path="/create-roles-permission"
                element={<CreateRolesPermission />}
              />
              <Route
                exact
                path="/edit-roles-permission/:id"
                element={<CreateRolesPermission />}
              />
              <Route exact path="/faqs" element={<Faq />} />
              <Route exact path="/add-faqs" element={<AddFaq />} />
              <Route exact path="/edit-faqs" element={<EditFaq />} />
              <Route exact path="/edit-company-faqs" element={<EditFaqCompany />} />
              <Route exact path="/add-company-faqs" element={<AddFaqCompany />} />
              <Route exact path="/cms" element={<CmsList />} />
              <Route
                exact
                path="/cms/edit/:id"
                element={<EditCms />}
              />
              <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route exact path="/disclaimer" element={<Disclaimer />} />
              <Route
                exact
                path="/support-requestList"
                element={<SupportRequestList />}
              />
              <Route
                exact
                path="/support-request-details/:id"
                element={<SupportRequestDetails />}
              />
              <Route exact path="/manage-unaffiliated" element={<ManageUnaffiliated />} />
              <Route exact path="/affiliates-details" element={<AffiliatesDetails />} />
              <Route exact path="/affiliates-edit" element={<AffiliatesEdit />} />
              <Route exact path="/add-affiliates" element={<AddAffiliate />} />
              <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/student-listing" element={<StudentListing />} />
                <Route exact path="/view-student/:id" element={<ViewStudent />} />
                <Route exact path="/edit-student/:id" element={<EditStudent />} />              
                <Route exact path="/view-strike" element={<ViewStrike />} />
                <Route exact path="/strike-log/:id" element={<StrikeLogs />} />
                <Route exact path="/job-request" element={<JobRequestListing />} />
                <Route exact path="/job-cancel-request" element={<JobRequestCancelListing />} />
                <Route exact path="/job-management" element={<JobManagementList />} />
                <Route exact path="/job-detail/:id" element={<JobDetail />} />
              <Route exact path="/job-management-id" element={<JobManagementDetail />} />
                <Route exact path="/job-edit/:id" element={<JobEdit />} />
              
              <Route exact path="/create-job" element={<CreateJob />} />
                <Route exact path="/academic-institutions" element={<AcademicInstitutions />} />
                <Route exact path="/academic-institutions-details/:id" element={<AcademicInstitutionsDetail />} />
                <Route exact path="/academic-institutions-edit/:id" element={<AcademicInstitutionsEdit />} />
              <Route exact path="/academic-institutions-view" element={<AcademicInstitutionsView />} />
              <Route exact path="/create-academic-institutions" element={<CreateAcademicInstitution />} />
              <Route exact path="/payment" element={<Payments />} />
                <Route exact path="/manage-company" element={<ManageCompanyList />} />
                <Route exact path="/company-detail/:id" element={<CompanyDetail />} />
                <Route exact path="/edit-company/:id" element={<EditCompany />} />
                <Route exact path="/create-company" element={<CreateCompany />} />
                <Route exact path="/company-view-strike" element={<CompanyViewStrike />} />  
                <Route exact path="/company-strike-log/:id" element={<CompanyStrikeLogs />} />      
                <Route exact path="/employees-list/:id" element={<EmployeesList />} />
              <Route exact path="/transaction-history" element={<TransactionHistory />} />              
              <Route exact path="/student-profile" element={<StudentProfile />} />
              <Route exact path="/notification" element={<Notification />} />
            </Route>
          </Route>
        </Route>
        {/* </Route> */}

        {/*  */}
      </Routes>
    </>
  );
};

export default Routing;
