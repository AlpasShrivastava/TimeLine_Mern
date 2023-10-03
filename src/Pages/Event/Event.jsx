/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {

  const statusFields = {
    status: '',
    event: ''
  }

  const [data,setData]= useState([])
  const [statusData, setStatusData] = useState(statusFields);
  // const [status, setStatus] = useState();
  // const [eventId, setEventId] = useState();
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [existingFile, setExistingFile] = useState();
  const [isShowResponse, setIsShowResponse] = useState(false);
  const [responseStatus, setResponseStatus] = useState();
  const [responseMessage, setResponseMessage] = useState();

  const eventStatus = [
    {
      status: 'Pending',
      event: 1
    },
    {
      status: 'In Progress',
      event: 1
    },
    {
      status: 'Pending',
      event: 3
    },
    {
      status: 'Failed',
      event: 1
    },
  ]

  const handleEdit = (id) => {
    setUserId(id)
    fetch(`http://localhost:4000/api/timeline/event/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
      setTitle(data?.data?.title)
      setDescription(data?.data?.description)
      setExistingFile(data?.data?.file)
    })
  }

  const handleStatusModal = (id) => {
    // setEventId(id)
    setStatusData({
      ...statusData,
      event: id
    })
    fetch(`http://localhost:4000/api/timeline/event/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
      setTitle(data?.data?.title)
      setDescription(data?.data?.description)
      setExistingFile(data?.data?.file)
    })
  }

  const handleStatusChange = (e) => {
    e.preventDefault()
    // console.log(statusData);

    const option = {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      // body: formData,
      body: JSON.stringify(statusData),
    };

    fetch(`http://localhost:4000/api/timeline/eventStatus`, option)
      .then((res) => res.json())
      .then((data) => {
        if (
          data?.status == "success" &&
          data?.message == "Event Status Updated Successfully!"
        ) {
          fetchEvents()
          setResponseStatus(data?.status)
          setResponseMessage(data?.message)
          setIsShowResponse(true)
        }
      });
  }
 
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/timeline/delete-event/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
      fetchEvents()
    })
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    const option = {
      method: "POST",
      body: formData,
    };

    fetch(`http://localhost:4000/api/timeline/event/${userId}`, option)
      .then((res) => res.json())
      .then((data) => {
        if (
          data?.status == "success" &&
          data?.message == "Event Updated Successfully!"
        ) {
          fetchEvents()
          setResponseStatus(data?.status)
          setResponseMessage(data?.message)
          setIsShowResponse(true)
        }
      });
  }

  const fetchEvents = () => {
    fetch('http://localhost:4000/api/timeline/event')
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
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between">
                <div>&nbsp;</div>  
                <Link to='/admin/add-event' style={{ float: 'right' }} className="btn btn-light mb-3">+ Add New</Link>
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <th>#</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>ACTION</th>
              </thead>
              <tbody>
                {
                  Array.isArray(data) && data?.map((val,key)=>(
                    <tr key={key}>
                      <td>{key+1}.</td>
                      <td>{val?.title}</td>
                      <td>{val?.description}</td>
                      <td>
                        <img src={`/backend/${val?.file}`} style={{ height: '150px' }} alt={val?.file} />
                      </td>
                      <td className="d-flex gap-2">
                        <button type="button" className='btn btn-warning btn-sm' onClick={()=>handleEdit(val?._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button type="button" className='btn btn-info btn-sm' onClick={()=>handleStatusModal(val?._id)} data-bs-toggle="modal" data-bs-target="#exampleModal2">Change Status</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDelete(val?._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              <tfoot>
                <th>#</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>ACTION</th>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>

      {/* edit modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                isShowResponse && <p className={`text-${responseStatus == 'success' ? 'success' : 'danger'}`}>{responseMessage}</p>
              }
              <div className="mb-3">
                <input 
                  type="text"
                  name="title" 
                  className="form-control form-control-sm" 
                  value={title} 
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="text"
                  name="description" 
                  className="form-control form-control-sm" 
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="file"
                  name="file" 
                  className="form-control form-control-sm"
                  onChange={(e)=>setFile(e.target.files[0])} 
                />
              </div>
              <img src={`/backend/${existingFile}`} style={{ height: '150px' }} alt="" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </div>
      </div>

      {/* status modal */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Event</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                isShowResponse && <p className={`text-${responseStatus == 'success' ? 'success' : 'danger'}`}>{responseMessage}</p>
              }
              <div className="mb-3">
                <select 
                  name="status" 
                  id="status"
                  value={statusData?.status}
                  className="form-select"
                  onChange={
                    (e)=>setStatusData({
                      ...statusData,
                      status: e.target.value
                    })
                  }
                >
                  <option value="">---- Change Status ----</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleStatusChange}>Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
