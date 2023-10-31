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
