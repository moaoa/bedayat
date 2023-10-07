import { Course, NewCourseData, CourseFilters } from "@/types/Courses";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class CoursesService {
  public static async getCourses(params: CourseFilters) {
    const res = await ApiService.query<ApiResponse<Course[]>>(
      `${AppConstants.COURSES_URL}/SearchCourses`,
      {
        params: {
          ...params,
        },
      }
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
  public static async toggleCourseStatus(itemId: string) {
    return await ApiService.put<ApiResponse<Course>>(
      `${AppConstants.COURSES_URL}/ActivateDeActive/${itemId}`,
      {}
    );
  }
  public static async createCourse(data: NewCourseData) {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("englishName", data.englishName);
    payload.append("description", data.description);
    payload.append("englishDescription", data.englishDescription);
    payload.append("title", data.title);
    payload.append("englishTitle", data.englishTitle);
    payload.append("author", data.author);
    payload.append("gradeSubjectId", data.gradeSubjectId);
    payload.append("logo", data.logo as Blob);
    return await ApiService.post<ApiResponse<Course>>(
      `${AppConstants.COURSES_URL}`,
      payload
    );
  }
}

export default CoursesService;
