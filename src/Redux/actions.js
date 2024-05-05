import { ADD_NOTIFICATION } from "@/Redux/actionTypes";

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

