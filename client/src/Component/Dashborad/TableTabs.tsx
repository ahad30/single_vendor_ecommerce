import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
const TableTabs = () => {
  const data = [
    {
      label: "Newest",
      value: "newest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
  ];
  return (
    <div className="w-full lg:w-[30%] my-1 mx-auto">
      <Tabs value="html">
        <TabsHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
};

export default TableTabs;
