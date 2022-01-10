import { API_URL } from "../config/constants"; //constants.js에 있는 변수 가져오기
import 'antd/dist/antd.min.css';
import "./main.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
function MainPage(){
    const [ products, setProducts ] = useState([]);
    //비주얼 이미지 state로 관리
    const [ banners, setBanners ] = useState([]);
    //마운트될 때 1번만 부르게 useEffect함수 안에 axios.get을 작성
    //second-react에서 fetch로 불러오던 방법을 axios로 불러오게
    useEffect(()=>{
        axios.get(`${API_URL}/products/`)
        .then(function(result){ //server에 있는 findAll로 찾은 결과값들이 result에 담겨있고, 그걸 여기서 쓰는 중.
            const products = result.data.product;
            console.log(products);
            setProducts(products);
        }).catch(function(error){
            console.log(error);
        })
        //banners를 불러오는거
        axios.get(`${API_URL}/banners/`)
        .then((result)=>{
            //banners는 server.js에서 145번째줄(app.get으로 작성한 구문)에 banners:result의 banners임.
            const banner = result.data.banners;
            setBanners(banner);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])
    return(
        <div id="main">
            {/* autoplay - 자동재생 */}
            <Carousel autoplay={true} autoplaySpeed={3000} effect="fade">
                {banners.map((banner,index)=>{
                    return(
                        <div id="visual" key={index}>
                            <img src={`${API_URL}${banner.imageUrl}`} alt="최신조명"/>
                        </div>
                    );
                })}
            </Carousel>
            <div id="product" className="innerCon">
                <h1>그린 조명 최신 상품</h1>
                <div id="product-list">
                    {
                        products.map(product => {
                            return (
                                <div className="product-card" key={product.id}>
                                    <Link to={`/products/${product.id}`}>
                                    <div>
                                        <img className="product-img"
                                        src={product.imageUrl} alt="조명"/>
                                    </div>
                                    <div className="product-contents">
                                        <span>{product.name}</span>
                                        <span>{product.price}</span>
                                        <div>
                                            <img className="product-avatar" src="images/icons/avatar.png" alt="아이콘"/>
                                            <span>{product.seller}</span>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default MainPage;