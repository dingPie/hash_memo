import { IHash } from "../../HashMemo"

type TypeAction = 
  | { type: 'setNotice', data:IHash }

if (!localStorage.getItem('notice')) {
  localStorage.setItem('notice', JSON.stringify(
    { id: 10, hash: '사용법', content: '공지기능은 한가지만 지정 가능하며, 클릭시 해당 자세히보기로 이동합니다.' }
))}




let noticeData = JSON.parse( localStorage.getItem('notice')! )
const notice = ( state:IHash = noticeData, action:TypeAction ) => {

  switch (action.type) {

    case 'setNotice':
      let newNotice = action.data
      localStorage.setItem('notice', JSON.stringify(newNotice) )
      noticeData = JSON.parse( localStorage.getItem('notice')! )
      return newNotice
    // ㅇㅋ 이거 저장하면 된다 이제!
    
    default:
      return state
  }
}

export default notice