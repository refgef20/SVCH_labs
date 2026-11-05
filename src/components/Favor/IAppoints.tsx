import { Master } from "../Masters/IMaster";
import { Favor } from "./IFavor";

export interface Appointments {
  userId: number;
  clientName: string;
  clientPhone: string;
  date: string;
  MasterId: number | string;
  FavorId: number;
  status: string | "создана";
}

export interface AppointmentsMastFav {
  id: number;
  date: string;
  status: string | "создана";
  Master: Master;
  Favor: Favor;
  userId: number;
}
