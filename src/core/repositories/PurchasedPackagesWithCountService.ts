import {
  Response,
  ResponseSchema,
  PurchasedPackageWithCountFilters,
} from "@/types/Reports/PurchasedPackagesWithCount";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
// @ts-ignore
import { safeParse } from "valibot";
// @ts-ignore
import { red } from "console-log-colors";

class PurchasedPackagesWithCountService {
  public static async getPurchasedPackagesWithCount(params: PurchasedPackageWithCountFilters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSE_PURCHASE_URL}/PurchasePackagesReport`,
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

export default PurchasedPackagesWithCountService;
