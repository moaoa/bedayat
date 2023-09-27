import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = AppConstants.BASE_URL;
    this.setHeader();
  }

  public static setHeader(): void {
    // ApiService.vueInstance.axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${JwtService.getToken()}`;
  }

  public static query<T>(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    console.log(params);
    return ApiService.vueInstance.axios.get(resource, params).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  public static async get<T>(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error("حدث خطأ أثناء محاولة تحميل البيانات");
      });
  }

  public static post<T>(
    resource: string,
    params: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  public static update(
    resource: string,
    slug: string,
    params: Record<string, unknown>
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  public static put<T>(
    resource: string,
    params: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    console.log("llskdjflk");

    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static delete<T>(resource: string): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
}

export default ApiService;
