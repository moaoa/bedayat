import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import {
  LoginReponseDto,
  LoginRequestDto,
  RefreshTokenResponseDto,
} from "@/types/Authentication";
class AuthenticationService {
  public static async login(
    payload: LoginRequestDto
  ): Promise<ApiResponse<LoginReponseDto>> {
    const result = await ApiService.post(`${AppConstants.AUTH_URL}/SignIn`, {
      ...payload,
      deviceUniqueId: "string",
      deviceName: "string",
      notificationToken: "string",
    });

    const data = result.data as ApiResponse<LoginReponseDto>;
    return data;
  }

  public static async sendConfirmationCode(
    email: string
  ): Promise<ApiResponse<RefreshTokenResponseDto>> {
    const result = await ApiService.put(
      `${AppConstants.AUTH_URL}/SendConfirmationCode`,
      {
        email,
      }
    );

    const data = result.data as ApiResponse<RefreshTokenResponseDto>;

    return data;
  }
  public static async cofirmOtp(
    email: string,
    otp: string
  ): Promise<ApiResponse<RefreshTokenResponseDto>> {
    const result = await ApiService.put(`${AppConstants.AUTH_URL}/Confirm`, {
      email,
      otpCode: otp,
    });

    const data = result.data as ApiResponse<RefreshTokenResponseDto>;

    return data;
  }
  public static async refreshToken(): Promise<
    ApiResponse<RefreshTokenResponseDto>
  > {
    const result = await ApiService.post(`${AppConstants.AUTH_URL}`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    const data = result.data as ApiResponse<RefreshTokenResponseDto>;

    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    return data;
  }
  public static async logout(refreshToken: string): Promise<unknown> {
    const result = await ApiService.post(`${AppConstants.AUTH_URL}/Logout`, {
      refreshToken,
    });

    return result;
  }
}

export default AuthenticationService;
