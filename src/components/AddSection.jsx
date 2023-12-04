import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

const AddSection = () => {
    const [formData, setFormData] = useState({})
    const handleInput = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        axios.post(`${BACKEND_URL}/section`, formData).then((response) => {
            if(response.status === 200){
                console.log(response.data)
                toast.success(response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else{
                toast.error(response.data.error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }).catch((error) => {
            console.log(error)
            if (error.message === 'Network Error') {
                toast.error("Oops! Something went wrong. !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else {
                toast.error(error.response.data.error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        })
    }
    return (
        <div className='flex flex-col gap-3 p-2 mt-10 bg-[#383838] rounded-md'>
            <h3>Add Section</h3>
            <input className='p-2 rounded outline-none bg-gray-400 placeholder:text-white' type="text" placeholder='Name' name='name' onChange={(e) => handleInput(e)} />
            <button onClick={(e) => handleSubmit(e)} className='p-2 px-4 text-white bg-teal-400 rounded'>Submit</button>
        </div>
    )
}

export default AddSection
