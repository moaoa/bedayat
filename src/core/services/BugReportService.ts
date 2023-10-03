import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { AddSettingsRequestDto, systemSettingsResponse } from "@/types/SystemSettings";
import {Faq, FaqCategory, NewFaqData} from "@/types/Faq";
import {BugDepartmentType, BugReport, BugStatusSearch} from "@/types/BugReports";
class BugReportService {
    public static async getBugReports(category: BugStatusSearch):Promise<ApiResponse<BugReport[]>> {
        console.log(category as number)
        const result =  await ApiService.get(
          `${AppConstants.BUGS_REPORT_URL}`, `?bugStatus=${category as number}`);

          const data = result.data as ApiResponse<BugReport[]>;
        return data;
      }

  public static async respondToBugReport(id : string, response: string):Promise<ApiResponse<BugReport>> {
    const result =  await ApiService.put<ApiResponse<BugReport>>(
      `${AppConstants.BUGS_REPORT_URL}/SolveBug/${id}?response=${response}`, {}
    );
    return result.data;
  }

    public static async assignBugToDifferentDepartment(id : string, response: BugDepartmentType):Promise<ApiResponse<BugReport>> {

        console.log(id + response)
        const result =  await ApiService.put<ApiResponse<BugReport>>(
            `${AppConstants.BUGS_REPORT_URL}/AssignToDepartment/${id}?type=${BugDepartmentType[response]}`, {}
        );
        return result.data;
    }


    public static async deleteBugReport(id: string):Promise<ApiResponse<BugReport>> {
        const result =  await ApiService.delete<ApiResponse<BugReport>>(
            `${AppConstants.BUGS_REPORT_URL}/${id}`
        );
        return result.data;
    }


}

export default BugReportService;
