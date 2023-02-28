import React ,{useState} from "react";
import {MdNoteAdd} from 'react-icons/md'

export default function CreateNoteModal({ title,fetchNotes,toast }) {
  const [isClose, setIsClose] = useState(true);
  const [data,setData] = useState({title:"",description:""})

  async function createNote(){
    let rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/notes/create`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authtoken":localStorage.getItem("authtoken")
      },
      body:JSON.stringify(data)
    })
    let json = await rawData.json()
    if(json.status){
      console.log(json);
      setData({title:"",description:""})
      toast.success('Note Created Sucessfully!', {
        position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
      }else{
        toast.error('Error Occured', {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
      }
      setIsClose(true)
      fetchNotes()
  }

  return (
    <>
       <MdNoteAdd onClick={() => setIsClose(false)} className="sm:text-4xl text-3xl hover:scale-110 transition-transform cursor-pointer" title="Add a Note"/>
        
      {!isClose ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-3xl w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsClose(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <div className="mb-2 pt-0">
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e)=>{setData({title:e.target.value,description:data.description})}}
                      placeholder="Enter title of note"
                      className="px-3 py-3 placeholder-slate-800 text-slate-800 relative w-full bg-white rounded text-sm border  focus:border-gray-700 shadow outline-none focus:outline-none"
                    />
                  </div>

                  <div className="mb-2 pt-0">
                    <textarea
                      type="text"
                      value={data.description}
                      onChange={(e)=>{setData({description:e.target.value,title:data.title})}}
                      placeholder="Enter description of note"
                      className="px-3 resize-none overflow-y-auto py-3 h-44 placeholder-slate-800 text-slate-800 relative w-full bg-white rounded text-sm border focus:border-gray-700 shadow outline-none focus:outline-none"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="inline-flex items-center bg-red-300 border-0 font-mono  py-2 px-4 focus:outline-none hover:bg-red-400  rounded text-lg mt-4 mx-1 md:mt-0"
                    type="button"
                    onClick={() => {setIsClose(true);setData({title:"",description:""})}}
                  >
                    Close
                  </button>

                   <button
                    className="inline-flex items-center bg-green-300 border-0 font-mono  py-2 px-4 focus:outline-none hover:bg-green-400 rounded text-lg mt-4 mx-1 md:mt-0"
                    type="button"
                    onClick={createNote}
                  >
                    Submit
                  </button>

                 
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
