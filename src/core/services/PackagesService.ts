import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse, PagedResult } from "@/types/ApiResponse";
import { systemSettingsResponse } from "@/types/SystemSettings";
import {
  CourseSelection,
  GetPackagesResponseDto,
  Package,
  PackageFilter,
  PackageUpdateData,
} from "@/types/Packages/Packages";
class PackagesService {
  public static async getPackages(
    params: PackageFilter,
    pageNumber: Number,
    pageSize: Number
  ): Promise<PagedResult<GetPackagesResponseDto>> {
    const result = await ApiService.query(
      `${AppConstants.Packages_URL}/GetPackagesByGradeAndName/${params.gradeId}`,
      {
        params: {
          gradeId: params.gradeId,
          packageStatus: params.packageStatus,
          title: params.name,
          packageType: params.packageType,
          pageNumber: pageNumber,
          pageSize: pageSize
        },
      }
    );
    const data = result.data as PagedResult<GetPackagesResponseDto>;
    return data;
  }
  public static async getAllPackages(params: {
    pageNumber: number;
    pageSize: number;
  }): Promise<PagedResult<GetPackagesResponseDto>> {
    const result = await ApiService.query(
      `${AppConstants.Packages_URL}/GetAllPackages`,
      {
        params,
      }
    );
    const data = result.data as PagedResult<GetPackagesResponseDto>;
    return data;
  }
  public static async deletePackage(id: string): Promise<ApiResponse<unknown>> {
    console.log(id);
    const result = await ApiService.delete(
      `${AppConstants.Packages_URL}/RemovePackage/${id}`
    );
    const data = result.data as ApiResponse<unknown>;
    return data;
  }
  removeCourseFromPackage;
  public static async updatePackage(
    data: PackageUpdateData
  ): Promise<ApiResponse<systemSettingsResponse>> {
    const formData = new FormData();

    formData.append("packageId", data.packageId);
    formData.append("title", data.title);
    formData.append("englishTitle", data.englishTitle);
    formData.append("description", data.description);
    formData.append("englishDescription", data.englishDescription);
    formData.append("logo", data.logo as Blob);
    console.log("===========in the service ");
    console.log(formData);

    const result = await ApiService.put<ApiResponse<systemSettingsResponse>>(
      `${AppConstants.Packages_URL}/EditPackage`,
      formData
    );
    return result.data;
  }

  public static async createPackage(
    data: FormData
  ): Promise<ApiResponse<systemSettingsResponse>> {
    const result = await ApiService.post<ApiResponse<systemSettingsResponse>>(
      `${AppConstants.Packages_URL}/AddPackage`,
      data,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  }

  public static async getCoursesForPackageSelection(
    courseName: string,
    selectedGradeId: string
  ): Promise<ApiResponse<CourseSelection[]>> {
    const result = await ApiService.get(
      `${AppConstants.COURSES_URL}`,
      `SearchCoursesByGradeAndTitle/${selectedGradeId}?title=${courseName}`
    );
    const data = result.data as ApiResponse<CourseSelection[]>;
    return data;
  }

  public static async removeCourseFromPackage(
    request: any
  ): Promise<ApiResponse<unknown>> {
    const result = await ApiService.delete(
      `${AppConstants.Packages_URL}/RemoveCourseFromPackage`,
      {
        data: request,
      }
    );
    const data = result.data as ApiResponse<unknown>;
    return data;
  }

  public static async addCoursesToPackage(
    data: any
  ): Promise<ApiResponse<any>> {
    const result = await ApiService.post<ApiResponse<any>>(
      `${AppConstants.Packages_URL}/AddCourseToPackage`,
      data
    );
    return result.data;
  }
  public static async changeActiveState(
    id: string
  ): Promise<ApiResponse<Package>> {
    const result = await ApiService.put<ApiResponse<Package>>(
      `${AppConstants.Packages_URL}/ActivateDeActive/${id}`,
      {}
    );
    return result.data;
  }

  public static async getPackageById(packageDto: GetPackagesResponseDto) {
    const result = await ApiService.get(
      `${AppConstants.Packages_URL}/GetPackageById`,
      `${packageDto.id}?packageType=${packageDto.packageType}&includeSections=true&includeLessons=false&includeLessonAttachments=false&orderByRating=false&orderByCreationDate=false&indexGradeType=-1`
    );
    const data = result.data as GetPackagesResponseDto[];
    return data;
  }
}

export default PackagesService;
