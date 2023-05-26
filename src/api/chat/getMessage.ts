import { API_CHAT } from "../../config/env";
import { customAxios } from "../../lib/axiosConfig";
import { UserMessage } from "../../types/message";

const getAllMessage = async (
  uid: string
): Promise<UserMessage[] | undefined> => {
  try {

    const response = await customAxios.get(`${API_CHAT}/${uid}`);
    const { data } = response.data;

    return data
  } catch (err) {
    // console.clear()
    return undefined;
  }
};

const getAllUserMessage = async (): Promise<UserMessage[]> =>{
  const response = await customAxios.get(`${API_CHAT}/all`);
  const { data } = response.data;

  return data
}

export { getAllMessage, getAllUserMessage };
