import { cookies } from 'next/headers'
import Pagehandler from '@/Pagehandler';
export default async function Home() {
  const _userID =  cookies().get("_user")
  const _userType = cookies().get("_userType")
  return (
   <Pagehandler userId = {_userID} userType = {_userType}/>
  );
}