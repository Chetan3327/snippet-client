import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Code from '../components/Code'
import { MdEdit } from "react-icons/md";
import {useNavigate, useParams} from 'react-router-dom'
import SideBar from '../components/SideBar'
import LoadingBar from 'react-top-loading-bar';
import useAutoIncrementProgress from '../Hooks/useAutoIncrementProgress'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const Home = () => {
  const progress = useAutoIncrementProgress();
  const {sectionId} = useParams()
  const navigate = useNavigate()
  const [snippets, setSnippets] = useState(null)
  useEffect(() => {
    if(sectionId){
      axios.get(`${BACKEND_URL}/section/${sectionId}`).then((response) => {
        console.log(response.data)
        setSnippets(response.data.snippets)
      })
    }
  }, [sectionId])
  return (
    <div className='min-h-screen flex justify-center bg-[#191919]'>
      <SideBar />
      <div className='flex flex-col gap-4 mt-32'>
        {snippets && 
          <>
            {snippets.map((snippet, idx) => {
              return (
                <div className='relative' key={idx}>
                  <button onClick={() => navigate(`/snippet/${snippet._id}`, {state: snippet})} className='absolute bottom-0 right-0 p-1 bg-blue-600 text-white hover:bg-blue-700 rounded'><MdEdit /></button>
                  <Code title={snippet.title} codeString={snippet.codeString} language={snippet.language} />
                </div>
              )
            })}
          </>
        }
      </div>
      <LoadingBar color='green' progress={progress} />
    </div>
  )
}

export default Home
