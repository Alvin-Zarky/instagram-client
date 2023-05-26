import axios from "axios";
import { API_USER } from "../../config/env";
import { customAxios } from "../../lib/axiosConfig";
import { User } from "../../types/authentication";
import Storage from "../../utility/storage";
import { ValuesToken } from "../../types/user";

const getAllUser = async (token?:string): Promise<User[] | undefined> => {
  const response= await customAxios.get(`${API_USER}/all`)
  const {data} = response.data

  return data
  // try {
  //   let config = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }
  //   const response = await axios.get(`${API_USER}/all`, config);
  //   const { data } = response.data;

  //   return data;
  // } catch (err) {
  //   console.log(err)
  // }
};

export { getAllUser };
