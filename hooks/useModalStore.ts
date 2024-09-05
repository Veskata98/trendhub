import { create } from 'zustand';

export type ModalType = 'createTrend';

export type ModalStore = {
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set((prev) => ({ ...prev, isOpen: true, type })),
    onClose: () => set((prev) => ({ ...prev, isOpen: false, type: null })),
}));
