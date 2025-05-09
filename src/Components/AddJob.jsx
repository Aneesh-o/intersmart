import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoAddCircle } from 'react-icons/io5';
import { AddUserJobs, editUserJobs } from '../Services/allApi';
import { isAddJobContext } from '../Context/Context';

const AddJob = ({ userJobDetail }) => {
    const { addUserJob, setAddUserJobs } = useContext(isAddJobContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [insideEdit, setInsideEdit] = useState(false)
    const [token, setToken] = useState("")

    const [addJobDetails, setAddJobDetails] = useState({
        title: "", description: "", company: "", location: "", salary: ""
    });

    const [editJobDetails, setEditJobDetails] = useState({
        title: "", description: "", company: "", location: "", salary: ""
    });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setToken(token)
    }, [])

    const handleUploadJob = async () => {
        const { title, description, company, location, salary } = addJobDetails;
        if (title && description && company && location && salary) {
            const token = sessionStorage.getItem("token");
            try {
                const reqHeaders = {
                    Authorization: `Bearer ${token}`
                };
                const result = await AddUserJobs(addJobDetails, reqHeaders);
                console.log("API Response:", result);
                if (result.status === 201) {
                    alert("Job added successfully!");
                    setAddUserJobs(result)
                    setAddJobDetails({
                        title: "", description: "", company: "", location: "", salary: ""
                    });
                    handleClose();
                } else {
                    alert("Error adding job.");
                }
            } catch (error) {
                console.error("Error uploading job:", error);
                alert("Something went wrong!");
            }

        } else {
            alert("Please fill all fields.");
        }
    };


    useEffect(() => {
        if (userJobDetail) {
            setInsideEdit(true);
            setEditJobDetails({
                title: userJobDetail.title || "",
                description: userJobDetail.description || "",
                company: userJobDetail.company || "",
                location: userJobDetail.location || "",
                salary: userJobDetail.salary || ""
            });
        }
    }, [userJobDetail]);



    const handleUpdateJob = async () => {
        const { title, description, company, location, salary } = editJobDetails;

        if (title && description && company && location && salary) {
            const token = sessionStorage.getItem("token");

            if (!token) {
                alert("Authentication missing. Please log in.");
                return;
            }

            const reqHeaders = {
                Authorization: `Bearer ${token}`
            };

            try {
                const result = await editUserJobs(userJobDetail._id, editJobDetails, reqHeaders);
                console.log("API Response:", result);

                if (result.status === 200 || result.status === 201) {
                    alert("Job updated successfully!");
                    setAddUserJobs(result)
                    setEditJobDetails({
                        title: "", description: "", company: "", location: "", salary: ""
                    });
                    handleClose();
                } else {
                    alert("Failed to update job.");
                }
            } catch (error) {
                console.error("Error updating job:", error);
                alert("Something went wrong while updating the job.");
            }
        } else {
            alert("Please fill all fields.");
        }
    };



    return (
        <>
            {!insideEdit ? (
                <>
                    <IoAddCircle onClick={handleShow} />
                    <Modal centered size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Job Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="align-items-center">
                                <div>
                                    {Object.keys(addJobDetails).map((key) => (
                                        <div className="mb-2" key={key}>
                                            <input
                                                value={addJobDetails[key]}
                                                onChange={(e) =>
                                                    setAddJobDetails((prev) => ({ ...prev, [key]: e.target.value }))
                                                }
                                                type="text"
                                                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                                                className="form-control"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUploadJob} variant="primary">Add</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <span onClick={handleShow}>Edit</span>
                    <Modal centered size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Job Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="align-items-center">
                                <div>
                                    {Object.keys(editJobDetails).map((key) => (
                                        <div className="mb-2" key={key}>
                                            <input
                                                value={editJobDetails[key]}
                                                onChange={(e) =>
                                                    setEditJobDetails((prev) => ({ ...prev, [key]: e.target.value }))
                                                }
                                                type="text"
                                                placeholder=""
                                                className="form-control"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdateJob} variant="primary">Update</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )

            }
        </>
    );
};

export default AddJob;
