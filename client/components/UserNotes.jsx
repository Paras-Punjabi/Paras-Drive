import React, { useEffect, useState } from "react";
import CreateNoteModal from './createNoteModal'
import UpdateNoteModal from "./updateNoteModal";
import { ToastContainer,toast } from 'react-toastify'

const UserNotes = () => {
  const [notes, setNotes] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

  async function fetchNotes(){
    fetch(`${process.env.SERVER_HOSTNAME}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        setNotes(json.notes);
        console.log(json.notes);
      });
  }

  useEffect(function () {
    fetchNotes()
  },[]);

  async function deleteNote(e){
    const rawData = await fetch(`${process.env.SERVER_HOSTNAME}/api/notes/delete`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
      },
      body:JSON.stringify({id:e.target.id})
    })
    let json = await rawData.json()
    if(json.status){
      console.log(json)
      toast.warn('Note Deleted Sucessfully!', {
      position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
    }
    else{
      toast.error('Error Occured', {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
    }
    fetchNotes()
  }

  function updateNote(e,t,d){
    setTitle(t)
    setDescription(d)
    setId(e.target.id)
    console.log(id);
    setUpdateModalStatus(true)
  }

  return (
    <>
    {updateModalStatus && <UpdateNoteModal toast={toast} fetchNotes={fetchNotes} id={id} setUpdateModalStatus={setUpdateModalStatus} title={title} description={description} />}
    <div className="flex justify-between px-3 py-2">
    <h1 className="sm:text-3xl text-2xl font-mono font-medium title-font mb-2 text-gray-900">Your Notes</h1>
    <CreateNoteModal toast={toast} title={"Create a Note"} fetchNotes={fetchNotes}/>
    </div>
    <div className="container px-3 py-2">
      <div className="flex flex-wrap">
        {notes && notes.length === 0 && <h1 className="text-2xl font-mono font-bold pt-8 lg:pt-0">No Notes to Display...<br/>Click on Add Note icon to add notes</h1>}
        {notes &&
          notes.map((item) => {
            return (
              <div key={item._id} className="py-4 relative m-3 cursor-pointer transition-transform border rounded-lg bg-gray-100 px-3 lg:w-auto max-w-xl">
              <div className="h-full flex items-start">
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="pb-2 mb-2 border-b-2 border-gray-700">{months[new Date(item.date).getMonth()]}</span>
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">{new Date(item.date).getDate()}</span>
                </div>
                <div className="flex-grow pl-6">
                  <h1 className="title-font text-2xl font-mono tracking-tighter font-medium text-gray-900 mb-3">{item.title}</h1>
                  <p className="leading-relaxed mb-2 text-base">{item.description}</p>
                  <button className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mb-4 mx-1 md:mt-0" id={item._id} onClick={deleteNote}>Delete</button>

                  <button className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mb-4 mx-1 md:mt-0" id={item._id} onClick={(e)=>updateNote(e,item.title,item.description)}>Update</button>
                </div>
              </div>
            </div>
            );
          })}
      </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
    </>
  );
};

export default UserNotes;
