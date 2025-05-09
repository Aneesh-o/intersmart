import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup, Button, Nav, Form, } from 'react-bootstrap';
import { Envelope, Telephone, GenderFemale, CalendarDate, GeoAlt, Building, Award, Calendar, Briefcase } from 'react-bootstrap-icons';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AddJob from '../Components/AddJob';
import JobCard from '../Components/JobCard';


const Profile = () => {
    const [ProfileDetails, setProfileDetails] = useState({})

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const userDetails = JSON.parse(storedUser);
                setProfileDetails(userDetails);
            } else {
                setProfileDetails({});
            }
        } catch (error) {
            console.error("Error parsing user data from sessionStorage:", error);
            setProfileDetails({});
        }
    }, []);



    return (
        <>
            <div style={{ backgroundColor: '#0A3321', color: 'white' }}>
                <Header />
            </div>
            <Container fluid className="bg-light p-3">
                <Card className="shadow-sm">
                    <Card.Body className="p-0">
                        {/* Profile header */}
                        <div className="d-flex p-3 align-items-center border-bottom">
                            <div className="d-flex align-items-center mb-1">
                                <h5 className="mb-0 mx-2">{ProfileDetails.username ? ProfileDetails.username : "Nill"}</h5>
                            </div>
                            <div className="ms-auto d-flex">
                                <Button variant="light" className="me-2 rounded-circle">
                                    <AddJob />
                                </Button>
                            </div>
                        </div>
                        <Row className="g-0">
                            <Col md={12} className="border-end">
                                {/* Navigation tabs */}
                                <Nav variant="tabs" defaultActiveKey="job-application" className="px-3 border-bottom">
                                    <Nav.Item>
                                        <Nav.Link eventKey="job-application" className="d-flex align-items-center py-2">
                                            <Briefcase size={18} className="me-2" />
                                            Posted Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {/* Hiring Process */}
                                <div className="p-3">
                                    {/* Jobs Applied */}
                                    <div className="mb-3">
                                        <JobCard insideProfile={true}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Profile

