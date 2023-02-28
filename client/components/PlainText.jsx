import React, { useEffect, useState } from "react";
import {FiDownload} from 'react-icons/fi'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {IoMdOpen} from 'react-icons/io'

const PlainText = ({ name, data,Filetype,remove }) => {
  const [text, setText] = useState("");

  function toBinary(){
    let binary = "";
    const bytes = new Uint8Array(data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary
  }

  function getURL(){
    const file = window.btoa(text);
    return `data:${Filetype};base64,` + file;
  }

  function download(){
    const a = document.createElement('a');
    a.href = getURL();
    a.download = name;
    a.click();
  }

  function openInTab(){
    let win = window.open(name)
    win.document.write(`<iframe style="margin:0px;padding:0px;word-wrap:wrap;font-size:30px" width="100%" height="100%" srcdoc="<pre><b>${text}</b></pre>"></iframe>`)
    win.document.title = name
    win.document.body.style.margin = "0px"
    win.document.body.style.padding = "0px"
    win.document.body.style.boxSizing = "border-box"
    win.document.body.style.fontSize = "30px"
    win.document.body.style.transform = "scale(1.5)" 
    win.document.body.style.transformOrigin = "left top" 
  }

  useEffect(() => {
    setText(toBinary());
  }, []);


  return (
    <>
      <div style={{width:"inherit" ,height:"inherit"}}  className="flex m-3 max-w-lg  justify-between flex-col">
        <textarea
          style={{ width: "100%", height: "100%" }}
          className="form-control select-none cursor-pointer max-w-lg min-w-max text-2xl block resize-x h-1/2 px-3 py-1.5  font-mono text-gray-700 bg-gray-200 border-none bg-clip-padding rounded transition ease-in-out m-0 overflow-y-auto"
          rows="3"
          value={text}
          disabled={true}
          onClick={openInTab} 
        ></textarea>

        <div className="flex justify-between mt-1 items-center font-mono title-font text-lg font-medium h-10 mb-0  bg-gray-400 px-2 text-gray-900">
          <span className="bg-slate-50 select-none border-none rounded-md px-1">{name}</span>
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

export default PlainText;