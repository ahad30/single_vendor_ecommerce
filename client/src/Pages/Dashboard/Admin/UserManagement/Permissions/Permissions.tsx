import { Alert } from "antd";
import { useGetAllPermissionsQuery } from "../../../../../Redux/Feature/Admin/UserManagement/rolesApi";
import DashboardTitle from "../../../../../Component/Dashborad/DashboardTitle";

const Permissions = () => {
  const { data, isLoading, isFetching } = useGetAllPermissionsQuery(undefined);
  console.log(data);
  if (isLoading || isFetching) {
    return <p>loading ...</p>;
  }
  if (!Array.isArray(data?.data) || data.data.length === 0) {
    return <p>No data available</p>;
  }
  return (
    <div>
      <DashboardTitle windowTitle="Permissions" text="Total Permissions">
        {data?.data?.length || 0}
      </DashboardTitle>
      <div className="grid lg:mt-12 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data?.map((item, idx) => (
          <Alert key={item.id} message={item.name} type="info" />
        ))}
      </div>
    </div>
  );
};

export default Permissions;
