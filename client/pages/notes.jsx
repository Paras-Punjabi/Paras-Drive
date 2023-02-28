import React, { useEffect } from 'react'
import UserNotes from '../components/UserNotes'
import { useRouter } from 'next/router'
import Head from 'next/head'
const NotesPage = ({loggedInStatus,notes,fetchNotes}) => {
  const router  = useRouter()
  // useEffect(()=>{
  //   if(!loggedInStatus){
  //       router.push("/")
  //   }
  // })
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