export type SystemSettings = {
  coinPrice: number;
  startOfYear: Date;
  endOfYear: Date;
};

export type systemSettingsResponse = {

    coinPrice: number;
    startMonth: string;
    startYear :string;
    endMonth :string;
    endYear :string;
  };

  export type AddSettingsRequestDto ={
    type: SystemSettingType;
    coinPrice: number | null;
    month: string | null;
    year: string | null;
  }



export enum SystemSettingType
{
    CoinPrice,
    StartDateOfSchool,
    EndDateOfSchool
}
