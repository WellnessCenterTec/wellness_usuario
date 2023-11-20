export interface AdminInt {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserInt {
  id:number
  name: string;
  lastName: string;
  email: string;
  password: string;
  registration: string;
  gender: string;
  program_key: string;
  academic_exercise: string;
  user_session: string;
}

export interface SpaceInt {
  id: number;
  name: string;
  adminId: number;
  quota: number;
  open_date: string;
  close_date: string;
  open: boolean;
}

export interface ReservableInt {
  id: number;
  spaceId:number
  adminId: number;
  actualQuota: number;
  coach: AdminInt;
  end_date: string;
  init_date: string;
  color:string
  reservableGroup:string
  quota: number;
  admin?:AdminInt
  reservations?:ReservaInt[]
}


  
  export interface ReservaInt {
  id: number;
  espacio: string;
  ubicación: string;
  fecha: Date;
  hora: number;
  }
