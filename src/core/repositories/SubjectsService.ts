import {Subject, NewSubjectData, SubjectType} from "@/types/Subjects";
import {AppConstants} from "@/core/constants/ApplicationsConstants";
import {ApiResponse, PagedResult} from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import {UnwrapRef} from "vue";

class SubjectsService {
    public static async getSubjects(selectedSubjectType: SubjectType | null) {
        const res = await ApiService.get<PagedResult<Subject>>(
            `${AppConstants.SUBJECTS_URL}`, `?SubjectType=${selectedSubjectType == null ? '' : selectedSubjectType}&IncludeCourses=false&PageNumber=1&PageSize=100`
        );
        return res.data.results;
    }

    public static async deleteSubject(gradeId: string) {
        return await ApiService.delete<ApiResponse<unknown>>(
            `${AppConstants.SUBJECTS_URL}/${gradeId}`
        );
    }

    public static async updateSubject(itemId: string, data: FormData) {
        return await ApiService.put<ApiResponse<Subject>>(
            `${AppConstants.SUBJECTS_URL}/${itemId}`,
            {data},
            {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "multipart/form-data",
                },

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
