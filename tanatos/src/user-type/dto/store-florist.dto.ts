export class StoreFloristCreateDto {
  phone: string;
  location: string;
  lat: number;
  lng: number;
  name: string;
}

// StoreFloristUpdateDto.ts
export class StoreFloristUpdateDto {
  phone?: string;
  location?: string;
  lat?: number;
  lng?: number;
  name?: string;
}
