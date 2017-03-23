export interface Chat {
  id:string;
  fromId : string;
  toId:string;
  toName:string;
  fromName:string;
  toPhoto:string;
  mes:[{content:string,time:string,fromId:string,toId:string,fromPhoto:string}];
  unreadCount:number;
  type:string;
}
