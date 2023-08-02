import React, { useEffect } from 'react'
import UserNotes from '../components/UserNotes'
import Head from 'next/head'
const NotesPage = ({loggedInStatus,notes,fetchNotes}) => {
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