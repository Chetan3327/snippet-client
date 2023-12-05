import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useParams, useLocation} from 'react-router-dom'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const CodePen = () => {
    const location = useLocation()
    const {snippetId} = useParams()
    const [sections, setSections] = useState(null)
    const [formData, setFormData] = useState(location.state || {})
    const handleInput = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleEditorChange = (value) => {
        setFormData({...formData, 'codeString': value})
    }
    useEffect(() => {
        axios.get(`${BACKEND_URL}/section/`).then((response) => {
          setSections(response.data)
          console.log(response.data)
        })
    }, [])    
    const handleSubmit = (e, action) => {
        e.preventDefault()
        if (!formData || !formData.title || !formData.codeString || !formData.language || !formData.sectionId) {
            toast.error("Required fields Missing!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: 'colored'
            });
            return;
        }
        let requestMethod = axios.post;
        if(action === 'delete'){
            requestMethod = axios.delete
        }else if(snippetId){
            requestMethod = axios.put
        }else{
            requestMethod = axios.post
        }
        console.log(formData)
        requestMethod(`${BACKEND_URL}/snippet/${snippetId || ''}`, formData ).then((response) => {
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
        <div className='flex bg-[#2c2c2c]'>
            <div className='w-[85%]'>
                <Editor height='100vh' width='85vw' defaultLanguage="cpp" defaultValue={formData.codeString} theme='vs-dark' name="codeString" onChange={handleEditorChange}/>
            </div>
            <div className='w-[15%] flex flex-col gap-3 items-center justify-center bg-[#2c2c2c] mx-5'>
                <input className='p-2 outline-none w-full rounded bg-gray-200' name='title' type="text" placeholder='Title' value={formData.title} onChange={(e) => handleInput(e)} />
                <select name="language" className='p-2 w-full rounded bg-gray-200' value={formData.language} onChange={(e) => handleInput(e)}>
                    <option value="">Select Language</option>
                    <option value="javascript">javascript</option>
                    <option value="cpp">c++</option>
                    <option value="python">python</option>
                </select>
                {sections && <select name="sectionId" className='p-2 w-full rounded bg-gray-200' value={formData.sectionId} onChange={(e) => handleInput(e)}>
                    <option value="">Select Section</option>
                    {sections.map((section, idx) => {
                        return <option key={idx} value={section._id}>{section.name}</option>
                    })}
                </select>}
                <button onClick={(e) => handleSubmit(e)} className='p-2 px-4 w-full text-white bg-teal-400 rounded'>Submit</button>
                <button onClick={(e) => handleSubmit(e, 'delete')} className='p-2 px-4 w-full text-white bg-red-600 rounded'>Delete</button>
            </div>
        </div>
    )
}

export default CodePen
