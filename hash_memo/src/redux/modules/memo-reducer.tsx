import Data from '../../Data'
import { IHash } from '../../HashMemo';
import { defaultValue } from '../../HashMemo';

// 초기값 실행
if (!localStorage.getItem('local')) { 
  localStorage.setItem('local', JSON.stringify(Data))
} 
let jsonData = JSON.parse(localStorage.getItem('local')!); // data에 넣을 변수

const saveAndLoad = (list :IHash[]) => {
  localStorage.setItem('local', JSON.stringify(list)) //새로 업데이트 한 값을 저장해주고
}

const setColor = (state: IHash[], hash :string ): IHash => {
  let value :IHash = state.filter( v => v.hash === hash )[0] // hash는 바꾸는 값. 만약에 새로 바꾸는 hash가 유일하다면, undefined 반환
  if(!value) value = defaultValue
  return value
}

type TypeAction =
  | { type: 'addMemo'; data:IHash }
  | { type: 'deleteMemo'; data:IHash }
  | { type: 'editMemo'; index: number; data:IHash }
  | { type: 'editHash'; targetHash: string ;newHash: string }
  | { type: 'changeColor'; targetHash: string; color: string }
  | { type: 'deleteLists', data: IHash[] }


const reducer = ( state = jsonData, action: TypeAction) => { // 액션 함수.
  switch (action.type) {
    
    // list, detail에서 메모 추가
    case 'addMemo':
      let hashValue :string | undefined = action.data.hash;
      if (hashValue) if (hashValue.includes('\/')) hashValue = hashValue.replace(/\//g, ", " ) // 정규표현식으로 슬래시를 ,으로 바꿔줌
      if (hashValue === '') hashValue = undefined // 빈 값이면 undefined 처리
      let addMemeList :IHash[] = [...state, { id: Date.now(), hash: hashValue, content: action.data.content, color: setColor(state, action.data.hash).color }] // 여길 state 로 가져와야 값들이 업데이트된다 ㅇㅇ
      saveAndLoad(addMemeList )
      return addMemeList // 위에서 jsonData 가져와서, 사실 이거 안해줘도 댐

    //list, detail에서 메모 제거
    case 'deleteMemo':
      let deleteMemoList = state.filter( (v:IHash) => v.id !== action.data.id ) // 없앨 값만 빠진 리스트 구성  | && v.content !== action.data.content 이거 붙이면 안됨.
      saveAndLoad(deleteMemoList)
      return deleteMemoList

    // list, detail에서 메모자체 수정
    case 'editMemo':
      let data = { id: action.data.id, hash: action.data.hash, content: action.data.content, color: setColor(state, action.data.hash).color }
      let editMemoList = state; // 값 복사
      editMemoList.splice(action.index, 1, data) // 복사한 값에서 수정한 값 넣어주고
      saveAndLoad(editMemoList)
      return editMemoList

    // detail에서 hash 수정
    case 'editHash':
      let editHashList = state.map( (v:IHash) => 
        v.hash === action.targetHash
        ? { id: v.id, hash: action.newHash, content: v.content, color: v.color } // 스타일 지정해주고
        : { id: v.id, hash: v.hash, content: v.content, color: v.color } // 아니묜 그대로
      )
      saveAndLoad(editHashList)
      return editHashList

    // 색상변경
    case 'changeColor':
      let changeColorList = state.map((v:IHash) => 
        v.hash === action.targetHash // 해당 targethash와 동일한 경우에만,
        ? { id: v.id, hash: v.hash, content: v.content, color: action.color } // 스타일 지정해주고
        : { id: v.id, hash: v.hash, content: v.content, color: v.color } // 아니묜 그대로
      )
      saveAndLoad(changeColorList)
      return changeColorList
    
    // list에서 여러개 삭제
    case 'deleteLists':
      let deleteLists = state.filter( (v:IHash) => !action.data.includes(v) ) // 받아온 dataArray를 제거
      saveAndLoad(deleteLists)
      return deleteLists

    default:
      return state
  }
}

export default reducer