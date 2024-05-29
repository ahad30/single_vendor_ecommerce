/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: any;
  is_active: number;
  is_administration: number;
  role: string[];
}
