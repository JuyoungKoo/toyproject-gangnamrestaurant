import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { callGetRestaurantAPI,callLikeModifyAPI } from '../../apis/RestaurantAPICalls';
import { increase } from '../../modules/LikeModule';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import "./Restaurant.css";


function Restaurant({ id }) {

    const result = useSelector(state => state.restaurantReducer);
    const restaurant = result.restaurant;
    const dispatch = useDispatch();
    const like = useSelector(state => state.likeReducer);
    const [upLike,setUpLike] = useState(false);

    


    useEffect(
        () => {
            /* restaurant 호출 API */
            dispatch(callGetRestaurantAPI(id));
        },
        [like]
    );

    function onClickHandler(){
        setUpLike(!upLike);
        dispatch(callLikeModifyAPI(restaurant,upLike));
        dispatch(increase());
        
    }

    return (
        restaurant && (
            <>
                <div className='detailPage'>
                    <div className='detailRestaurantNm'><h3>{ restaurant.storetNm }</h3></div>
                    <h3>카테고리 : { restaurant.category }</h3>
                        <button  className='detailLike'onClick={ onClickHandler }>
                            {upLike ? <FcLike/>: <FcLikePlaceholder/>}
                            </button> { like }
                    <h3>리뷰갯수 : { (restaurant.detail.comments).length }</h3>
                    <div className='detailInfo'>
                        <h3>영업시간 : { restaurant.operationHour }</h3>
                        <h3>전화번호 : { restaurant.phone}</h3>
                        <h3>대표메뉴 : { `${restaurant.menu} : ${restaurant.price}`}</h3>
                        <h3>배달가능 : { (restaurant.isDelivery == 'Y')? '배달가능':'배달불가'}</h3>
                    </div>
                    <h3>리뷰 : { (restaurant.detail.comments).map((value,index) => (<li key={index}>{value}</li>))}</h3>
                    <img src={ restaurant.detail.images_category} style={ { width: 500, height: 500 } } alt={ restaurant.storetNm }/>
                </div>
            </>
        )
    );
}
export default Restaurant;