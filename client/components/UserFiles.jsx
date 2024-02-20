import React,{useState,useEffect} from 'react'
import Canvas from './Canvas'
import PlainText from './PlainText'
import { FileUploader  } from 'react-drag-drop-files'
import PDFPage from './PDFPage'
import GIF from './GIF'
import Video from './Video'
import { ToastContainer,toast } from 'react-toastify'

const UserFiles = () => {
  const [filesArray,setFilesArray] = useState()
  const [urlArray,setUrlArray] = useState([])
  const fileTypes = ["JPG", "PNG", "PDF","TXT","GIF"];
  const [file, setFile] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);

  function arrayBufferToURL(Arraybuffer, Filetype) {
    let binary = '';
    const bytes = new Uint8Array(Arraybuffer.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const file = window.btoa(binary);
    const url = `data:${Filetype};base64,` + file;
    return url
  }

  function fetchFiles(){
    fetch(`${process.env.SERVER_HOSTNAME}/api/files/getfiles`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        authtoken:localStorage.getItem("authtoken")
      }
    }).then(data=>{return data.json()})
    .then(({status,files})=>{  
      if(status){
        setFilesArray(files)
        let array = [];
        for(let items of files){
          array.push(arrayBufferToURL(items.buffer,items.mimetype))
        }
        setUrlArray(array)
    }
  })

  }
  useEffect(function(){
    fetchFiles()
  },[])

  function handleChange(f){
    setDisableBtn(false)
    setFile(f);
  };

  async function remove(id){
    let data = await fetch(`${process.env.SERVER_HOSTNAME}/api/files/delete`,{
      method:"Delete",
      headers:{
          "Content-Type":"application/json",
          "authtoken":localStorage.getItem("authtoken")
      },
      body:JSON.stringify({fileId:id})
    })
    let json = await data.json()
    if(json.status){
        fetchFiles()
        toast.warn('File Deleted Sucessfully!', {
          position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
        }
        else{
          toast.error('Error Occured', {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
        }
  }

  async function uploadFile(e){
    if(file){
      setDisableBtn(true)
      e.preventDefault()
      const form = new FormData()
      form.append("file", file)
      form.append("authtoken", localStorage.getItem("authtoken"))
      let data = await fetch(`${process.env.SERVER_HOSTNAME}/api/files/upload`, {
          method: "POST",
          body: form
      })
      let json = await data.json()
      if(json.status){
        toast.success('File Uploaded Sucessfully!', {
        position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
        setFile(null)
      }else{
        toast.error('Error Occured', {
          position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,pauseOnHover: false,draggable: true,progress: undefined,});
        }
        setDisableBtn(false)
        fetchFiles()
        setFile(null);
    }
  }

  return (
    <>
    <h1 className=" text-4xl mt-2 px-3 py-2 font-mono mb-2 text-center text-gray-900">Upload New File</h1>

     <form className='mt-4 flex flex-col justify-between h-28 items-center' action={`${process.env.SERVER_HOSTNAME}/upload`} id="form" method="POST" encType="multipart/form-data" onSubmit={uploadFile}>
        <FileUploader value={file} className="drop_area drop_zone" label="Upload or drop a file here" handleChange={handleChange} name="file" types={fileTypes} />

        <button disabled={file === null?true:false} type='submit' style={disableBtn?{opacity:0}:{opacity:1}} className={`inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0`}>Upload File</button>
     </form>

    <div className="py-4">
      <div style={{width:"95%"}} className="border-t-2 border-dashed border-gray-700 mx-auto"></div>
    </div>

    <div className='px-10 py-2 mb-2 -mt-3 flex justify-between items-center'>
    <h1 className="text-4xl font-mono text-center text-gray-900">Your Uploads</h1>

    {filesArray && filesArray.length !== 0 && <button onClick={fetchFiles} className='inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-3xl mt-4 md:mt-0'>Refresh</button>}

    </div>
    <div className="container px-3 py-2">
      <div className="flex justify-evenly flex-wrap">

      {(filesArray && filesArray.length === 0) && <h1 className="text-2xl font-mono font-bold pt-8 lg:pt-0">No Uploads to Display</h1>}
        {filesArray && filesArray.map((item,idx)=>{
          if(item.mimetype.endsWith("jpg") || item.mimetype.endsWith("jpeg") || item.mimetype.endsWith("png")){
            return <Canvas remove={()=>remove(item._id)} fetchFiles={fetchFiles} id={item._id} key={idx} src={urlArray[idx]} name={item.name}/>
          }

          if(item.mimetype === "text/plain"){
            return <PlainText remove={()=>remove(item._id)} key={idx} id={item._id} fetchFiles={fetchFiles} Filetype={item.mimetype} data={item.buffer.data} name={item.name}/>
          }

          if(item.mimetype.endsWith("pdf")){
            return <PDFPage remove={()=>remove(item._id)} key={idx} src={urlArray[idx]} id={item._id} fetchFiles={fetchFiles} data={item.buffer.data} name={item.name}/>
          }

          if(item.mimetype.endsWith("gif")){
            return <GIF remove={()=>remove(item._id)} key={idx} src={urlArray[idx]} id={item._id} fetchFiles={fetchFiles} name={item.name}/>
          }

          if(item.mimetype.startsWith("video")){
            return <Video remove={()=>remove(item._id)} key={idx} src={urlArray[idx]} id={item._id} fetchFiles={fetchFiles} name={item.name}/>
          }
          
        })}
      </div> 
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
    </>
  )
}

export default UserFiles