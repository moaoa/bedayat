
export interface LoginReponseDto {
  userId: string
  name: string
  imagePath: string
  accessToken: string
  expiredAt: string
  refreshToken: string
  refreshTokenExpiryTime: string
  isDisabled: boolean
  isAccepted: boolean
  createdAt: string
}

export interface LoginRequestDto {
  email: string
  password: string 
  deviceUniqueId?: string
  deviceName?: string
  notificationToken?: string
}


export interface RefreshTokenResponseDto {
  accessToken: string
  refreshToken: string
}




