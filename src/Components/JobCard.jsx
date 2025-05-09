import React, { useContext, useEffect, useState } from 'react'
import { Button, Row, Col, Badge, Card } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { Dropdown } from "react-bootstrap";
import { toast } from 'react-toastify';
import AddJob from './AddJob';
import { deleteUserJobs, getAllJob, getUserJob, userApplyingJob } from '../Services/allApi';
import { isAddJobContext } from '../Context/Context';

const JobCard = ({ insideProfile, item }) => {
    const { addUserJob, setAddUserJobs} = useContext(isAddJobContext)

    const [userJobDetail, setUserJobDetail] = useState([])
    const [coverLetter, setCoverLetter] = useState("")

    useEffect(() => {
        getUserJobs()
    }, [addUserJob])

    const getUserJobs = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeaders = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getUserJob(reqHeaders)
                if (result.status == 200) {
                    setUserJobDetail(result.data)
                } else if (result.status == 500) {
                    alert(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Authentication Missing...Please login")
        }
    }

    const handleDeletejob = async (id) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeaders = {
                Authorization: `Bearer ${token}`
            };
            try {
                const result = await deleteUserJobs(id, reqHeaders)
                if (result.status == 200) {
                    alert("Job deleted successfully")
                    getUserJobs()
                } else if (result.status == 404) {
                    alert(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Unauthorized...please login")
        }
    }

    const handleApplyingJob = async (jobId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            if (!coverLetter || coverLetter.trim() === "") {
                alert("Cover letter is required to apply.");
                return;
            }
    
            const reqHeaders = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            };
    
            try {
                const result = await userApplyingJob(jobId, { coverLetter }, reqHeaders);    
                if (result.status === 200) {
                    alert("Applied successfully! You will get a response from the company.");
                    setCoverLetter("")
                } else if (result.status === 400) {
                    toast.warning("You have already applied for this job.");
                }
            } catch (err) {
                console.error("Error applying for job:", err);
                toast.error("Something went wrong. Try again later.");
            }
        } else {
            alert("You must be logged in to apply for jobs.");
        }
    };
    

    
    return (
        <>
            {
                !insideProfile ?
                    <div className='px-3 py-2'>
                        {
                            <Card className="h-100 shadow-sm border">
                                {/* key={item._id} */}
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-1">
                                        <small className="text-muted">{item.location}</small>
                                    </div>
                                    <h5 className="card-title mb-2">{item.title}</h5>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="ms-2">{item.company}</span>
                                    </div>
                                    <div className="d-flex flex-wrap mb-2">
                                        <small className="text-muted"><i class="fa-regular fa-clock me-2"></i> {item.salary}</small>
                                    </div>
                                    <div className="d-flex flex-wrap mb-2">
                                        <small className="text-muted"><i class="fa-regular fa-clock me-2"></i>{item.description}</small>
                                    </div>
                                    <div><input type="text " placeholder='something to Employer...' className='form-control' value={coverLetter} onChange={e => setCoverLetter(e.target.value)} /><Button onClick={() => handleApplyingJob(item._id)} size="sm" className='px-3 bg-dark mx-2 mt-1' > Apply Now</Button></div>
                                </Card.Body>
                            </Card>
                        }
                    </div>
                    :
                    <Row className="g-4">
                        {
                            userJobDetail?.length > 0 ?
                                userJobDetail.map(item => (
                                    <Col sm={12} md={4} >
                                        <Card key={item._id} className="h-100 shadow-sm border">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-1">
                                                    {/* <small className="text-muted">{item.jobLocation}</small> */}
                                                    <small className="text-muted">{item.location}</small>

                                                    <Dropdown align="end">
                                                        <Dropdown.Toggle
                                                            variant="light"
                                                            className="rounded-circle border-0 p-1"
                                                            bsPrefix="custom-dropdown-toggle"
                                                        >
                                                            <ThreeDots />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item ><AddJob insideEdit={true} userJobDetail={item} /></Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleDeletejob(item._id)}>Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <h5 className="card-title mb-2">{item.title}</h5>
                                                <div className="d-flex align-items-center mb-3">
                                                    <span className="ms-2">{item.company}</span>
                                                </div>


                                                <div className="d-flex flex-wrap mb-2">
                                                    <small className="text-muted"><i class="fa-regular fa-clock me-2"></i> {item.salary}</small>
                                                </div>
                                                <div className="d-flex flex-wrap mb-2">
                                                    <small className="text-muted"><i class="fa-regular fa-clock me-2"></i> {item.description}</small>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                :
                                <div className='text-danger fw-bolder text-align-center'>There is no jobs Posted yet</div>
                        }
                    </Row>
            }
        </>
    )
}

export default JobCard