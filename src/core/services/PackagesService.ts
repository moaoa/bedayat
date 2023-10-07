import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import {ApiResponse, PagedList, PagedResult} from "@/types/ApiResponse";
import { AddSettingsRequestDto, systemSettingsResponse } from "@/types/SystemSettings";
import {
    CourseSelection,
    GetPackagesResponseDto,
    Package,
    PackageAddData,
    PackageFilter, PackageUpdateData
} from "@/types/Packages/Packages";
class PackagesService {

    public static async getPackages(params : PackageFilter):Promise<PagedResult<GetPackagesResponseDto>> {
        const result =  await ApiService.get(
          `${AppConstants.COURSES_URL}`, `GetPackagesByGradeAndName/${params.gradeId}?title=${params.name}` );
          const data = result.data as PagedResult<GetPackagesResponseDto>;
        return data;
      }
    public static async deletePackage(id : string):Promise<ApiResponse<unknown>> {
        console.log(id)
        const result =  await ApiService.delete(
            `${AppConstants.Packages_URL}/RemovePackage/${id}` );
        const data = result.data as PagedResult<unknown>
        return data;
    }
    removeCourseFromPackage
  public static async updatePackage(data: FormData):Promise<ApiResponse<systemSettingsResponse>> {
    const result =  await ApiService.put<ApiResponse<systemSettingsResponse>>(
      `${AppConstants.Packages_URL}/EditPackage`, {...data},
        {
            headers: {
                Accept: "*/*",
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return result.data;
  }


    public static async createPackage(data: FormData):Promise<ApiResponse<systemSettingsResponse>> {
        const result =  await ApiService.post<ApiResponse<systemSettingsResponse>>(
            `${AppConstants.Packages_URL}/AddPackage`,
            data ,
            {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return result.data;
    }

    public static async getCoursesForPackageSelection(courseName: string, selectedGradeId: string):Promise<ApiResponse<CourseSelection[]>> {
        const result =  await ApiService.get(
            `${AppConstants.COURSES_URL}`, `SearchCoursesByGradeAndTitle/${selectedGradeId}?title=${courseName}`);
        const data = result.data as ApiResponse<CourseSelection[]>;
        return data;
    }

    public static async removeCourseFromPackage(request: any):Promise<ApiResponse<unknown>> {
        const result =  await ApiService.delete(
            `${AppConstants.Packages_URL}/RemoveCourseFromPackage`,
            {
                data: request
            });
        const data = result.data as ApiResponse<unknown>;
        return data;
    }


    public static async addCoursesToPackage(data: any):Promise<ApiResponse<any>> {
        const result =  await ApiService.post<ApiResponse<any>>(
            `${AppConstants.Packages_URL}/AddCourseToPackage`,
            data
        );
        return result.data;
    }


    public static async getPackageById(id: string) {
        const result =  await ApiService.get(
            `${AppConstants.Packages_URL}`, `/${params.gradeId}?title=${params.name}` );
        const data = result.data as PagedResult<GetPackagesResponseDto>;
        return data;
    }
}

export default PackagesService;
