import { Grade, NewGradeData } from "@/types/Grades";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class GradesService {
  public static async deleteSubject(subjectId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.GRADE_SUBJECTS_URL}/${subjectId}`
    );
  }
  public static async updateSubject(itemId: string, data: NewGradeData) {
    return await ApiService.put<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createSubject(gradeId: string, data: NewGradeData) {
    return await ApiService.post<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}`,
      {
        gradeId,
        ...data,
      }
    );
  }
}

export default GradesService;
