import React, { useEffect, useRef} from "react";
import { FiDownload } from "react-icons/fi";
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {IoMdOpen} from 'react-icons/io'

const Canvas = ({ name, src,remove }) => {
  const reference = useRef(null);

  function download(){
    const a = document.createElement("a")
    a.href = src
    a.download = name
    a.click()
  }

  function openInTab(){
    let img = new Image()
    img.src = src
    img.onload=()=>{
      let win = window.open(name,name,`height=${img.height},width=${img.width}`)
      win.document.write(`<iframe style="margin:0px;padding:0px;" height="100%" width="100%" src=${src}></iframe>`)
      win.document.title = name
    } 
  }

  useEffect(() => {
    const canvas = reference.current;
    const ctx = canvas.getContext("2d");
    const img = new Image(canvas.width, canvas.height);
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <>
      <div style={{width:"auto" ,height:"inherit"}}  className="flex justify-between m-3 items-center flex-col">
        <canvas
          className="mx-2"
          title={name}
          width="300"
          height="250"
          ref={reference}
        ></canvas>

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
  );
};

export default Canvas;
