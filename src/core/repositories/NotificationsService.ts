import ApiService from "@/core/services/ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import {
  ResponseSchema,
  Response,
  NewNotificationPayload,
  NotificationFilters,
} from "@/types/Notifications";
import { red } from "console-log-colors";
import { safeParse } from "valibot";

class Repository {
  public static async filterUsers(params: NotificationFilters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.NOTIFICATIONS_URL}/ReadUsers`,
      {
        params,
      }
    );
    const validation = safeParse(ResponseSchema, res.data);
    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res.data.data;
  }
  public static async sendNotification(newUserData: NewNotificationPayload) {
    const form = new FormData();
    form.append("Title", newUserData.title);
    form.append("EnglishTitle", newUserData.englishTitle);
    form.append("Description", newUserData.description);
    form.append("EnglishDescription", newUserData.englishDescription);
    form.append("Level", newUserData.level.toString());
    form.append("NotificationFor", newUserData.notificationFor.toString());
    form.append("NotificationType", newUserData.notificationType.toString());
    form.append("Image", newUserData.image);

    newUserData.users.forEach((id) => {
      form.append("Users", id);
    });

    return await ApiService.post<Response>(
      `${AppConstants.NOTIFICATIONS_URL}/AddUserNotifications`,
      form
    );
  }
}

export default Repository;
