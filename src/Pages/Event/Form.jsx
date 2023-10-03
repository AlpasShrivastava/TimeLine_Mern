/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventForm = () => {

    const navigate = useNavigate()

  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    const user_detail = localStorage.getItem("userDetail");
    const userObjectData = JSON.parse(user_detail);
    setUser(userObjectData?.email);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", user);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    const option = {
      method: "POST",
      body: formData,
    };

    fetch("http://localhost:4000/api/timeline/event", option)
      .then((res) => res.json())
      .then((data) => {
        if (
          data?.status == "success" &&
          data?.message == "Event Saved Successfully!"
        ) {
          navigate('/admin/event')
        }
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={title}
                placeholder="title"
                className="form-control form-control-sm"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="description"
                value={description}
                placeholder="Description"
                className="form-control form-control-sm"
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-sm w-100">Save</button>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default EventForm;
