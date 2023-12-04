import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddSection from './AddSection'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const SideBar = () => {
  const navigate = useNavigate()
  const [sections, setSections] = useState(null)
  useEffect(() => {
    axios.get(`${BACKEND_URL}/section`).then((response) => {
      // console.log(response.data)
      setSections(response.data)
    })
  }, [])
  
  return (
    <div className='absolute left-0 bg-[#2c2c2c] p-3 min-h-screen text-[#f8f8f8]'>
      {sections && 
      <div className='flex flex-col gap-3 mt-20'>
        <span onClick={() => navigate('/snippet')} className='rounded-md cursor-pointer hover:bg-[#383838] p-2'>CREATE SNIPPET</span>
        {sections.map((section, idx) => {
          return <span onClick={() => navigate(`/${section._id}`)} key={idx} className='rounded-md cursor-pointer hover:bg-[#383838] p-2'>{section.name}</span>
        })}
      </div>}
      <AddSection />
    </div>
  )
}

export default SideBar
