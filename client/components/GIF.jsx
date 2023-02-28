import React, { useEffect, useState } from 'react'
import { FiDownload } from "react-icons/fi";
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {IoMdOpen} from 'react-icons/io'



const GIF = ({name,src,remove}) => {
    const [img,setImg] = useState()
    function download(){
        const a = document.createElement('a');
        a.href = src
        a.download = name;
        a.click();
      }
      function openInTab(){
          const win = window.open(src)
          win.document.write(`<iframe width='100%' style="margin:0px;padding:0px;" height='100%' src=${src}></iframe>`)
          win.document.title = name
          win.document.body.style.margin = "0px"
          win.document.body.style.padding = "0px"
          win.document.body.style.boxSizing = "border-box"
          win.document.body.style.overflowX = "hidden"
      }

      useEffect(()=>{
        let image = new Image()
        image.src = src
        setImg(image)
      },[])
  return (
    <>
    <div style={{width:"auto" ,height:"inherit"}} className="flex m-3 bg-gray-600 max-w-lg justify-between flex-col">
        <iframe height="250px" style={{overflowX:"hidden"}} width={img && (Number(img.width)+10)} className='scroll-m-0 overflow-x-hidden' src={src}></iframe>
        <div style={{"width":`auto`}}  className="flex justify-between mt-1 items-center font-mono title-font text-lg font-medium h-10 mb-0  bg-gray-400 px-2 text-gray-900">

          <span className="bg-slate-50 border-none mx-4 rounded-md px-1">
            {name}
          </span>

          <div className="flex">
          <FiDownload className="cursor-pointer text-xl mr-3" onClick={download} title="Download"/>
          <IoMdOpen className="cursor-pointer text-xl mr-3" onClick={openInTab} title="Open in new Tab"/>
          <RiDeleteBin5Fill className="cursor-pointer text-xl" onClick={remove} title="Remove"/>
          </div>

        </div>
      </div>
    </>
  )
}

export default GIF