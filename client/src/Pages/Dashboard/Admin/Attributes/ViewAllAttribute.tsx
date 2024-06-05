import { Alert } from "antd";
import { TAttributes } from "../../../../types/attribute.types";

const ViewAllAttribute = ({ itemData }: { itemData: TAttributes }) => {
  if (itemData?.values?.length == 0) {
    return <p>No available values</p>;
  }
  return (
    <div>
      <h1 className="text-xl mb-7"> Total values: {itemData?.values?.length}</h1>
      <div className="grid lg:mt-12 mt-4 max-h-[500px] overflow-y-scroll thin-scrollbar grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {itemData.values.map((item) => (
          <Alert key={item?.id} message={item?.name} type="info" />
        ))}
      </div>
    </div>
  );
};

export default ViewAllAttribute;
