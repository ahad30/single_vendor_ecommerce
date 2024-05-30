const Navbar = () => {
  return (
    <>
      <div className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center lg:order-2 sticky top-0">
          <div>
            <p>Dashboard</p>
          </div>
          {/* profile */}
          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
