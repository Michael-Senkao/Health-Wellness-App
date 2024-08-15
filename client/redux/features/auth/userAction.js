import {server} from "../../store"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

//action login 
export const actionLogin = (email,password) => async (dispatch) => {
    try{
        dispatch({
            type:'loginRequest',
        })
        //hitting node login api request
        const { data } = await axios.post(`${server}/user/login`,{email,password},{headers: {'Content-Type': 'application/json'}});
        //console.log(data)
        dispatch({
            type:'loginSuccess',
            payload:data.message,
        })
        await AsyncStorage.setItem("@auth", data?.token);
    } catch(error){
        console.log(`error message -> ${error.response.data.message}`)
        dispatch({
            type:'loginFailure',
            payload: error.response.data.message  //|| "Something went wrong line 21 userAction"
        })
    }
}


//Get user data action
export const getUserData = () => async (dispatch) => {
    try{
        dispatch({
            type:'getUserDataRequest',
        })
        //hitting node profile api request

        //get token
        const token = await AsyncStorage.getItem("@auth");

        const { data } = await axios.post(`${server}/user/profile`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        dispatch({
            type:'getUserDataSuccess',
            payload:data?.user,
        })
        await AsyncStorage.setItem("@auth", data?.user);
    } catch(error){
        console.log(`error message -> ${error.response.data.message}`)
        dispatch({
            type:'getUserDataFailure',
            payload: error.response.data.message  
        })
    }
}



//Get user data action
export const logoutAction = () => async (dispatch) => {
    try{
        dispatch({
            type:'logoutRequest',
        })
        //token request
        const token = await AsyncStorage.getItem("@auth");

        //hitting node logout api request
        const { data } = await axios.get(`${server}/user/logout`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(`Logout data - ${data}`)
        dispatch({
            type:'logoutSuccess',
            payload:data?.message,
        })
    } catch(error){
        console.log(` userActions 68 : error -> ${error}`)
        dispatch({
            type:'logoutFailure',
            payload: error.response.data.message,
        })
    }
}