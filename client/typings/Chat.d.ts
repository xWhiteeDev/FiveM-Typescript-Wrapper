export type MessageBuffer = {
    id:number;
    content:string
}
export interface ChatConfiguration {
    MAX_ITEMS:number;
    MESSAGE_CFG:MessageConfiguration
}
export interface MessageConfiguration {
    MAX_LENGTH:number;
    MIN_LENGTH:number;
    canBeEmpty:boolean;
}
export interface GeneratedMessage {
    content:string;
    id:number
}