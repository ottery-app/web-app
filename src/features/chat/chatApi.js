import { MakeChatDto, isId, validateAsArr } from "ottery-dto";
import { clideInst } from "../../app/clideInst";
import { DummyCache } from "../../ottery-cache/DummyCache";

export const makeChat = clideInst
    .makePut("message/chat", {
        data_validator: MakeChatDto,
        in_pipeline: (makeChatDto) => {
            return {
                data: makeChatDto
            }
        }
    });

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

export const getDirectChat = clideInst
    .makeGet("message/user/:userId", {
        cache: DummyCache,
        param_validators: {
            requireUserIds: validateAsArr(isId)
        },
        in_pipeline: (userA, userB)=>{
            return {
                params: {
                    userId: userA,
                    requireUserIds: [userB],
                    direct: true,
                }
            }
        },
        out_pipeline: async (res, config)=>{
            res.data = res.data[0];

            if (res.data) {
                return res;
            } else {
                let newChat = new MakeChatDto();
                newChat.users = [config.params.userId, ...config.params.requireUserIds];
                res = await makeChat(newChat);
            }

            return res;
        },
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
    });

export const sendMessage = clideInst
    .makePatch("message/chat/direct/:chatId", {
        param_validators: {
            chatId: isId,
        },
        in_pipeline: (chatId, message) => {
            return {
                params: {
                    chatId: chatId,
                },
                data: {
                    string: message
                },
            }
        }
    });