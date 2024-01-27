import { Avatar, NewAvatarData } from "@/types/Avatar";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";

import ApiService from "../services/ApiService";

class AvatarsService {
  public static async createAvatar(data: NewAvatarData) {
    const formData = new FormData();

    formData.append("avatarPath", data.avatarPath);
    formData.append("roleType", String(data.roleType));

    const result = await ApiService.post<
      ApiResponse<{
        id: string;
        avatarPath: string;
      }>
    >(`${AppConstants.AVATARS_URL}`, formData);

    return result.data.data;
  }
  public static async deleteAvatar(avatarId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.AVATARS_URL}/${avatarId}`
    );
  }
  public static async updateAvatar(avatarId: string, data: NewAvatarData) {
    return await ApiService.put<
      ApiResponse<{
        roleType: number;
        avatarPath: string;
      }>
    >(`${AppConstants.AVATARS_URL}/${avatarId}`, {
      ...data,
    });
  }

  public static async getAvatars(params: {
    roleType: number | null;
    currentPage: number;
    pageSize: number;
  }) {
    return await ApiService.query<ApiResponse<Avatar[]>>(
      `${AppConstants.AVATARS_URL}`,
      {
        params: {
          ...params,
        },
      }
    );
  }
}

export default AvatarsService;
