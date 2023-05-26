import { useMutation, useQuery, useQueryClient } from "react-query";
import { createUserTextMessage } from "../../api/chat/postMessage";
import { Message, UserMessage } from "../../types/message";
import { getAllMessage, getAllUserMessage } from "../../api/chat/getMessage";
import { deleteAllMessage, deleteMessage } from "../../api/chat/deleteMessage";
import { UidMessageParam } from "../../types/util";
import { deleteMultiImageCloudinary, deleteSingleImageCloudinary } from "../../api/upload/deleteImageCloudinary";
import { socket } from "../../config/socketIo";

const useChatController = () => {
  const queryClient = useQueryClient();

  const useCreateMessage = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: (values: Message) => createUserTextMessage(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getMessage"] })
      // socket.emit("message", data)
    },
  });

  const useGetUserMessage = (uid:string) => useQuery({
    enabled: uid !== null,
    queryKey: ["getMessage", uid],
    queryFn: () => getAllMessage(uid),
    // retry:false
    // refetchInterval:1000
    // staleTime:0
  });

  const useDeleteUserMessage = useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn:(values: UidMessageParam) => deleteMessage(values),
    onSuccess:(data) => {
      // queryClient.invalidateQueries({queryKey: ["getAllMessage"]})
      // queryClient.refetchQueries(["getMessage"])
      queryClient.invalidateQueries({queryKey: ["getMessage"]})
      // queryClient.invalidateQueries({queryKey: ["getMessage", data?.id]})
      deleteSingleImageCloudinary(data as any)
      // socket.emit("message", data)
    }
  })

  const useDeleteAllUserMessage = useMutation({
    mutationKey:['deleteAllMessage'],
    mutationFn:(values: UidMessageParam) => deleteAllMessage(values),
    onSuccess:(data) => {
      // queryClient.refetchQueries(["getAllMessage"])
      queryClient.refetchQueries(["getMessage"])
      deleteMultiImageCloudinary(data!)
      // socket.emit("message", data)
    }
  })

  const useGetAllUserMessage = useQuery({
    queryKey:["getAllMessage"],
    queryFn:() => getAllUserMessage(),
  })

  return {
    useCreateMessage,
    useGetUserMessage,
    useDeleteUserMessage,
    useDeleteAllUserMessage,
    useGetAllUserMessage
  };
};

export default useChatController;
