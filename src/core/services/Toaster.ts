import { ElNotification, ElMessageBox } from "element-plus";
import { INotificationOptions } from "element-plus/packages/notification/src/notification.type";

class Toaster {
  static toast(option: INotificationOptions) {
    ElNotification(option);
  }
  static Success(title: string, message?: string, showClose: boolean = false) {
    this.toast({
      title: title,
      message: message,
      type: "success",
      showClose: showClose,
      customClass: "successToast",
      iconClass: "successToastIcon",
    });
  }
  static info(title: string, message?: string, showClose: boolean = false) {
    this.toast({
      title: title,
      message: message,
      type: "info",
      showClose: showClose,
      customClass: "successToast",
      iconClass: "infoToastIcon",
    });
  }

  static error(title: string, message?: string, showClose: boolean = false) {
    this.toast({
      title: title,
      message: message,
      type: "error",
      showClose: showClose,
      customClass: "successToast",
      iconClass: "errorToastIcon",
    });
  }

  static confirm(title: string, description: string) {
    return ElMessageBox.confirm(description, title, {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    });
  }
}

export type ToastOption = {
  title: string;
  message: string;
  type: string;
  showClose: boolean;
  customClass: string;
  iconClass: string;
};
export default Toaster;
