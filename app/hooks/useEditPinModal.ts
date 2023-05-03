import { create } from "zustand";
import { IMapBoxView } from "../components/MapBox";

interface IEditPinModalStore {
  id: string;
  init: IMapBoxView;
  isOpen: boolean;
  onOpen: (id: string, init: IMapBoxView) => void;
  onClose: () => void;
}

const useEditPinModal = create<IEditPinModalStore>((set) => ({
  id: "",
  init: { latitude: 0, longitude: 0, zoom: 11 },
  isOpen: false,
  onOpen: (id: string, init: IMapBoxView) => set({ isOpen: true, id, init }),
  onClose: () => set({ isOpen: false, id: "" }),
}));

export default useEditPinModal;
