import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callRegistRestaurantAPI } from '../../apis/RestaurantAPICalls';
import './RestaurantRegisForm.css';
function RestaurantRegistForm() {
    const result = useSelector(state => state.restaurantReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* 입력 값 state 저장 */
    const [registRestaurant, setRegistRestaurant] = useState(
        {
            id: 0,
            storetNm: '',
            category: '',
            address: '',
            operationHour:'',
            phone:'',
            isDelivery:'',
            like: 0,
            menu: '',
            price:'',
            detail : {
                comments: '',
                images_category: ''
            }
        }
    );
    /* 입력 값 변경 시 이벤트 핸들러 */
    const onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        /* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
        switch(name) {
            case 'comments' :
                name = 'detail';
                value = {
                    comments : [value],
                    image : registRestaurant.detail.image
                };
                break;
        }
        setRegistRestaurant(
            {
                ...registRestaurant,
                [name] : value
            }
        );
        console.log(registRestaurant );
    }
    /* 파일 첨부 시 동작하는 이벤트 핸들러 */
    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        console.log(base64);
        setRegistRestaurant(
            {
                ...registRestaurant,
                detail : {
                    comments : registRestaurant.detail.comments,
                    images_category : base64
                }
            }
        );
        console.log(registRestaurant);
    }
    /* FileReader API를 통해 input type="file"에 첨부 된 파일을 base64 인코딩 형식으로 변환 */
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
      useEffect(
        () => {
            /* 메뉴 등록 완료 확인 후 /menu로 이동 */
            if(result.regist) {
                alert('메뉴 등록');
                navigate(`/restaurant`);
            }
        },
        [result]
      );
    const onClickHandler = () => {
        /* registRestaurant에 대한 유효성 검사 후 호출 */
        dispatch(callRegistRestaurantAPI(registRestaurant));
    }
    return(
        <>
        <div className="formTable">
            <div className="form">
                <label>가맹점 이름 : </label>
                <input type="text" name="storetNm" value = { registRestaurant.storetNm } onChange={ onChangeHandler }/>
                <br/>
                <label> 카테고리 : </label>
                <select name="category" value={ registRestaurant.category } onChange={ onChangeHandler }>
                    <option>한식</option>
                    <option>일식</option>
                    <option>양식</option>
                    <option>중식</option>
                    <option>분식</option>
                </select>
                <br/>
                <label> 가맹점 주소 : </label>
                <input type="text" name="addressmenu" value={ registRestaurant.address } onChange={ onChangeHandler }/>
                <br/>
                <label> 영업 시간 :  </label>
                <input type="text" name="operationHour" value={ registRestaurant.operationHour } onChange={ onChangeHandler } placeholder="00:00 ~ 00:00"/>
                <br/>
                <label>전화번호 : </label>
                <input type="text" name="phone" value={ registRestaurant.phone } onChange={ onChangeHandler } placeholder="010-1234-5678"/>
                <br/>
                <label>메뉴 이름 : </label>
                <input type="text" name="menu" value={ registRestaurant.menu } onChange={ onChangeHandler }/>
                <br/>
                <label>메뉴 가격 :  </label>
                <input type="text" name="price" value={ registRestaurant.price } onChange={ onChangeHandler }/>
                <br/>
                <label>배달 여부 : </label>
                <select name="isDelivery" value={ registRestaurant.isDelivery } onChange={ onChangeHandler }>
                    <option>배달 가능</option>
                    <option>배달 불가</option>
                </select>
                <br/>
                <label>리뷰 : </label>
                <textarea name="comments" value={ registRestaurant.detail.comments } onChange={ onChangeHandler }></textarea>
                <br/>
                <label>사진 : </label>
                <input
                    type="file"
                    name="image"
                    accept='images/images_category/*'
                    onChange={ fileChangeHandler }/>
                <br/>
            </div>
            <button id="btn1" onClick={ onClickHandler }>가맹점 등록</button>
            
        </div>
        </>
    );
}
export default RestaurantRegistForm;