export type TPermissions = {
  id: number;
  name: string;
};

export type TAllPermission =
  | "create attribute"
  | "create brand"
  | "create category"
  | "create role"
  | "create user"
  | "delete attribute"
  | "delete brand"
  | "delete category"
  | "delete role"
  | "delete user"
  | "edit attribute"
  | "edit brand"
  | "edit category"
  | "edit role"
  | "edit user"
  | "view attribute"
  | "view brand"
  | "view category"
  | "view permissions"
  | "view role"
  | "view user"
  | "view dashboard";
