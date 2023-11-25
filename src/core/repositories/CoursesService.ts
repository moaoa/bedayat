import {
  Course,
  NewCourseData,
  CourseFilters,
  Response,
} from "@/types/Courses";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import { PackageAddData, PackageFilter } from "@/types/Packages/Packages";
import { removeEmptyStringValues } from "@/core/helpers/removeEmptyStringValues";

class CoursesService {
  public static async getCourses(params: CourseFilters) {
    const payload = removeEmptyStringValues(params);
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSES_URL}/SearchCourses`,
      {
        params: payload,
      }
    );
    return res.data.results ?? [];
  }
  public static async deleteCourse(courseId: string) {
    return await ApiService.delete<Response>(
      `${AppConstants.COURSES_URL}/${courseId}`
    );
  }
  public static async updateCourse(itemId: string, data: NewCourseData) {
    return await ApiService.put<Response>(
      `${AppConstants.COURSES_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async toggleCourseStatus(itemId: string) {
    return await ApiService.put<Response>(
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

  static async createPackage(data: PackageAddData) {
    return await ApiService.post<Response>(`${AppConstants.Packages_URL}`, {
      ...data,
    });
  }

  public static async getPackages(params: PackageFilter) {
    const res = await ApiService.get<Response>(
      `${AppConstants.COURSES_URL}/SearchCourses/${params}\``
    );
    return res.data.results;
  }
}

export default CoursesService;
