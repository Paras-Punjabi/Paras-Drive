import React, { useEffect } from 'react'
import UserNotes from '../components/UserNotes'
import Head from 'next/head'
import { useRouter } from "next/router";

const NotesPage = ({loggedInStatus,notes,fetchNotes}) => {
  const router = useRouter()
  useEffect(()=>{
    if(!localStorage.getItem("authtoken")){
      router.push("/")
      return
    }
  })
  return (
    <>
    <Head>
      <title>Paras Drive - Notes</title>
    </Head>
   {loggedInStatus && <UserNotes notes={notes} fetchNotes={fetchNotes} />}
    </>
  )
}

export default NotesPage