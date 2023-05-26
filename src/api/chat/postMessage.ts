import { API_CHAT } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { Message } from "../../types/message"

const createUserTextMessage = async (values: Message) =>{

  const response= await customAxios.post(`${API_CHAT}/${values.uid}`, {
    text: values.text,
  })
  const {data}= response.data

  if(data) return data
}

export {
  createUserTextMessage
}