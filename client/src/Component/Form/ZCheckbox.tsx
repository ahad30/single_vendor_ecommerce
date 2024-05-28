/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Checkbox } from "antd";
// import { Controller, useFormContext } from "react-hook-form";

// type TZbox = {
//   label: string;
//   name: string;
//   value: string;
//   checked?: boolean;
// };

// const ZCheckbox = ({ value, label, name, checked }: TZbox) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <>
//           <Checkbox
//             defaultChecked={checked ? checked : false}
//             onChange={(e) => {
//               const newValue = e.target.checked
//                 ? [...(field.value || []), value]
//                 : field.value.filter((v: string) => v !== value);
//               field.onChange(newValue);
//             }}
//           >
//             {label}
//           </Checkbox>
//           {error && <small style={{ color: "red" }}>{error.message}</small>}
//         </>
//       )}
//     />
//   );
// };

// export default ZCheckbox;

import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import { useEffect, useState } from "react";

type TZbox = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  checkedAttributed: boolean;
  isSuccess: boolean;
};

const ZCheckbox = ({
  value,
  label,
  name,
  checked,
  checkedAttributed,
  isSuccess,
}: TZbox) => {
  const { control } = useFormContext();
  const { isEditModalOpen, isAddModalOpen } = useAppSelector(
    (state: RootState) => state.modal
  );
  // console.log(isAddModalOpen);
  const [sChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (!isAddModalOpen || !isEditModalOpen || isSuccess) {
      setIsChecked(false);
    }
  }, [isAddModalOpen, isEditModalOpen, isSuccess]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (e: any) => {
          sChecked ? setIsChecked(false) : setIsChecked(true);
          const isChecked = e.target.checked;
          const currentValue = Array.isArray(field.value) ? field.value : [];
          const newValue = isChecked
            ? [...currentValue, value]
            : currentValue.filter((v: string) => v !== value);
          field.onChange(newValue);
        };
        return (
          <>
            <Checkbox
              defaultChecked={checked ? checked : false}
              onChange={handleChange}
              {...(checkedAttributed ? { checked: sChecked } : {})}
            >
              {label}
            </Checkbox>
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </>
        );
      }}
    />
  );
};

export default ZCheckbox;
