import { API_CHAT } from "../../config/env"
import { customAxios } from "../../lib/axiosConfig"
import { UserMessage } from "../../types/message"
import { UidMessageParam } from "../../types/util"

const deleteMessage = async (values: UidMessageParam): Promise<UserMessage | undefined> => {
  const response = await customAxios.delete(`${API_CHAT}/${values.uid}/${values.id}`)
  const { data } = response.data

  if (data) return data
}

const deleteAllMessage = async (values: UidMessageParam): Promise<UserMessage[] | undefined> => {
  const response = await customAxios.delete(`${API_CHAT}/${values.uid}/all`)
  const { data } = response.data

  if (data) return data
}

export {
  deleteMessage,
  deleteAllMessage
}