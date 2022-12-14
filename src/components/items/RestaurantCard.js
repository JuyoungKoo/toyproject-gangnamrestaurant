import { Link } from  'react-router-dom';
import { FcLike } from "react-icons/fc";
import { TbMessage } from "react-icons/tb";

function RestaurantCard({ restaurant }) {

    return (
        <Link to={ `/restaurant/${ restaurant.id }` }>
            <div className="menuItem">
                <h3>{ restaurant.storetNm }</h3>
                <h3><FcLike/> {restaurant.like}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TbMessage/> {(restaurant.detail.comments).length}</h3>
                <img src={ restaurant.detail.images_category} style={ { width: 300, height: 300 } } alt={ restaurant.storetNm }/>
            </div>
        </Link>
    );
}

export default RestaurantCard;