import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import {
  User,
  RoleValues,
  NewUserData,
  ResponseSchema,
  Response,
} from "@/types/User";
//@ts-ignore
import { red } from "console-log-colors";
import { safeParse } from "valibot";

class UsersService {
  public static async searchTeacher(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<Response>(
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
    const validation = safeParse(ResponseSchema, res.data);
    if (!validation.success) {
      console.log(red(validation.issues));
    }
    return res.data;
  }
  public static async searchParents(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<Response>(
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
    const validation = safeParse(ResponseSchema, res.data);
    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res.data;
  }
  public static async searchChildren(
    searchBy: number,
    searchValue: string,
    userState: number,
    pageNumber?: number,
    pageSize?: number
  ) {
    const res = await ApiService.query<Response>(
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
    const validation = safeParse(ResponseSchema, res.data);
    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res.data.results;
  }
  public static async createUser(newUserData: NewUserData) {
    return await ApiService.post<Response>(`${AppConstants.USERS_URL}`, {
      ...newUserData,
    });
  }
  public static async updateUser(
    userId: string,
    newUserData: Omit<NewUserData, "email" | "password">
  ) {
    return await ApiService.put<Response>(
      `${AppConstants.USERS_URL}/Edit/${userId}`,
      {
        ...newUserData,
      }
    );
  }
  public static async getAdminsByPhone(params: {
    phoneNumber: string;
    currentPage: number;
    pageSize: number;
  }) {
    const res = await ApiService.query<Response>(
      `${AppConstants.USERS_URL}/ByPhoneNumber`,
      {
        params,
      }
    );
    const validation = safeParse(ResponseSchema, res.data);
    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async getAdminsByName(params: {
    name: string;
    currentPage: number;
    pageSize: number;
  }) {
    const res = await ApiService.query<Response>(
      `${AppConstants.USERS_URL}/ByName`,
      {
        params,
      }
    );

    const validation = safeParse(ResponseSchema, res.data);

    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async getUsersByRole(role: RoleValues) {
    const res = await ApiService.query<Response>(
      `${AppConstants.USERS_URL}/ByType`,
      {
        params: {
          roleType: role,
        },
      }
    );
    const validation = safeParse(ResponseSchema, res.data);

    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async getAdminUsers() {
    const res = await ApiService.query<Response>(
      `${AppConstants.USERS_URL}/ByType`,
      {
        params: {
          roleType: AppConstants.USER_ROLES.Admin,
        },
      }
    );
    const validation = safeParse(ResponseSchema, res.data);

    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res;
  }
  public static async getUserFamily(userId: string) {
    const res = await ApiService.query<Response>(
      `${AppConstants.FAMILY_URL}/GetFamilyOfUser/${userId}`,
      {}
    );
    const validation = safeParse(ResponseSchema, res.data);

    if (!validation.success) {
      console.log(red("issues: "), validation.issues);
    }
    return res.data.results;
  }
  public static async changeUserStatus(user: User, state: boolean) {
    return await ApiService.put<Response>(
      `${AppConstants.USERS_URL}/ActivateDeactivate`,
      {
        userId: user.id,
        state,
      }
    );
  }
}

export default UsersService;
