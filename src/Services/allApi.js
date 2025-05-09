import commonApi from "./commonApi"
import serverUrl from "./serverUrl"


// seeker-registration
export const userRegisterApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/register`, reqBody)
}

// seeker-login
export const userLoginApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/login`, reqBody)
}

// get-allJob to all jobs page
export const getAllJob = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/get-jobs`, {}, reqHeader)
}

// get-allJob to all jobs page
export const getUserJob = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/get-userJobs`, {}, reqHeader)
}

// Delete
export const deleteUserJobs = async (id, reqHeaders) => {
    return await commonApi("DELETE", `${serverUrl}/deleteUserJobs/${id}`, {}, reqHeaders);
};

// Update
export const AddUserJobs = async (reqBody, reqHeaders) => {
    return await commonApi("POST", `${serverUrl}/add-job`, reqBody, reqHeaders);
};

// Update
export const editUserJobs = async (id,reqBody, reqHeaders) => {
    return await commonApi("PUT", `${serverUrl}/editUserJobs/${id}`, reqBody, reqHeaders);
};


// Update
export const userApplyingJob = async (id,reqBody, reqHeaders) => {
    return await commonApi("POST", `${serverUrl}/apply/${id}`, reqBody, reqHeaders);
};

// Update
export const getEmployerPostedJobsWithApplicants = async (reqHeaders) => {
    return await commonApi("GET", `${serverUrl}/jobs/my-posted-jobs`, {}, reqHeaders);
};










// // employer-registration
// export const employerRegisterApi = async (reqBody) => {
//     return await commonApi("POST", `${serverUrl}/employer-register`, reqBody)
// }

// // employer-login
// export const employerLoginApi = async (reqBody) => {
//     return await commonApi("POST", `${serverUrl}/employer-login`, reqBody)
// }

// // employer-dataUpdate
// export const employerUpdateProfileApi = async (reqBody, reqHeaders) => {
//     return await commonApi("PUT", `${serverUrl}/employer-profile`, reqBody, reqHeaders)
// }

// // seekerProfileDetails
// export const employerAcDetails = async (reqHeaders) => {
//     return await commonApi("GET", `${serverUrl}/employer-profileDetails`, {}, reqHeaders)
// }