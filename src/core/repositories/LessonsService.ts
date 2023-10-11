import { Lesson, NewLessonData, LessonAttachment } from "@/types/Lessons";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class LessonsService {
  public static async getAttachmentLinkById(attachmentId: string) {
    const res = await ApiService.get<ApiResponse<Lesson[]>>(
      `${AppConstants.lESSONS_URL}/GetAttachmentLink/${attachmentId}`
    );
    return res.data.data;
  }
  public static async getLessons(sectionId: string) {
    const res = await ApiService.get<ApiResponse<Lesson[]>>(
      `${AppConstants.lESSONS_URL}/LessonsBySectionId/${sectionId}`
    );
    return res.data.data;
  }
  public static async deleteLesson(lessonId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.lESSONS_URL}/RemoveLesson/${lessonId}`
    );
  }
  public static async removeAttachmentFromLesson(
    lessonId: string,
    attachmentId: string
  ) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.lESSONS_URL}/RemoveAttachmentFromLesson/${lessonId}?lessonAttachmentId=${attachmentId}`
    );
  }
  public static async updateLesson(itemId: string, data: NewLessonData) {
    return await ApiService.put<ApiResponse<Lesson>>(
      `${AppConstants.lESSONS_URL}/EditLesson/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createNewLesson(sectionId: string, data: NewLessonData) {
    return await ApiService.post<ApiResponse<Lesson>>(
      `${AppConstants.lESSONS_URL}/AddLesson/${sectionId}`,
      //TODO: swtich this to an object
      [data] // 👈
    );
  }
  public static async addAttachmentToLesson(
    lessonId: string,
    file: File,
    attachmentType: number,
    attachmentName: string,
    size: number
  ) {
    const data = new FormData();
    data.append("Attachment", file);
    data.append("AttachmentType", attachmentType.toString());
    data.append("Name", attachmentName);
    data.append("Size", size.toString());

    return await ApiService.post<ApiResponse<LessonAttachment>>(
      `${AppConstants.lESSONS_URL}/AddAttachmentToLesson/${lessonId}`,
      data
    );
  }
}

export default LessonsService;