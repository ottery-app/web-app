import {isId, noId} from "@ottery/ottery-dto";
import { clideInst } from "../../provider/clideInst";

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
            if (userIds && !Array.isArray(userIds)) {
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
                    hasEvent: true,
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
                    hasEvent: true,
                }
            }
        },
    });