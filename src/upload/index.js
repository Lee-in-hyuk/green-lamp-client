import { API_URL } from "../config/constants";
import 'antd/dist/antd.min.css';
import "./upload.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import axios from "axios";
function UploadPage(){
    //이미지 경로 상태관리 추가하기
    const [ imageUrl, setImageUrl ] = useState(null);
    //상품 등록 버튼 클릭했을 때 메인페이지로 돌아가게 하기 위한 함수
    const navigate = useNavigate();

    const onSubmit = (values) => {
        axios.post(`${API_URL}/products`,{
            name: values.name,
            description: values.description,
            seller:values.seller,
            price:parseInt(values.price), //price는 INTEGER타입이라서 숫자형 타입으로 변경
            imageUrl:`${API_URL}/`+imageUrl
        }).then((result)=>{
            console.log(result);
            navigate(-1); // 뒤로가기
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    //이미지 처리 함수
    const onChangeImage = (info) => {
        //파일이 업로드 중일 때
        if(info.file.status === 'uploading'){
            return;
        }
        //파일이 업로드 완료되었을 때
        if(info.file.status === 'done'){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    }
    return(
        <div id="upload" className="innerCon">
            <h2>상품등록하기</h2>
            {/* 일반 폼태그와 다르게 컴포넌트로 만드는 폼이라서 형태가 다름 */}
            <Form name="상품업로드" onFinish={onSubmit}>
                <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>} rules={[{required:true}]}>
                    <Upload name="image"
                        action={`${API_URL}/image`}
                        listType="picture"
                        onChange={onChangeImage}
                        showUploadList = {false} // 등록페이지에서 이미지를 불러왔을 때 이미지 아래에 showlist가 보이던걸 안 보이게 하는 프로퍼티
                        maxCount={1} // 파일 업로드할 때 최대 갯수 지정하는 프로퍼티
                    >
                        {/* '이미지가 있으면 이미지를 나타내고 없으면 이미지 업로드 해주세요'가 나타나도록 설정 */}
                        {
                            imageUrl ? (<img src={`${API_URL}/${imageUrl}`} alt="이미지" width="200"/>) :  (
                                <div id="upload-img">
                                    <img src="/images/icons/camera.png" alt="카메라"/>
                                    <span>이미지를 업로드 해주세요</span>
                                </div>)
                        }
                    </Upload>
                </Form.Item>
                {/* 폼아이템에 라벨을 주면 인풋 옆에 라벨이 생김 */}
                {/* 필수 항목을 넣어야 될 때 = rules에 required를 true로 설정 */}
                <Form.Item name="seller" label={<div className="upload-label">판매자 명</div>}
                    rules={[{ required: true, message:"판매자 이름을 입력해 주세요"}]}
                >
                    <Input placeholder="판매자 이름을 입력해주세요" className="upload-name"/>
                </Form.Item>
                {/* 폼 아이템 사이에 줄을 넣고 싶을 땐 디바이더 */}
                <Divider/>
                <Form.Item name="name" label={<div className="upload-label">제품명</div>}
                    rules={[{ required: true, message:"제품 이름을 입력해 주세요"}]}
                >
                    <Input placeholder="제품 이름을 입력해주세요" className="upload-name"/>
                </Form.Item>
                <Divider/>
                <Form.Item name="price" label={<div className="upload-label">상품가격</div>}
                    rules={[{ required: true, message:"가격을 입력해 주세요"}]}
                >
                    {/* 올라가는 단위를 지정하는 속성은 step */}
                    <InputNumber size="large" defaultValue={0} step={10000}/>
                </Form.Item>
                <Divider/>
                <Form.Item name="description" label={<div className="upload-label">상품소개</div>}>
                    <Input.TextArea
                        placeholder="상품소개를 적어주세요 (400자 까지 가능)"
                        maxLength={400}
                    />
                </Form.Item>
                <Divider/>
                <Form.Item>
                    <Button size="large" htmlType="submit">상품등록하기</Button>
                    <Button size="large" htmlType="reset">취소</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default UploadPage;