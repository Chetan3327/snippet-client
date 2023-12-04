import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = ({codeString='console.log("hello, world")', title='*Untitled.txt', language='javascript'}) => {
  const [copy, setCopy] = useState(false)
  return (
      <div className='max-w-3xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
        <div className='flex justify-between px-4 text-white text-xs items-center'>
          <p className='text-sm'>{title}</p>
          {copy ? (
          <button className='py-1 inline-flex items-center gap-1'>
            <span className='text-base mt-1'><ion-icon name="checkmark-sharp"></ion-icon></span>
            Copied! 
          </button>
          ) : (
          <button className='py-1 inline-flex items-center gap-1' onClick={() => {
            navigator.clipboard.writeText(codeString)
            setCopy(true)
            setTimeout(() => {
              setCopy(false)
            }, 3000);
          }}>
            <span className='text-base mt-1'><ion-icon name="clipboard-outline"></ion-icon></span>
            Copy code 
          </button>)}
        </div>
        <SyntaxHighlighter language={language} style={dracula} customStyle={{padding: '20px'}} >
          {codeString}
        </SyntaxHighlighter>
      </div>
  )
}

export default Code