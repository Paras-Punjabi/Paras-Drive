import Head from 'next/head'
import React from 'react'
import Login from '../components/Login'

const login = ({setLoggedInStatus}) => {
  return (
    <>
    <Head>
      <title>Paras Drive - Login</title>
    </Head>
    <Login setLoggedInStatus={setLoggedInStatus}/>
    </>
  )
}

export default login