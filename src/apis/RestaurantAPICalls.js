import { request } from "./Api"; 
import { getRestaurantlist, getRestaurant, registRestaurant} from "../modules/RestaurantModule";
import { getDefaultNormalizer } from "@testing-library/react";

export function callGetRestaurantListAPI() {
    
    console.log('getRestaurantList api calls...');
    
    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        
        /* Api의 axios 처리 참조  */
        const result = await request('GET', '/restaurant');
        console.log('getRestaurantList result : ', result);
        
        /* action 생성 함수에 결과 전달하며 dispatch 호출 */
        dispatch(getRestaurantlist(result));
    }
}

export function callGetRestaurantAPI(id) {
    
    console.log('getRestaurant api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('GET', `/restaurant/${id}`);
        console.log('getRestaurant result : ', result);
    
        dispatch(getRestaurant(result));
    }
}

export function callRegistRestaurantAPI(restaurant) {
    
    console.log('registRestaurant api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('POST', '/restaurant/regist', restaurant);
        console.log('registRestaurant result : ', result);
    
        dispatch(registRestaurant(result));
    }
}

// export function callRegistReviewAPI(restaurant) {
    
//     console.log('registReview api calls...');

    return async (dispatch, getState) => {

        const getData = await request('GET', `/restaurant/${restaurant.id}`);
        getData.detail.comments.push(restaurant.detail.comments);
        console.log(getData);

        const result = await request('PUT', `/restaurant/${restaurant.id}`, getData);
        console.log('registReview result : ', result);
    
        dispatch(registReview(result));
    }
}

export function callLikeModifyAPI(restaurant) {
    
    console.log('registReview api calls...');

    return async (dispatch, getState) => {

        const updateLike = await request('GET', `/restaurant/${restaurant.id}`);
        updateLike.like(restaurant.like + 1);
        console.log(updateLike);

        const result = await request('PUT', `/restaurant/${restaurant.id}`, updateLike);
        console.log('registReview result : ', result);
>>>>>>> 51cb7c2804df82b1e720af527165ba8e05b6b018
    
//         const result = await request('POST', '/restaurant/', restaurant);
//         console.log('registReview result : ', result);
    
//         dispatch(registReview(result));
//     }
// }

