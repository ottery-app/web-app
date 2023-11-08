import { useQueryClient } from "react-query";
import {
  makeChat,
  getChatsFor,
  getDirectChat,
  getChat,
  sendMessage,
} from "./chatApi";
import { makeUseQuery } from "../../queryStatus/makeGetQuery";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";

export const CLIENT_CHAT_TAG = "chat";

export function useChatClient() {
  const queryClient = useQueryClient();

  const useGetChatsFor = makeUseQuery({
    queryFn: getChatsFor,
    queryKey: [CLIENT_CHAT_TAG, "userChats"],
  });

  const useGetDirectChat = makeUseQuery({
    queryKey: [CLIENT_CHAT_TAG, "directChat"],
    queryFn: getDirectChat,
  });

  const useGetDirectChats = makeUseQuery({
    queryKey: [CLIENT_CHAT_TAG, "directChat"],
    queryFn: async (userId, friendIds)=>{
      const ids = {};
      await Promise.all(friendIds.map(async (otherId)=>{
        ids[otherId] = (await getDirectChat(userId, otherId)).data._id;
      }));
      return ids;
    }
  })

  const useGetChat = makeUseQuery({
    queryKey: [CLIENT_CHAT_TAG, "chat"],
    queryFn: async (chatId: string) => getChat(chatId),
  });

  const useMakeChat = makeUseMutation({
    mutationFn: makeChat,
    onSuccessAlways: (data) => {
      queryClient.invalidateQueries(CLIENT_CHAT_TAG);
      return data;
    },
  });

  const useSendMessage = makeUseMutation({
    mutationFn: async (vars) => sendMessage(...vars),
    onSuccessAlways: (data) => {
      queryClient.invalidateQueries(CLIENT_CHAT_TAG);
      return data;
    },
  });

  return {
    useGetChatsFor,
    useMakeChat,
    useGetDirectChats,
    useGetDirectChat,
    useGetChat,
    useSendMessage,
  };
}
