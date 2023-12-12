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
import { query_paths } from "../../provider/queryClient";

export function useChatClient() {
  const queryClient = useQueryClient();

  const useGetChatsFor = makeUseQuery({
    queryFn: getChatsFor,
    queryKey: [query_paths.chat.root, "userChats"],
  });

  const useGetDirectChat = makeUseQuery({
    queryKey: [query_paths.chat.root, "directChat"],
    queryFn: getDirectChat,
  });

  const useGetDirectChats = makeUseQuery({
    queryKey: [query_paths.chat.root, "directChat"],
    queryFn: async (userId, friendIds)=>{
      const ids = {};
      await Promise.all(friendIds.map(async (otherId)=>{
        ids[otherId] = (await getDirectChat(userId, otherId)).data._id;
      }));
      return ids;
    }
  })

  const useGetChat = makeUseQuery({
    queryKey: [query_paths.chat.root, "chat"],
    queryFn: async (chatId: string) => getChat(chatId),
  });

  const useMakeChat = makeUseMutation({
    mutationFn: makeChat,
    onSuccessAlways: (data) => {
      queryClient.invalidateQueries(query_paths.chat.root);
      return data;
    },
  });

  const useSendMessage = makeUseMutation({
    mutationFn: async (vars) => sendMessage(...vars),
    onSuccessAlways: (data) => {
      queryClient.invalidateQueries(query_paths.chat.root);
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
