import { Course, NewCourseData, CourseFilters } from "@/types/Courses";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import {Package, PackageAddData, PackageFilter} from "@/types/Packages/Packages";

class CoursesService {
  public static async getCourses(params: CourseFilters) {
    const res = await ApiService.post<ApiResponse<Course[]>>(
      `${AppConstants.COURSES_URL}/SearchCourses`,
      { ...params }
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

    static async createPackage(data: PackageAddData) {
      return await ApiService.post<ApiResponse<Package>>(
          `${AppConstants.Packages_URL}`,
          {
            ...data,
          }
      );
    }

  public static async getPackages(params: PackageFilter) {
    const res = await ApiService.get<ApiResponse<Package[]>>(
        `${AppConstants.COURSES_URL}/SearchCourses/${params}\``,
    );
    return res.data.data;
  }


}

export default CoursesService;
