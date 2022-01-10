import { Link } from "react-router-dom"
function Header(){
    return(
        <header>
            <div className="innerCon">
                <h1><Link to="/">그린조명</Link></h1>
                <ul>
                    <li><Link to="/upload">상품등록하기</Link></li>
                    <li><Link to>상품보기</Link></li>
                </ul>
            </div>
        </header>
    );
}
export default Header;