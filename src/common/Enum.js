/**
 * this file contains all the api routes
 */

export const API_ROUTES = {
  LOGIN: "admin/auth/login",
  LOGOUT: "admin/auth/logout",
  FORGOTPASSWORD: "admin/auth/forgot-password",
  RESETPASSWORD: "admin/auth/reset-password",

  //Mastert table
  GETALLCOUNTMASTERTABLE: "admin/faculty/get-all-count",

  GETFACULTYDATA: "admin/faculty/all",
  ADDFACULTYDATA: "admin/faculty/add",
  EDITFACULTYDATA: "admin/faculty/edit",
  DELETEFACULTYDATA: "admin/faculty/delete",
  CHANGESTATUSFACULTYDATA: "admin/faculty/change-status",

  GETAREAOFSTUDYDATA: "admin/area-of-study/all",
  ADDAREAOFSTUDYDATA: "admin/area-of-study/add",
  EDITAREAOFSTUDYDATA: "admin/area-of-study/edit",
  DELETEAREAOFSTUDYDATA: "admin/area-of-study/delete",
  CHANGESTATUSAREAOFSTUDYDATA: "admin/area-of-study/change-status",

  GETDEGREEDATA: "admin/degree/all",
  ADDDEGREEDATA: "admin/degree/add",
  EDITDEGREEDATA: "admin/degree/edit",
  DELETEDEGREEDATA: "admin/degree/delete",
  CHANGESTATUSDEGREEDATA: "admin/degree/change-status",

  GETLOCATIONDATA: "admin/location/all",
  CHANGESTATUSLOCATIONDATA: "admin/location/change-status",
  
  GETAREAOFWORKEXPERIENCEDATA: "admin/area-of-working-experience/all",
  ADDAREAOFWORKEXPERIENCEDATA: "admin/area-of-working-experience/add",
  EDITAREAOFWORKEXPERIENCEDATA: "admin/area-of-working-experience/edit",
  CHANGESTATUSAREAOFWORKEXPERIENCEDATA: "admin/area-of-working-experience/change-status",
  DELETEAREAOFWORKEXPERIENCEDATA: "admin/area-of-working-experience/delete",

  GETLANGUAGEDATA: "admin/language/all",
  ADDLANGUAGEDATA: "admin/language/add",
  EDITLANGUAGEDATA: "admin/language/edit",
  CHANGEOFSTATUSLANGUAGEDATA: "admin/language/change-status",
  DELETELANGUAGEDATA: "admin/language/delete",

  GETCMSDATA: "admin/cms/all",
  GETSPECIFICCMSDATA: "admin/cms/specific",
  EDITCMSDATA: "admin/cms/edit",
  CHANGEOFSTATUSCMSDATA: "admin/cms/change-status",

  GETHELPANDSUPPORTDATA: "admin/help-and-support/all",
  GETSPECIFICHELPANDSUPPORTDATA: "admin/help-and-support/specific",
  CHANGEOFSTATUSHELPANDSUPPORTDATA: "admin/help-and-support/change-status",

  GETSTUDENTDATA: "admin/student/all",
  EDITSTUDENTDATA: "admin/student/edit",
  CHANGEOFSTATUSSTUDENTDATA: "admin/student/change-status",
  GETALLSTUDENTFILTERDATA: "admin/student/get-all-filter-data",
  DELETESTUDENTDATA: "admin/student/delete",
  GETSPECIFICSTUDENT: "admin/student/specific",
  ACCOUNTVERIFICVATION: "admin/student/account-verification",

  GETCOMPANYDATA: "admin/company/all",
  CHANGEOFSTATUSCOMPANYDATA: "admin/company/change-status",
  GETSPECIFICCOMPANY: "admin/company/specific",
  CHANGEOFSTATUSOFCOMPONY: "admin/company/change-status-attribute",
  DELETECOMPANYDATA: "admin/company/delete",
  ADDCOMPANYREQUESTDATA: "admin/company/create",
  EDITCOMPANYREQUESTDATA: "admin/company/edit",
  GETCOMPANYDATAFORLIST: "admin/company/all-for-list",
  GETEMPLOYEEDATAOFCOMPANY:"admin/company/all-employee-for-list",
  GETAREAOFWORKDATAOFCOMPANY:"common/get-area-of-work-exp-list",
  GETWORKGINLOCATIONFORCOMPANY:"common/get-location-list",

  GET_AREA_OF_WORK:"common/get-area-of-work-exp-list",
  GET_LOCATION_LIST:"common/get-location-list",

  GETCOMPANYREQUESTDATA: "admin/company/all-request",
  UPDATESTATUSOFCOMPANYDATA:(id)=> `admin/company/update-status/${id}`,

  COMPANYVERIFYTAXID: "auth/company-verify-tax-id",

  GOOGLE_ADDRESS_SUGGESTIONS: (search) => `common/address-suggestions?input=${search}`,
  GET_LAT_LNG: (search) => `common/get-lat-lang?address=${search}`,
  GET_FULL_ADDRESS_USING_LAT_LNG: (lat, lng) => `common/get-full-address?lat=${lat}&lng=${lng}`,
  
  //Jobs Routes
  CREATE_JOB:"admin/jobs/create",
  EDIT_JOB:"admin/jobs/edit",
  // POST_JOB:"company/job-post",
  GETALLJOBS:"admin/jobs/all",
  GETSPECIFICJOB:"admin/jobs/specific",
  UPDATEJOBSTATUS:"admin/jobs/update-status",
  DELETEJOB:"admin/jobs/delete",
  GETALLAPPLICATION:"admin/jobs/all-application",
  GETALLSHIFTS:"admin/jobs/all-shift",
  GETCANCLLEDJOBREQUEST:"admin/jobs/all-cancellation-request",
  UPDATECANCELLEDREQESTJOBSTATUS:"admin/jobs/update-cancelled-job-status",
  GETALLHIREDAPPLICATION:"admin/jobs/all-hired-request",

  //Employee
  GETALLEMPLOYEE: "admin/employee/all",

  //Roles
  GETALLROLES: "admin/roles/all",
  GETSPECIFICROLE: "admin/roles/specific",
  CHANGEOFSTATUSROLEDATA: "admin/roles/change-status",
  CREATEROLE: "admin/roles/create",
  EDITROLE: "admin/roles/edit",
  DELETEROLE: "admin/roles/delete",

  //Subadmin
  GETALLSUBADMIN: "admin/subadmin/all",
  GETSPECIFICSUBADMIN: "admin/subadmin/specific",
  CHANGEOFSTATUSSUBADMINDATA: "admin/subadmin/change-status",
  CREATESUBADMIN: "admin/subadmin/create",
  EDITSUBADMIN: "admin/subadmin/edit",
  DELETESUBADMIN: "admin/subadmin/delete",
  RESENTINVITATIONSUBADMIN: "admin/subadmin/resent-invitation",

  //strike
  GETALLSTUDENTSTRIKE: "admin/strike/all",
  GETALLSTUDENTSTRIKESTUDENT: "admin/strike/all-student",
  CHANGEOFSTATUSSTRIKEDATA: "admin/strike/change-status",

  GETALLCOMPANYSTRIKE: (id) => `admin/strike/company/all/${id}`,
  GETALLSTUDENTSTRIKELOGS: (id) => `admin/strike/student/all/${id}`,
  

  GET_TEAM_LIST_FOR_DROPDOWN: (id) => `admin/jobs/teams/${id}`,

  //profile
  PROFILEUPDATE: "admin/auth/update-profile",
  CHANGEPASSWORD: "admin/auth/password-change",
};
