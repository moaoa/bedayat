import ApiService from "./ApiService";
// import { Country } from "@/types/Countries";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { User, RoleValues, NewUserData } from "@/types/User";

class UsersService {
  public static async searchTeacher(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.USERS_URL}/SearchTeacher`,
      {
        params: {
          searchValue,
          searchBy,
          userState,
          pageNumber,
          pageSize,
        },
      }
    );
    return res.data.data;
  }
  public static async searchParent(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.FAMILY_URL}/SearchParents`,
      {
        params: {
          searchValue,
          searchBy,
          userState,
          pageNumber,
          pageSize,
        },
      }
    );
    return res.data.data;
  }
  public static async searchChildren(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.FAMILY_URL}/SearchChildren`,
      {
        params: {
          searchValue,
          searchBy,
          userState,
          pageNumber,
          pageSize,
        },
      }
    );
    return res.data.data;
  }
  public static async createUser(newUserData: NewUserData) {
    return await ApiService.post<ApiResponse<User>>(
      `${AppConstants.USERS_URL}`,
      {
        ...newUserData,
      }
    );
  }
  public static async updateUser(userId: string, newUserData: NewUserData) {
    return await ApiService.put<ApiResponse<User>>(
      `${AppConstants.USERS_URL}/Edit/${userId}`,
      {
        ...newUserData,
      }
    );
  }
  public static async getAdminsByPhone(phone: string) {
    return await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.USERS_URL}/ByPhoneNumber`,
      {
        params: {
          phoneNumber: phone,
        },
      }
    );
  }
  public static async getAdminsByName(name: string) {
    return await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.USERS_URL}/ByName`,
      {
        params: {
          name,
        },
      }
    );
  }
  public static async getUsersByRole(role: RoleValues) {
    return await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.USERS_URL}/ByType`,
      {
        params: {
          roleType: role,
        },
      }
    );
  }
  public static async getAdminUsers() {
    return await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.USERS_URL}/ByType`,
      {
        params: {
          roleType: AppConstants.USER_ROLES.Admin,
        },
      }
    );
  }
  //TODO: FIX TYPES
  public static async getUserFamily(userId: string) {
    const res = await ApiService.query<ApiResponse<User[]>>(
      `${AppConstants.FAMILY_URL}/GetFamilyOfUser/${userId}`
    );
    return res.data.data;
  }
  public static async changeUserStatus(user: User, state: boolean) {
    return await ApiService.put<ApiResponse<string>>(
      `${AppConstants.USERS_URL}/ActivateDeactivate`,
      {
        userId: user.id,
        state,
      }
    );
  }
}

export default UsersService;
