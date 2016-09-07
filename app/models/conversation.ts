import {Message} from "./message";
import {Post} from "./post";
export interface Conversation {
  id:string;
  creator:string;
  post:Post;
  collapsed:boolean;
  messages:Array<Message>;
}
