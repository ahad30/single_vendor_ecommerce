import { TRoutesData, TSidebar } from "../types/sidebarAndRouesTypes";


export const sidebarGenerator = (arr: TRoutesData[]) => {
  const sidebarGeneratorModified = arr.reduce((acc:TSidebar[], item) => {
    if (item?.path) {
      acc?.push({ key: item?.path, icon: item?.icon, label: item?.label });
    }
    if (item?.children) {
      acc?.push({
        key: item?.label,
        label: item?.label,
        icon: item?.icon,
        children: item?.children.map((child) => ({
          key: child?.path,
          label: child?.label,
        })),
      });
    }
    return acc
  }, []);
  return sidebarGeneratorModified
};
