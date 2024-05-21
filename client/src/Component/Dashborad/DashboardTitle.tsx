import { ReactNode } from "react";

const DashboardTitle = ({text , children}: {text: string , children: ReactNode}) => {
    return (
     <h2 className="text-xl font-Poppins">{text} {children}</h2>
    );
};

export default DashboardTitle;