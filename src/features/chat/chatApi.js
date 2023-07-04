import { axiosInst } from "../../app/axiosInst";
import { MakeChatDto, classifyWithDto, isId } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";
import { clideInst } from "../../app/clideInst";
import { DummyCache } from "../../ottery-cache/DummyCache";



export const getChatsFor = clideInst
    .makeGet("message/user/:userId", {
        param_validators: {
            userId: isId,
        },
        pipeline: (userId) => {
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
        pipeline: (chatId) => {
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
        pipeline: (chatId) => {
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
        pipeline: (makeChatDto) => {
            return {
                data: makeChatDto
            }
        }
    });