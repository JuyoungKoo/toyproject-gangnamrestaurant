import { request } from "./Api"; 
import { getRestaurantlist, getRestaurant, registRestaurant, registReview, modifyLike, sortAsc, sortLike , selectCategory} from "../modules/RestaurantModule";
import {setLike} from "../modules/LikeModule";


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
        dispatch(setLike(result.like));
    }
}

export function callRegistRestaurantAPI(restaurant) {
    
    console.log('registRestaurant api calls...');

    return async (dispatch, getState) => {
    
        const result = await request('POST', '/restaurant/', restaurant);
        console.log('registRestaurant result : ', result);
    
        dispatch(registRestaurant(result));
    }
}

export function callRegistReviewAPI(restaurant) {
    
    console.log('registReview api calls...');

    return async (dispatch, getState) => {

        const updateComment = await request('GET', `/restaurant/${restaurant.id}`);
        updateComment.detail.comments.push(restaurant.detail.comments);
        console.log(updateComment);

        const result = await request('PUT', `/restaurant/${restaurant.id}`, updateComment);
        console.log('registReview result : ', result);
    
        dispatch(registReview(result));
    }
}


export function callLikeModifyAPI(restaurant,upLike) {
    
    console.log('modifyLike api calls…');

    return async (dispatch, getState) => {

        const like = upLike ? restaurant.like - 1 : restaurant.like + 1
        const updateData = {...restaurant ,like}
        
        console.log("updateData::",updateData)


        const result = await request('PUT', `/restaurant/${restaurant.id}`, updateData);
        console.log('registReview result : ', result);
    
        dispatch(modifyLike(result));
    }
}

export function callSortAPI () {
    return async (dispatch, getState) => {
        const result = await request('GET', `/restaurant`).then(
            res=>res.sort((a,b) => {
            if(a.storetNm < b.storetNm) return -1;
            if(a.storetNm == b.storetNm) return 0;
            if(a.storetNm > b.storetNm) return 1;
            }));
        dispatch(sortAsc(result));
    }
}

export function callLikeSortAPI () {
    return async (dispatch, getState) => {
        const result = await request('GET', `/restaurant`).then(
            res=>res.sort((a,b) => {
            if(a.like > b.like) return -1;
            if(a.like == b.like) return 0;
            if(a.like < b.like) return  1;
            }));
        dispatch(sortLike(result));
    }
}

export function callSelectCategoryAPI(categoryNm) {

    console.log('SelectCategory api calls…');

    return async (dispatch, getState) => {
        const result = await request('GET', `/restaurant`).then(
            res=>res.filter(store => store.category === categoryNm));

        dispatch(selectCategory(result));
    }
}

