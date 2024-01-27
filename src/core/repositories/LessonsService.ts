import {
  Lesson,
  NewLessonData,
  UploadedLessonAttachment,
  Response,
  ResponseSchema,
  LessonAttachmentSchema,
  NewLessonAttachmentData,
} from "@/types/Lessons";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import { safeParse, string } from "valibot";
import { red } from "console-log-colors";

class LessonsService {
  public static async getAttachmentLinkById(attachmentId: string) {
    const res = await ApiService.get<ApiResponse<string>>(
      `${AppConstants.lESSONS_URL}/GetAttachmentLink/${attachmentId}`
    );
    const validation = safeParse(string(), res.data.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res.data.data;
  }
  public static async getLessons(sectionId: string) {
    const res = await ApiService.get<Response>(
      `${AppConstants.lESSONS_URL}/LessonsBySectionId/${sectionId}`
    );

    const validation = safeParse(ResponseSchema, res.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
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
      //TODO: when the backend swtich this to an object you need to switch as well
       data
    );
  }
  public static async addAttachmentToLesson(params: NewLessonAttachmentData) {
    const data = new FormData();
    data.append("Attachment", params.file);
    data.append("name", params.attachmentName);
    data.append("attachmentType", params.attachmentType.toString());
    data.append("lessonId", params.lessonId);
    data.append("lessonContentType", params.mimeType);
    data.append("title", params.title);
    data.append("resolution", params.resolution);
    data.append("size", params.size.toString());

    const res = await ApiService.post<ApiResponse<UploadedLessonAttachment>>(
      `${AppConstants.lESSONS_URL}/AddAttachmentToLesson2`,
      data
    );

    const validation = safeParse(LessonAttachmentSchema, res.data.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }

    return res;
  }
}

export default LessonsService;
