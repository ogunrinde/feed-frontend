export interface IngredientProp {
    name: string;
    class: string;
    crude_protein: number;
    dry_matter: number;
    ether_extract: number;
    ash:number;
    nitrogen_free_extract: number;
}

export interface IIng {
    id?: number;
    name?: string;
    crude_protein?: number;
    quantity?: number;
    dry_matter: number;
    ether_extract: number;
    ash:number;
    nfe: number;
}
export interface IResponse {
    name: string;
    crude_protein: number;
    crude_fibre: number;
    ether_extract: number;
    nfe: number;
    ash: number;
    dry_matter: number;
    quantity: number;
    percentage: number;
    quantity_required: number;
    message: string;
    meet_requirement: boolean;
}

export interface IFullIng {
    name: string;
    class: string;
    dry_matter: number;
    crude_protein: number;
    ether_extract: number;
    crude_fibre: number;
    nitrogen_free_extract:number;
    ash:number;
    energy:number;
    calcium:number;
    phosphorus:number;
}

export interface Idata {
    ingredient_number: number;
    animal_type : string;
    diet: string;
    class: string;
    quantity: number;
    prediction:number;
    body_weight: number;
    age:number;
    ingredient1: IIng | null;
    ingredient2: IIng | null;
    ingredient3?: IIng | null;
    ingredient4?: IIng | null;
    ingredient5?: IIng | null;
}
  export type IngContextType = {
    ingredientList: IIng[];
    prediction: number;
    fetchedIngredients: IFullIng[];
    postData: Idata;
    FormulationResult: any;
    openDialog: boolean;
    updateDialogStatus: ( status: boolean ) => void;
    updatePostData: ( value: string | number | IIng, name: string ) => void;
    addIngredient: (ing: IIng ) => void;
    updateIngredient: (id: number) => void;
    APIFetchIngredients: () => void;
    formulateFeed: () => void;
    handlePredict: () => void;
    updatePredictionModal: ( status: boolean ) => void;
    predictionModalOpen: boolean;
};




