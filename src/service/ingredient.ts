import http from '../http/http-common';
import { Idata, IngredientProp } from '../type/ingredient';

const get = () => {
    return http.get<IngredientProp>(`/feed`);
};

const post = (data: Idata) => {
  return http.post<any>("/feed", data);
}

const apiService = { get, post };
export default apiService;