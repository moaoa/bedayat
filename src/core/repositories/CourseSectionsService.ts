import { CourseSection, NewCourseSectionData } from "@/types/CourseSection";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class CoursesService {
  public static async getCourseSections(courseId: string) {
    const res = await ApiService.get<ApiResponse<CourseSection[]>>(
      `${AppConstants.SECTIONS_URL}/SectionByCourseId/${courseId}`
    );
    return res.data.data;
  }
  public static async deleteCourseSection(sectionId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.SECTIONS_URL}/${sectionId}`
    );
  }
  public static async updateCourseSection(
    itemId: string,
    data: NewCourseSectionData
  ) {
    return await ApiService.put<ApiResponse<CourseSection>>(
      `${AppConstants.SECTIONS_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createSection(
    courseId: string,
    data: NewCourseSectionData
  ) {
    return await ApiService.post<ApiResponse<CourseSection>>(
      `${AppConstants.SECTIONS_URL}/${courseId}`,
      { ...data }
    );
  }
}

export default CoursesService;
