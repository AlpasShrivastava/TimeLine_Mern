/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Home.css"

const Home = () => {

    const [data,setData] = useState([])

    const fetchEvents = () => {
        fetch('http://localhost:4000/api/timeline/fetchEventStatus')
        .then((res)=>res.json())
        .then((data)=>{
          setData(data?.data)
        })
    }

    useEffect(()=>{
        fetchEvents()
    },[])

    return (
        <>
        <div className="container">
            <div className="timeline">

                {
                    Array.isArray(data) && data?.slice()?.reverse()?.map((val,key)=>(
                        <div key={key} className="timeline-row">
                            <div className="timeline-time">
                                {val?.createdAt?.replace('T', ' ')?.slice(0, -5)}
                            </div>
                            <div className="timeline-content">
                                <i className="icon-attachment"></i>
                                <h4>{val?.eventDetails?.title}</h4>
                                <p>{val?.eventDetails?.description}</p>
                                <div className="thumbs">
                                    <img className="img-fluid rounded" src={`/backend/${val?.eventDetails?.file}`} alt="Maxwell Admin" />
                                </div>
                                <div className="">
                                    <span className="badge badge-pill">{val?.status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }

                {/* <div className="timeline-row">
                    <div className="timeline-time">
                        8:00 AM<small>Dec 18</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-code"></i>
                        <h4>Alpas Dashboard!</h4>
                        <p>
                            Maxwell Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar.
                        </p>
                        <div className="thumbs">
                            <div className="thumbs">
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Maxwell Admin" />
                        </div>
                        </div>
                        <div className="">
                            <span className="badge badge-pill">Graphs</span>
                            <span className="badge badge-pill">Chat</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-time">
                        7:25 PM<small>Dec 6</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-turned_in_not"></i>
                        <h4>Best Admin Template!</h4>
                        <p>Custom C3 graphs, Custom flot graphs, flot graphs, small graphs, Sass, profile and timeline.</p>
                        <div>
                            <span className="badge badge-pill">Invoice</span>
                            <span className="badge badge-pill">Tasks</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-time">
                        3:55 PM<small>Dec 26</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-directions"></i>
                        <h4>Maxwell Admin</h4>
                        <p>Maxwell Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag &amp; drop and ion slider.</p>
                        <div>
                            <span className="badge badge-pill">Profile</span>
                            <span className="badge badge-pill">Sales</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-time">
                        5:24 PM<small>Dec 12</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-change_history"></i>
                        <h4>Maxwell Dashboard</h4>
                        <p className="no-margin">Maxwell Admin dashboard includes invoice, profile, tasks, gallery, projects, maintanence.</p>
                        <div className="thumbs">
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Maxwell Admin" />
                        </div>
                        <div>
                            <span className="badge badge-pill">Analytics</span>
                            <span className="badge badge-pill">Contacts</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-time">
                        8:00 AM<small>Dec 18</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-code"></i>
                        <h4>Admin Dashboard!</h4>
                        <p>
                            Maxwell Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar.
                        </p>
                        <div className="thumbs">
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Maxwell Admin" />
                        </div>
                        <div className="">
                            <span className="badge badge-pill">Ecommerce</span>
                            <span className="badge badge-pill">CRM</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-time">
                        7:45PM<small>Dec 21</small>
                    </div>
                    <div className="timeline-content">
                        <i className="icon-attachment"></i>
                        <h4>Admin Template!</h4>
                        <p>Maxwell Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag &amp; drop and ion slider.</p>
                        <div className="thumbs">
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Maxwell Admin" />
                            <img className="img-fluid rounded" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Maxwell Admin" />
                        </div>
                        <div className="">
                            <span className="badge badge-pill">Orders</span>
                            <span className="badge badge-pill">Sales</span>
                        </div>
                    </div>
                </div>

                <div className="timeline-row">
                    <div className="timeline-content">
                        <p className="m-0">Loading...</p>
                    </div>
                </div> */}

            </div>
        </div>
        </>
    )
}

export default Home