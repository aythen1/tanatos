export class UpdateFuneralDto {
  id: number;
  image?: string;
  name?: string;
  description?: string;
  account_type?: string;
  favorite?: boolean; // Cambiado a boolean
  funeral_date?: Date;
  funeral_time?: Date;
  church_date?: Date;
  church_time?: Date;
  funeral_location?: string;
  funeral_lat?: number;
  funeral_lng?: number;
  church_location?: string;
  church_lat?: number;
  church_lng?: number;
}
