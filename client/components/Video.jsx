import React from 'react'
import { FiDownload } from "react-icons/fi";
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {IoMdOpen} from 'react-icons/io'


const Video = ({name,src,remove}) => {
    function download(){
        const a = document.createElement('a');
        a.href = src
        a.download = name;
        a.click();
      }
      function openInTab(){
          const win = window.open(src)
          win.document.write(`<video height="100%" width:"100% style="margin:0px;padding:0px;" controls autoPlay src=${src}></video>`)
          win.document.title = name
          win.document.body.style.margin = "0px"
          win.document.body.style.padding = "0px"
          win.document.body.style.boxSizing = "border-box"
          win.document.body.style.overflowX = "hidden"
      }
  return (
    <>
    <div title={name} style={{width:"auto" ,height:"inherit"}} className="flex m-3 bg-gray-600 max-w-lg justify-between flex-col">
        <video autoPlay muted loop style={{height:"250px"}} src={src}></video>
        <div style={{"width":`auto`}}  className="flex justify-between mt-1 items-center font-mono title-font text-lg font-medium h-10 mb-0  bg-gray-400 px-2 text-gray-900">

        <span className="bg-slate-50 mx-4 border-none rounded-md px-1">
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

export default Video