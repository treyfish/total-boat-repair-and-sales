export interface Boat {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  year: number | null;
  make: string | null;
  model: string | null;
  length_ft: number | null;
  engine_make: string | null;
  engine_hp: number | null;
  hull_material: string | null;
  fuel_type: string;
  status: "available" | "pending" | "sold";
  featured: boolean;
  photos: string[];
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: string | null;
  boat_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  boat_id?: string;
  message: string;
}

export interface BoatFormData {
  name: string;
  description?: string;
  price?: number | null;
  year?: number | null;
  make?: string;
  model?: string;
  length_ft?: number | null;
  engine_make?: string;
  engine_hp?: number | null;
  hull_material?: string;
  fuel_type?: string;
  status: "available" | "pending" | "sold";
  featured: boolean;
  photos: string[];
}
