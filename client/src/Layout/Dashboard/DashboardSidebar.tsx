const items = [
  {
    key: "content",
    label: "Content",
    children: [{ key: "content_child1", label: "Content Child 1" }],
  },
  {
    key: "media",
    label: "Media",
  },
  {
    key: "settings",
    label: "Settings",
    children: [{ key: "settings_child1", label: "Settings Child 1" }],
  },
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "dashboard",
    label: "Dashboard",
    children: [{ key: "dashboard_child1", label: "Dashboard Child 1" }],
  },
];

const DashboardSidebar = () => {
  return (
    <div  className="">
      {items.map((item) => (
        <div>
          <p className="text-2xl">{item.label}</p>
          {/* {item?.children && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
