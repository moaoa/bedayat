import {
  Response,
  ResponseSchema,
  Filters,
} from "@/types/Reports/PurchasedPackagesByPackage";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
import { safeParse } from "valibot";
// @ts-ignore
import { red } from "console-log-colors";

class PurchasedPackagesByPackagesService {
  public static async getPurchasedPackagesByPackages(params: Filters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSE_PURCHASE_URL}/PurchasedPackagesByPackageIdAndDate`,
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

export default PurchasedPackagesByPackagesService;
