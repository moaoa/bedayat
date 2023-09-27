import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { LoginReponseDto, LoginRequestDto, RefreshTokenResponseDto } from "@/types/Authentication";
class AuthenticationService {
  public static async login(payload: LoginRequestDto): Promise<ApiResponse<LoginReponseDto>> {
    const result = await ApiService.post(`${AppConstants.AUTH_URL}`, {...payload});

    const data = result.data as ApiResponse<LoginReponseDto>;
    return data;
  }
  public static async refreshToken(): Promise<ApiResponse<RefreshTokenResponseDto>> {
    const result = await ApiService.post(`${AppConstants.AUTH_URL}`, {refreshToken: localStorage.getItem('refreshToken')});

    const data = result.data as ApiResponse<RefreshTokenResponseDto>;
    
    localStorage.setItem('token', data.data.accessToken);
    localStorage.setItem('refreshToken', data.data.refreshToken);
    
    return data;
  }
}

export default AuthenticationService;
