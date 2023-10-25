export interface AdminInt {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}


export interface SpaceInt{
  id:number
  name:string
  adminId:number
  quota:number
  open_date:string
  close_date:string
  open:boolean
}
