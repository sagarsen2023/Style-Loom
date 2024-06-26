import axios from "axios";
async function fetchData() {
    const _userID = document.cookie.split('; ')
        .find(row => row.startsWith('_user='))
        ?.split('=')[1];
    console.log(_userID)

    const _userType = document.cookie.split('; ')
        .find(row => row.startsWith('_userType='))
        ?.split('=')[1];
    console.log(_userType)
    const sellerData = await axios.post("/api/getuserdata", { _userID, _userType })
    console.log(sellerData.data.userData)
}

export default fetchData;