import { Course, NewCourseData } from "@/types/Courses";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class CoursesService {
  public static async getCourses() {
    const res = await ApiService.get<ApiResponse<Course[]>>(
      `${AppConstants.COURSES_URL}`
    );
    return res.data.data;
  }
  public static async deleteCourse(courseId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.COURSES_URL}/${courseId}`
    );
  }
  public static async updateCourse(itemId: string, data: NewCourseData) {
    return await ApiService.put<ApiResponse<Course>>(
      `${AppConstants.COURSES_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createCourse(data: NewCourseData) {
    return await ApiService.post<ApiResponse<Course>>(
      `${AppConstants.COURSES_URL}`,
      {
        ...data,
      }
    );
  }
}

export default CoursesService;
