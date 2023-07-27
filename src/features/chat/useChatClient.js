import { useQuery, useQueryClient  } from "react-query";
import {makeChat, getChatsFor, getDirectChat, getChat, sendMessage} from './chatApi';
import {makeUseMutation} from '../../hooks/makeUseMutation';

export const CLIENT_CHAT_TAG = 'chat';

export function useChatClient() {
    const queryClient = useQueryClient();

    const useGetChatsFor = (userId, options)=>useQuery(
        [CLIENT_CHAT_TAG, "userChats"],
        async ()=>getChatsFor(userId),
        options,
    );

    //not sure where this is used
    const useGetDirectChat = (options)=>useQuery(
        [CLIENT_CHAT_TAG, "directChat"],
        getDirectChat,
        options,
    );

    const useGetChat = (chatId, options)=>useQuery(
        [CLIENT_CHAT_TAG, 'chat'],
        async ()=>getChat(chatId),
        options
    );

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