import { Subject, NewSubjectData } from "@/types/Subjects";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class SubjectsService {
  public static async getSubjects() {
    const res = await ApiService.get<ApiResponse<Subject[]>>(
      `${AppConstants.SUBJECTS_URL}`,'?SubjectType=None&IncludeCourses=false&PageNumber=1&PageSize=100'
    );
    return res.data.data;
  }
  public static async deleteSubject(gradeId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.SUBJECTS_URL}/${gradeId}`
    );
  }
  public static async updateSubject(itemId: string, data: NewSubjectData) {
    return await ApiService.put<ApiResponse<Subject>>(
      `${AppConstants.SUBJECTS_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async createSubject(data: NewSubjectData) {
    return await ApiService.post<ApiResponse<Subject>>(
      `${AppConstants.SUBJECTS_URL}`,
      {
        ...data,
      }
    );
  }
}

export default SubjectsService;
