# Hash Memo WebApp

### 카카오톡 '나에게 보내기'를 활용하여 만든 Project입니다.

<br>

## 사용된 기술
<br>

1. React.js
<br>
SPA웹앱으로 구성되었습니다.

2. Redux / LocalStorage
<br>
LocalStorage에 저장된 정보를 Redux로 받아와서 사용합니다. <br>
각 페이지별로 같은 데이터를 활용하기 때문에, Redux를 통한 데이터 관리가 용이합니다.

3. SCSS
<br>
scss를 통해 스타일을 구성하였습니다.

4. TypeScript
<br>
기본적인 기능 개발 후, TypeScript로 개편 완료하였습니다.

5. 배포
<br>
netlify를 통해 배포되었습니다.
<br>
배포 주소:https://cocky-chandrasekhar-c007e0.netlify.app/
<br>

<br><br>

## 화면 및 기능소개

### 1. List 페이지
카카오톡 나에게 보내기 화면과 같이 구성하였습니다.
<br>
|기본 페이지|수정창 & 공지|다중삭제기능|
|----|----|----|
|<img src='https://user-images.githubusercontent.com/82368684/143402449-2c254ed0-3808-4282-81b0-cac8ea5b1b28.png' width="300px" >|<img src='https://user-images.githubusercontent.com/82368684/143402473-b9e318c4-cd4a-45c0-8b55-99ae59970889.png' width="300px" >|<img src='https://user-images.githubusercontent.com/82368684/143403859-fc46f3c8-521d-45fc-8743-6751b3a21a6c.png' width="300px" >
| 아래 +버튼 혹은 엔터시 내용 추가가 가능합니다.<br>내용 뒤에 '#'를 붙이면 HashTag가 붙으며, 추후 Grid나 Detail 페이지에 모아서 볼 수 있습니다.<br> 여러개의 '#'는 설정이 불가능하며, split으로 '#'를 인식하니 맨 앞에 #를 붙이면 오류가 납니다. | 수정창은 각 메모의 오른쪽 + 버튼을 통해 이용이 가능하며, | ㅇㅇㅇㅇ|

<br>
