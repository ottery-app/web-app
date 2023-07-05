import {isId, noId} from "ottery-dto";
import { clideInst } from "../../app/clideInst";

export const getChildren = clideInst
    .makeGet("user/:userId/children", {
        param_validators: {
            userId: isId,
        },
        in_pipeline: (userId)=>{
            return {
                params: {
                    userId: userId,
                }
            }
        }
    });

export const getEvents = clideInst
    .makeGet("user/:userId/events", {
        in_pipeline:(userId)=>{
            return {
                params: {
                    userId: userId,
                    self: true,
                    children: true,
                }
            }
        }
    })


export const getInfo = clideInst
    .makeGet("user/info", {
        in_pipeline: (userIds)=>{
            if (!Array.isArray(userIds)) {
                userIds = [userIds];
            }

            return {
                params: {
                    users: userIds,
                }
            }
        }
    });

export const getAvalableChildren = clideInst
    .makeGet("user/:userId/children", {
        in_pipeline: (userId)=>{
            return {
                params: {
                    userId: userId,
                    at: noId,
                }
            }
        }
    });

export const getDroppedOffChildren = clideInst
    .makeGet("user/:userId/children", {
        in_pipeline: (userId)=>{
            return {
                params: {
                    userId: userId,
                    notat: noId,
                }
            }
        }
    });