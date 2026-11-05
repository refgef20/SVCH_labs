export interface Appointments {
  userId: number;
  date: string;
  MasterId: number | string;
  FavorId: number;
  status: string | "создана";
}
