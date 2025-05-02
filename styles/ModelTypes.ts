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

export interface MaterialInt {
  id: number;
  name: string;
  image?: string;
  image_id?: string;
  quantity: number;
  minMatriculas: number;
  leadTimeDays: number;
  rules: string;
  replacementCost: number;
  deleted: boolean;
  createdAt: Date;
}

export interface LoanInt {
  id: number;
  materialId: number;
  responsibleId: string;   // matrícula del responsable
  studentIds: string[];    // lista de matrículas involucradas
  quantity: number;
  pickupDate: Date;        // fecha programada para recoger
  returnDate: Date;        // fecha programada para devolver
  actualReturnDate?: Date; // fecha real de devolución
  pickupTime: string;      // horario de recolección: "7:00–9:00" o "14:00–16:00"
  returnTime: string;      // horario de devolución
  status: LoanStatus;
  createdAt: Date;
  penaltyApplied: boolean; // indica si se aplicó una penalización
  penaltyNotes?: string;   // notas sobre la penalización
  material?: MaterialInt;
}

export enum LoanStatus {
  PENDING = "PENDING",           // solicitud pendiente de aprobación
  AWAITING_PICKUP = "AWAITING_PICKUP",   // aprobado, esperando que el estudiante recoja
  ON_LOAN = "ON_LOAN",           // material en manos del usuario
  LATE = "LATE",              // material no devuelto a tiempo
  LOST = "LOST",              // material perdido o dañado
  RETURNED = "RETURNED"       // material devuelto (estado final)
}

export interface CarouselImageInt {
  id: number;
  url: string;
  image_id: string;
  order: number;
  createdAt: Date;
}
