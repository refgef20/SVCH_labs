import { Master } from "../Masters/IMaster";
import { Favor } from "./IFavor";

export interface Appointments {
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
}
