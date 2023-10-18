export type PromotionDto = {
    id: string;
    information: string;
    image: string;
    activeState: PromotionState;
    isActive: Boolean;
    createdAt: Date;
}

export enum PromotionState {
    Inactive,
    Active
}

export type Promotion = {
    id: string;
    information: string;
    image: string;
    promotionType: PromotionState;
    isActive: Boolean;
    createdAt: Date;
}

export  type AddUpdatePromotionDto = {
    information: string;
    image: File | string | null;
}



