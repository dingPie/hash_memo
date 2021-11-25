# Hash Memo WebApp

## 개발 개요
- 카카오톡 나에게 보내기를 모티브로 만든 메모 웹앱입니다.
- '나에게 보내기'를 활용하여 적은 메모들을 다시 확인하고 싶을 때 검색 외에는 활용이 어렵다는 부분에 착안하여, 한번 쓴 메모를 재사용하기 용이하게 만들자는 목적을 갖고 만들게 되었습니다.
- 각 메모를 '#' (Hash Tag) 를 붙여놓고, 이를 추후에 모아 보거나 수정하여 재사용 가능하게 만들었습니다.

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

| 기본 페이지 | 수정창 & 공지 | 다중삭제기능 |
|----|----|----|
|<img src='https://user-images.githubusercontent.com/82368684/143402449-2c254ed0-3808-4282-81b0-cac8ea5b1b28.png' width="300px" > | <img src='https://user-images.githubusercontent.com/82368684/143402473-b9e318c4-cd4a-45c0-8b55-99ae59970889.png' width="300px" > | <img src='https://user-images.githubusercontent.com/82368684/143403859-fc46f3c8-521d-45fc-8743-6751b3a21a6c.png' width="300px" >|
| 아래 +버튼 혹은 엔터시 내용 추가가 가능합니다.<br>내용 뒤에 '#'를 붙이면 HashTag가 붙으며, 추후 Grid나 Detail 페이지에 모아서 볼 수 있습니다.<br> 여러개의 '#'는 설정이 불가능하며, split으로 '#'를 인식하니 맨 앞에 #를 붙이면 오류가 납니다. | 수정창은 각 메모의 오른쪽 + 버튼을 통해 이용이 가능하며, 각 메뉴는 <br> 삭제, 수정, 확장, 공지 입니다. <br> 공지는 한번에 한가지만 가능하고, 공지 확장시 최대 10줄까지 표시가 됩니다. | 여러 메모를 한번에 컨트롤하는 기능이며, 현재는 '삭제'만 구현되어 있습니다. <br> 체크박스로 체크한 메모들을 한번에 삭제가 가능합니다.|

<br><br>

### 2. Grid 페이지

List 메모에서 각 HashTag를 단 메모드를 모아서 보여주는 페이지입니다. 
<br>

| 기본 페이지 | 반응형 확장 |
|---|---|
|<img src='https://user-images.githubusercontent.com/82368684/143405035-096f622c-d7f3-4d43-8fc9-997ca42f4c8d.png' width="400px"> | <img src='https://user-images.githubusercontent.com/82368684/143405113-5faad3a2-95f9-4a3e-9b98-ade1df83c341.png' width="400px"> |
| 기본 모바일페이지에서 보이는 페이지입니다. <br> 각 메모 클릭시 해당 페이지의 Detail페이지로 이동이 가능합니다. <br> 현재 아래 메뉴바들은 Grid페이지에선 사용이 불가능합니다. | PC화면에서의 페이지입니다. Display grid로 만들어졌으며, 화면 크기에따라 각 메모가 한 줄에 2, 3, 4개씩 표시됩니다.|

<br><br>

### 3. Detail 페이지
같은 HashTag가 사용된 메모들을 모아서 보여주는 페이지입니다. <br>
이 페이지에서 각 메모의 수정, 삭제와 HashTag 전체의 수정과 삭제도 가능합니다. <br>


| 기본 페이지 | 수정 페이지 | 하단 메뉴바 |
|---|---|---|
|<img src='https://user-images.githubusercontent.com/82368684/143406802-da755678-5362-4aa0-84a5-e318f916b38e.png' width="300px"> | <img src='https://user-images.githubusercontent.com/82368684/143406880-4e11e5ed-e223-4aa5-816e-ca4c125be68d.png' width="300px"> | <img src='https://user-images.githubusercontent.com/82368684/143406832-13558806-56d4-4baf-8b86-d54809b4b04a.png' width="300px"> |
| 같은 HashTag를 단 모든 메모가 보여집니다. HashTag가 없는 메모들도 한꺼번에 모아서 보여집니다. | 각 메모 클릭시 해당 메모가 수정이 가능한 textarea를 클릭 위치에 띄워줍니다. <br> 만약 수정창에서 아무 내용도 없이 수정을 누른다면, 해당 메모가 삭제됩니다. <br> HashTag 또한 수정이 가능하며, 수정시 해당 Tag는 사라지고 병합되기도 합니다. | 맨 아래 메뉴바중, 컬러 지정과 삭제가 가능합니다. <br> 해당 메뉴에서 컬러지정한 메모들은 List페이지에도 그대로 적용됩니다. <br> 삭제기능 이용시 해당 HashTag 가 붙은 메모가 전부 사라집니다. | 


<br>

## 추가 및 개선사항

<br>

- 로컬에서만 작동하기 때문에 모바일 - PC간 메모의 활용이 어렵습니다. 서버 및 로그인 구현이 필요합니다.
- 메뉴바의 추가 사항들이 필요합니다.
