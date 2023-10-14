
export  type PromotionDto = {
     id: string;
     information :string;
    image : string ;
    isActive : Boolean ;
    createdAt : Date ;
}

export  type Promotion = {
    id: string;
    information :string;
    image : string ;
    isActive : Boolean ;
    createdAt : Date ;
}

export  type AddUpdatePromotionDto = {

    information :string;
    image : File | string | null;
}



