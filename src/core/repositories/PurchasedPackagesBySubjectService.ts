import {
  Response,
  ResponseSchema,
  Filters,
} from "@/types/Reports/PurchasedPackagesBySubject";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";

class PurchasedPackagesBySubjectService {
  public static async getPurchasedPackagesBySubject(params: Filters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSE_PURCHASE_URL}/PurchasedPackagesBySubjectIdAndDate`,
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

export default PurchasedPackagesBySubjectService;
