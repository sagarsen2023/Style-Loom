import axios from "axios";
import { toast } from "sonner";
async function fetchUserData() {
    try{
         const _userID = document.cookie.split('; ')
        .find(row => row.startsWith('_user='))
        ?.split('=')[1];
    console.log(_userID)

    const _userType = document.cookie.split('; ')
        .find(row => row.startsWith('_userType='))
        ?.split('=')[1];
    console.log(_userType)
    const sellerData = await axios.post("/api/getuserdata", { _userID, _userType })
    return sellerData.data.userData
    } catch (err:any) {
        toast.error(err.message)
    }
   
}

export default fetchUserData;