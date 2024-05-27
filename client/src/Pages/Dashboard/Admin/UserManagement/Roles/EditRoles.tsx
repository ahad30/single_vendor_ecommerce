import { FieldValues, SubmitHandler } from "react-hook-form";
import { setIsEditModalOpen } from "../../../../../Redux/Feature/Modal/modalSlice";
import { useAppDispatch } from "../../../../../Redux/hook";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditRoles = <T extends { id: string | number; [key: string]: any }>({
  itemData,
}: {
  itemData: T;
}) => {
  const dispatch = useAppDispatch();
  console.log(itemData);
  const previousPermissions = itemData?.permissions;
  if (
    Array.isArray(previousPermissions) == false ||
    previousPermissions.length == 0
  ) {
    return <p>No Previous Permission</p>;
  }
  // const [
  //   editCategory,
  //   {!
  //     isLoading: cIsloading,
  //     isError: cIsError,
  //     error: cError,
  //     isSuccess: CIsSuccess,
  //     data,
  //   },
  // ] = useUpdateCategoryMutation();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    //   const formData = new FormData();
    //   formData.append("name", data.name ? data.name : itemData.name);
    //   if (data?.image) {
    //     formData.append("image", data.image);
    //   }
    //   formData.append("_method", "PUT");
    //   editCategory({ data: formData, id: itemData.id });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };
  return <div></div>;
};

export default EditRoles;
