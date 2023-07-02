import { axiosInst } from "../../app/axiosInst";
import { MakeChatDto, classifyWithDto, isId } from "ottery-dto";
import { ERR_USER } from "../../app/axiosInst";
import { isString } from "ducktyper";
import { clideInst } from "../../app/clideInst";



const clide_getChatsFor = clideInst.makeGet("message/user/:userId", {
    param_validators: {
        userId: isId,
    }
})

export async function getChatsFor(userId) {
    return await clide_getChatsFor({
        params: {
            userId: userId,
        }
    });
}

export async function getChat(chatId) {
    try {
        isId(chatId, {throw:true});
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    return await axiosInst.get(`api/message/chat/${chatId}`);
}

export async function sendMessage(chatId, message) {
    try {
        isString(message, {throw:true});
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    return await axiosInst.patch(`api/message/chat/direct/${chatId}`, {string:message});
}

export async function makeChat(makeChatDto) {
    try {
        classifyWithDto(
            MakeChatDto,
            makeChatDto,
            {throw: true}
        )
    } catch (e) {
        throw {
            code: ERR_USER,
            message: e.message,
        };
    }

    return await axiosInst.put(`api/message/chat`, makeChatDto)
}