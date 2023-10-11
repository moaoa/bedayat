import { Grade, NewGradeData } from "@/types/Grades";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import {GradeSubject, NewGradeSubjectData} from "@/types/GradeSubjects";
import {AxiosRequestConfig} from "axios";
import {Form} from "vee-validate";

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
  public static async update(itemId: string, newGradeSubjectData: NewGradeSubjectData) {

      const data = new FormData();

      data.append("subjectId", newGradeSubjectData.subjectId)
      data.append("gradeId", newGradeSubjectData.gradeId )
      data.append("book", newGradeSubjectData.book as Blob)
      data.append("logo", newGradeSubjectData.logo as Blob)

    return await ApiService.put<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}/${itemId}`,

        data,
      // {
      //     headers: {
      //         Accept: "*/*",
      //             "Content-Type": "multipart/form-data",
      //     },
      // }
    );
  }
  public static async create(newGradeSubjectData: NewGradeSubjectData) {

      const data = new FormData();

      data.append("subjectId", newGradeSubjectData.subjectId)
      data.append("gradeId", newGradeSubjectData.gradeId )
      data.append("book", newGradeSubjectData.book as Blob)
      data.append("logo", newGradeSubjectData.logo as Blob)


    return await ApiService.post<ApiResponse<Grade>>(
      `${AppConstants.GRADE_SUBJECTS_URL}`,
      data ,
    );
  }
}

export default GradeSubjectsService;
