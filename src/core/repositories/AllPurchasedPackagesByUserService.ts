import {
  Response,
  ResponseSchema,
  Filters,
} from "@/types/Reports/AllPurchasedPackagesByUser";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ApiService from "@/core/services/ApiService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";

class AllPurchasedPackagesByUserService {
  public static async getAllPurchasedPackagesByUser(params: Filters) {
    const res = await ApiService.query<Response>(
      `${AppConstants.COURSE_PURCHASE_URL}/${params.userId}`,
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

export default AllPurchasedPackagesByUserService;
