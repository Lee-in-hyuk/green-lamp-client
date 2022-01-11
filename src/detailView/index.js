//삭제하기도 다 했다고오...
import { API_URL } from "../config/constants"; // constants.js에 있는 변수 가져오기
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.scss";
function ProductView(){
    const [ product, setProduct ] = useState(null);
    const param = useParams();
    const navigate = useNavigate();
    const { id } = param;
    useEffect(()=>{
        axios.get(
            //server.js에서 findOne get방식으로 찾은 id를 아래 ${id}에 넣음.
            `${API_URL}/products/${id}`
        ).then(function(result){
            //server에서 그렇게 찾은 값을 setProduct로 최신화 시켜서 product에 담아주고, 그 값을 아래 항목들에 뿌려줌.
            setProduct(result.data.product);
            console.log(result.data);
        })
        .catch(function(error){
            console.log(error);
        })
    },[])
    //삭제하기
    const productDel = () =>{
        console.log('aaaaaa');
        axios.delete(`${API_URL}/products/${id}`)
        .then(function(result){
            console.log("삭제되었습니다.");
            navigate(-1);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    if(product == null){
        return <div>상품 정보를 받고 있습니다....</div>
    }
    return(
        <div className="innerCon" id="detail">
            <h1>{product.name}</h1>
            <div id="image-box">
                <img src={product.imageUrl} alt="제품"/>
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="아이콘"/>
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.createdAt}</div>
                <div>{product.description}</div>
            </div>
            <div className="btn">
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    );
}
export default ProductView;