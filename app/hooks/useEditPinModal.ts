import { create } from "zustand";

interface IEditPinModalStore {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useEditPinModal = create<IEditPinModalStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: "" }),
}));

export default useEditPinModal;
