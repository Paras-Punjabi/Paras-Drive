import CreateAccount from '../components/CreateAccount'
import UserHomePage from '../components/UserHomePage'

export default function Home({loggedInStatus,setLoggedInStatus}) {
  return (
    <>
    {loggedInStatus && <UserHomePage/>}
    { !loggedInStatus && <CreateAccount setLoggedInStatus={setLoggedInStatus} />}
    </>
  )
}
