import {ChatConfiguration} from "../typings/Chat";

export const CHAT_CONFIG:ChatConfiguration = {
    MAX_ITEMS:30,
    MESSAGE_CFG:{
        MAX_LENGTH: 15,
        MIN_LENGTH: 1,
        canBeEmpty: false
    }
}