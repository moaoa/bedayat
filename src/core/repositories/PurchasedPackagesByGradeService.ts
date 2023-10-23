import {
  Response,
  ResponseSchema,
  PurchasedPackageByGradeFilters,
} from "@/types/Reports/PurchasedPackagesByGrade";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
// @ts-ignore
import { safeParse } from "valibot";
// @ts-ignore
import { red } from "console-log-colors";

class PurchasedPackagesByGradeService {
  public static async getPurchasedPackagesByGrade(params: PurchasedPackageByGradeFilters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSE_PURCHASE_URL}/PurchasedPackagesByGradeIdAndDate`,
      {
        params,
      }
    );
    const validation = safeParse(ResponseSchema, res.data);
    if (validation.success === false) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
}

export default PurchasedPackagesByGradeService;
