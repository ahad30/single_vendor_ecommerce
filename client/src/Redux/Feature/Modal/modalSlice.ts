import { createSlice } from "@reduxjs/toolkit";

type TModalState = {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isViewModalOpen: boolean;
};

const initialState: TModalState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  isViewModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsEditModalOpen: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    setIsAddModalOpen: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    setIsDeleteModalOpen: (state) => {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
    },
    setIsViewModalOpen: (state) => {
      state.isViewModalOpen = !state.isViewModalOpen;
    },
  },
});
export const { setIsAddModalOpen, setIsDeleteModalOpen, setIsEditModalOpen , setIsViewModalOpen } =
  modalSlice.actions;
export default modalSlice.reducer;
