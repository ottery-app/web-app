import { useQuery, useQueryClient  } from "react-query";
import {makeChat, getChatsFor, getDirectChat, getChat, sendMessage} from './chatApi';
import {makeUseMutation} from '../../hooks/makeUseMutation';
import { makeUseQuery } from "../../hooks/makeGetQuery";

export const CLIENT_CHAT_TAG = 'chat';

export function useChatClient() {
    const queryClient = useQueryClient();

    const useGetChatsFor = makeUseQuery({
        queryFn: async (userId)=>getChatsFor(userId),
        queryKey: [CLIENT_CHAT_TAG, "userChats"],
    });

    //not sure where this is used
    // const useGetDirectChat = (options)=>useQuery(
    //     [CLIENT_CHAT_TAG, "directChat"],
    //     getDirectChat,
    //     options,
    // );

    const useGetChat = makeUseQuery({
        queryKey: [CLIENT_CHAT_TAG, 'chat'],
        queryFn: async (chatId)=>getChat(chatId),
    });

    const useMakeChat = makeUseMutation({
        mutationFn: makeChat,
        onSuccessAlways: (data)=>{
            queryClient.invalidateQueries(CLIENT_CHAT_TAG);
            return data;
        }
    });

    const useSendMessage = makeUseMutation({
        mutationFn: async (vars)=>sendMessage(...vars),
        onSuccessAlways: (data)=>{
            queryClient.invalidateQueries(CLIENT_CHAT_TAG);
            return data;
        }
    });

    return {
        useGetChatsFor,
        useMakeChat,
        //useGetDirectChat,
        useGetChat,
        useSendMessage,
    }
}