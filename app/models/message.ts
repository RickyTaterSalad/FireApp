import {Conversation} from "./conversation";

export interface Message {
  conversation:Conversation;
  sender:string;
  recipient:string;
  content:string;
}
