import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { Container, Card, Row, Col, Badge, } from 'react-bootstrap';
import JobCard from '../Components/JobCard';
import { getAllJob } from '../Services/allApi';
import { isAddJobContext } from '../Context/Context';


const Home = () => {
        const { AddJob, setAddJob } = useContext(isAddJobContext)
    
    const [JobDetail, setJobDetail] = useState([])

    useEffect(() => {
        getJobs()
    }, [AddJob])

    const getJobs = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("Authorization failed... Please log in.");
            return;
        }
        const reqHeaders = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await getAllJob(reqHeaders);
            console.log(result.data);

            if (result.status === 200) {
                setJobDetail(result.data);
            } else {
                console.error("Unexpected response status:", result.status);
                alert("Failed to fetch jobs.");
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            alert("Something went wrong while fetching jobs.");
        }
    };


    return (
        <>
            <div style={{ backgroundColor: '#0A3321', color: 'white', minHeight: "100vh" }}>
                {/* Navbar */}
                <Header />
                {/* Hero Section */}
                <Container className="py-5 text-center mt-2">
                    <h5 className="display-2 fw-bold mb-3">Build your very own job <br />portal with jobtale</h5>
                    {/* Job Categories */}
                    <div className="d-flex justify-content-center gap-3 pt-5">
                        <span className="text-white-50 me-2">Popular Jobs:</span>
                        <Badge pill bg="dark" className="px-3 py-2">Designer</Badge>
                        <Badge pill bg="success" className="px-3 py-2">Web Developer</Badge>
                        <Badge pill bg="dark" className="px-3 py-2">Software Engineer</Badge>
                        <Badge pill bg="success" className="px-3 py-2">Business</Badge>
                    </div>
                    {/* Trust Logos */}
                    <div className="pt-5 mt-5">
                        <p className="text-white-50 mb-4">Trusted By 1M+ Business</p>
                        {/* <marquee> */}
                        <Row className="justify-content-center align-items-center mt-5">
                            <Col xs={6} sm={4} md={2} className="mb-4 ">
                                <div className="text-white-50 "><img style={{ width: '60px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png" alt="" /></div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className="mb-4">
                                <div className="text-white-50"><img style={{ width: '60px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" alt="" /></div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className="mb-4">
                                <div className="text-white-50"><img style={{ width: '60px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" alt="" /></div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className="mb-4">
                                <div className="text-white-50"><img style={{ width: '60px' }} src="https://s32519.pcdn.co/es/wp-content/uploads/sites/3/2020/08/accenture-logo-672x284px.png" alt="" /></div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className="mb-4">
                                <div className="text-white-50"><img style={{ width: '60px' }} src="https://www.broadcom.com/media/blt4ac44e0e6c6d8341/blt5d143c6f438aa176/61705997923218529eece109/TCS-Logo-Colour-RGB.png?width=722" alt="" /></div>
                            </Col>
                            <Col xs={6} sm={4} md={2} className="mb-4">
                                <div className="text-white-50"><img style={{ width: '60px' }} src="https://i.pinimg.com/736x/4e/3f/9f/4e3f9fa38e241a7b15ea727240cb953d.jpg" alt="" /></div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            <div>
                <Container fluid className="py-4">
                    <Row>
                        <Col className="container" lg={9}>
                            <Row sm={12} md={4} lg={4}>
                                {JobDetail.length > 0 ? (
                                    JobDetail.map((job) => <JobCard key={job._id} item={job} />)
                                ) : (
                                    <div className="text-danger fw-bolder text-center mt-3">
                                        No jobs found for your search criteria.
                                    </div>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Home