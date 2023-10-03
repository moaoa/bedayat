import { Grade, NewGradeData } from "@/types/Grades";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import {GradeSubject, NewGradeSubjectData} from "@/types/GradeSubjects";
import {AxiosRequestConfig} from "axios";

class GradeSubjectsService {
  public static async getGradeSubjectByGradeId(gradeId: string) {
    return await ApiService.get<ApiResponse<GradeSubject[]>>(
        `${AppConstants.GRADE_SUBJECTS_URL}/ByGrade/${gradeId}`
    );
  }

  public static async getGradeSubjectBySubjectId(subjectId: string) {
    return await ApiService.get<ApiResponse<GradeSubject[]>>(
        `${AppConstants.GRADE_SUBJECTS_URL}/BySubject/${subjectId}`
    );
  }

  public static async delete(gradeSubjectId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.GRADE_SUBJECTS_URL}/${gradeSubjectId}`
    );
  }
  public static async update(itemId: string, data: FormData) {
    return await ApiService.put<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}/${itemId}`,
      {
        ...data,
      },
      {
          headers: {
              Accept: "*/*",
                  "Content-Type": "multipart/form-data",
          },
      }
    );
  }
  public static async create(data: FormData) {
    return await ApiService.post<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}`,
      data ,
        {
          headers: {
                    Accept: "*/*",
                    "Content-Type": "multipart/form-data",
                  },
        }
    );
  }
}

export default GradeSubjectsService;
