export interface TRoles {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  pivot: Pivot;
}

export interface Pivot {
  role_id: number;
  permission_id: number;
}
