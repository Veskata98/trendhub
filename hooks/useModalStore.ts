import { create } from "zustand";

export type ModalType =
    | "createTrend"
    | "createPost"
    | "deleteTrend"
    | "deleteProfile"
    | "leaveTrend";

interface ModalData {
    trendName?: string;
    username?: string;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) =>
        set((prev) => ({ ...prev, isOpen: true, type, data })),
    onClose: () =>
        set((prev) => ({ ...prev, isOpen: false, type: null, data: {} })),
}));
