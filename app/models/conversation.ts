import {Message} from "./message";
export interface Conversation {
  creator:string;
  post:string;
  messages:Array<Message>;
}
