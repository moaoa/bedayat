import { Grade, NewGradeData } from "@/types/Grades";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class GradesService {
  public static async getGrades() {
    const res = await ApiService.get<ApiResponse<Grade[]>>(
      `${AppConstants.GRADES_URL}`
    );
    return res.data.data;
  }
  public static async getGradeById(gradeId: string) {
    const res = await ApiService.get<ApiResponse<Grade>>(
      `${AppConstants.GRADES_URL}`
    );
    return res.data.data;
  }
  public static async deleteGrade(gradeId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.GRADES_URL}/${gradeId}`
    );
  }
  public static async updateGrade(itemId: string, data: NewGradeData) {
    return await ApiService.put<ApiResponse<Grade>>(
      `${AppConstants.GRADES_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createGrade(data: NewGradeData) {
    return await ApiService.post<ApiResponse<Grade>>(
      `${AppConstants.GRADES_URL}`,
      {
        ...data,
      }
    );
  }
}

export default GradesService;
