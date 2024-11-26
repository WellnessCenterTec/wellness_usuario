export interface AdminInt {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserInt {
  id: number;
  name: string;
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
  materials_required: boolean;
  materials: string[];
  location:string
  open: boolean;
  image:string
}



// También necesitarás definir las interfaces para Reservable, ClosedSpace y Admin, 
// pero no puedo hacerlo sin conocer sus definiciones en el esquema Prisma.

export interface ReservableInt {
  id: number;
  spaceId: number;
  space?:SpaceInt
  adminId: number;
  coach: AdminInt;
  end_date: string;
  init_date: string;
  color: string;
  reservableGroup: string;
  quota: number;
  admin?: AdminInt;
  reservations?: ReservaInt[];
  onlineQuotaString: string;
}

export interface ReservaInt {
  id: number;
  reservableId: number;
  reservable?: ReservableInt;
  userId: number;

  reservation_date: string;
  status: string;
}

export interface AnnounceInt {
  id: number;
  title: string;
  init_date: string;
  end_date: string;
  event_date: string;
}


export interface CarouselImageInt {
  id: number;
  url: string;
  image_id: string;
  order: number;
  createdAt: Date;
}