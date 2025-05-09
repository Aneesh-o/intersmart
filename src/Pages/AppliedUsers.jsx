import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Header from "../Components/Header";
import { getEmployerPostedJobsWithApplicants } from "../Services/allApi";  // API function

const AppliedUsers = () => {
    const [postedJobs, setPostedJobs] = useState([]);

    useEffect(() => {
        fetchMyPostedJobsWithApplicants();
    }, []);

    const fetchMyPostedJobsWithApplicants = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeaders = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await getEmployerPostedJobsWithApplicants(reqHeaders);
            console.log(response);

            if (response.status === 200) {
                setPostedJobs(response.data);
            } else {
                console.error("Error fetching jobs:", response.data.error);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };



    return (
        <>
            <Header />
            <div style={{ backgroundColor: "#0A3321", color: "white", minHeight: "100vh", paddingTop: "50px" }} className="d-flex justify-content-center">
                <div className="text-center w-75">
                    <h4 className="mb-4 text-warning">Users Applied to Your Posted Jobs</h4>

                    {postedJobs && postedJobs.length > 0 ? (
                        postedJobs.map((job) => (
                            <div key={job._id} className="mb-5">
                                <h5>{job.company} - {job.title}</h5>
                                <p>
                                    <strong>Location:</strong> {job.location}
                                </p>
                                <p><strong>Total Applicants:</strong> {job.totalApplicants}</p>

                                {job.applicants && job.applicants.length > 0 ? (
                                    <Table striped bordered hover responsive variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Applicant Name</th>
                                                <th>Applicant Email</th>
                                                <th>Job Title</th>
                                                <th>Cover letter</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {job.applicants.map((applicant, index) => (
                                                <tr key={index}>
                                                    <td>{applicant.username}</td>
                                                    <td>{applicant.email}</td>
                                                    <td>{job.title}</td>
                                                    <td>{applicant.coverLetter}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p className="text-danger fw-bold">No applicants yet.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-danger fw-bold">You haven’t posted any jobs or no applicants yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AppliedUsers;
