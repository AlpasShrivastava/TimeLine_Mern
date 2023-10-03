/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserIndex = () => {

    const navigate = useNavigate()

    const fields = {
        name: '',
        email: '',
        password: '',
    }

    const [data, setData] = useState(fields)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:4000/api/timeline/register',options)
        .then((res)=>res.json())
        .then((data)=>{
            if (data?.status == 'success' && data?.message == 'Registration Successful!') {
                localStorage.setItem('userDetail', JSON.stringify(data?.user))
                navigate('/admin/home')
            }
        })
    }

    useEffect(()=>{
        const userExist = localStorage.getItem('userDetail')
        if (userExist) {
            navigate('/admin/home')
        }
    },[])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6" style={{ height: '100vh', display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'center' }}>
                        <div>
                            <center>
                                <h3 className='text-info'>Register Here!</h3>
                            </center>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    name='name' 
                                    value={data?.name}
                                    className='form-control form-control-sm mb-3 w-100' 
                                    placeholder='Enter your Name'
                                    onChange={handleInput}
                                />
                                <input 
                                    type="text" 
                                    name='email' 
                                    value={data?.email}
                                    className='form-control form-control-sm mb-3' 
                                    placeholder='Enter your Email'
                                    onChange={handleInput}
                                />
                                <input 
                                    type="text" 
                                    name='password' 
                                    value={data?.password}
                                    className='form-control form-control-sm mb-3' 
                                    placeholder='Enter your Password'
                                    onChange={handleInput}
                                />
                                <button type='submit' className='btn btn-info btn-sm w-100'>Register</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default UserIndex