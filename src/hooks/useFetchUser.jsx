import {useEffect, useState} from "react";
import {findUserByEmail} from "../utilities/BackendService.jsx";

export default function useFetchUser(loggedInUser) {
    const [userID, setUserID] = useState(null);
    const [fetchUserMessages, setFetchUserMessages] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            if (loggedInUser !== '') {
                const token = sessionStorage.getItem('token');
                const {response, error} = await findUserByEmail(token, loggedInUser);
                if (response && response.status === 200) {
                    setUserID(response.data);
                } else {
                    console.log(error);
                    setFetchUserMessages(error.data);
                    setUserID('Data Failure');
                }
            }
        }
        fetchUser();
    }, [loggedInUser]);
    return [userID, fetchUserMessages]
}