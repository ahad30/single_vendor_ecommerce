import { ReactNode } from "react";

const DashboardTitle = ({
  text,
  children,
  windowTitle,
}: {
  text: string;
  children: ReactNode;
  windowTitle: string;
}) => {
  document.title = `${windowTitle ? windowTitle : "Z-commerce"} | Z-E-commerce`;
  return (
    <h2 className="text-xl font-Poppins">
      {text} {children}
    </h2>
  );
};

export default DashboardTitle;
