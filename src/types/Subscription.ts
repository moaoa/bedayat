//
// export type NewSubscriptionData = {
//   title: string;
//   englishTitle: string;
//   gradeTypeIndex: number;
// };

import {GetPackagesResponseDto} from "@/types/Packages/Packages";

export interface NewSubscriptionData {
  title: string
  englishTitle: string
  subTitle: string
  englishSubTitle: string
  details: string
  englishDetails: string
  subscriptionSettingId: string
  packageId: string
  price: number
  fakePrice: number
  discount: number
}


export interface Subscription {
  id: string
  title: string
  englishTitle: string
  subTitle: string
  englishSubTitle: string
  details: string
  englishDetails: string
  period: number
  courseId: string
  price: number
  discount: number
  package: GetPackagesResponseDto
}