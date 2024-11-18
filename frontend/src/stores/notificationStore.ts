import { create } from "zustand";

interface NotificationState {
  notificationContent: string;
  setNotificationContent: (title: string) => void;

  linkToWhere: string;
  setLinkToWhere: (link: string) => void;

  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notificationContent: "",
  setNotificationContent: (title) => set({ notificationContent: title }),

  linkToWhere: "",
  setLinkToWhere: (link) => set({ linkToWhere: link }),

  isOpen: false,
  // 알림 팝업 뜨고 난 다음 5초뒤 꺼지기
  setIsOpen: (state) => {
    set({ isOpen: state });
    setTimeout(() => set({ isOpen: false }), 5000);
  },
}));
