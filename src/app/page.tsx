import { cookies } from 'next/headers'
import Pagehandler from '@/app/Pagehandler';
export default function Home() {
  const _userID =  cookies().get("_user")
  const _userType = cookies().get("_userType")
  return (
   <Pagehandler userId = {_userID?.value} userType = {_userType?.value}/>
  );
}