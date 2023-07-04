import { MakeChatDto, isId } from "ottery-dto";
import { clideInst } from "../../app/clideInst";

export const getChatsFor = clideInst
    .makeGet("message/user/:userId", {
        param_validators: {
            userId: isId,
        },
        in_pipeline: (userId) => {
            return {
                params: {
                    userId: userId,
                }
            }
        }
    });

export const getChat = clideInst
    .makeGet("message/chat/:chatId", {
        param_validators: {
            chatId: isId,
        },
        in_pipeline: (chatId) => {
            return {
                params: {
                    chatId: chatId,
                }
            }
        }
    })

export const sendMessage = clideInst
    .makePatch("message/chat/direct:chatId", {
        param_validators: {
            chatId: isId,
        },
        in_pipeline: (chatId) => {
            return {
                params: {
                    chatId: chatId,
                }
            }
        }
    })

export const makeChat = clideInst
    .makePut("message/chat", {
        data_validator: MakeChatDto,
        in_pipeline: (makeChatDto) => {
            return {
                data: makeChatDto
            }
        }
    });