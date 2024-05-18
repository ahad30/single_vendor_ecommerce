import { ReactNode } from "react";

const ProtectedRoutes = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  console.log(role);
  return children;
};

export default ProtectedRoutes;
