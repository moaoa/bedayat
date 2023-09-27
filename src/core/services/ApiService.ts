import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import Toaster from "./Toaster";
import AuthenticationService from "./AuthenticationService";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = AppConstants.BASE_URL;
    this.setHeader();
  }

  public static setHeader(): void {
    // ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  private setInterceptor(): void {
    ApiService.vueInstance.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        console.log("error", error);

        if (error.response?.status === 401) {
          // refresh token then call api then if fails, sign out

          await AuthenticationService.refreshToken();

          axios.request(error.config).catch(async (responseError) => {
            if (responseError?.response?.status === 401) {
              localStorage.removeItem("token");
            }
          });
        }
        if (error.response?.data?.message) {
          Toaster.error(error.response?.data?.message);
        }

        return Promise.reject(error);
      }
    );
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
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static delete<T>(resource: string): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
}

export default ApiService;
