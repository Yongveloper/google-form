## 프로젝트 개요

클라썸 과제 1 - 구글 설문 조사 만들기

- 배포: https://classum-yhj-google-form.netlify.app/
  - 공개 저장소에 업로드 하면 안 된다는 주의사항이 있어서 공개 저장소 연결 없이 간편하게 배포할 수 있는 **Netlify Drop**을 이용해 배포했습니다.

## 필수 스택 외 사용 라이브러리

### MUI(Material-UI)

Material-UI는 구글의 Material Design 스타일 가이드를 따르는 컴포넌트 라이브러리로, 구글 설문 조사와 유사한 디자인을 쉽게 구현할 수 있기 때문에 선택했습니다.

### styled-components

MUI와 서로 잘 통합되어 있고, MUI 컴포넌트에 styled-components를 적용하여 커스텀 스타일링을 쉽게 할 수 있도록 styled-components를 선택하여 프로젝트를 진행하였습니다.

### react-beautiful-dnd

필수 구현 사항 중 드래그 앤 드롭을 쉽게 구현할 수 있도록 하기 위함과
다른 dnd 라이브러리에 비해 react-beautiful-dnd의 API가 직관적이어서 빠르게 적용할 수 있다고 느끼게 되어 선택했습니다.

## 기능 구현

### 필수 구현 사항 및 완료

- 설문지 제목 추가, 편집
- 설문지 설명 추가, 편집
- 질문을 추가하면 질문이 추가
  - 단답형
  - 장문형
  - 객관식 질문
  - 체크박스
  - 드롭다운
- 질문 복사 기능
- 질문 삭제 기능
- 필수 옵션 설정 기능
- 질문 및 질문의 옵션 순서 변경(DnD)
- **미리 보기** 기능
  - 제출 버튼 눌렀을 경우 사용자가 작성한 데이터를 보여 줍니다.

### 추가 구현 사항

- 브라우저 새고로침 시 질문 데이터 유지
  - `redux-persist` 활용해서 구현 했습니다.
- 양식 지우기
  - 양식 지우기 버튼 클릭시 `window.reload()`로 초기화 되도록 했습니다.

## 프로젝트 구조

```
src/
├── components/
│   ├── Answer/
│   ├── common/
│   ├── Question/
│   └── Result/
├── hooks/
├── pages/
├── store/
│   └── slices/
└── styles/
```

- `components/`: 프로젝트의 React 컴포넌트들이 위치한 폴더입니다.
  - `Answer/`: 답변(viewform 페이지)과 관련된 컴포넌트들이 위치한 폴더입니다.
  - `common/`: 공통으로 사용되는 컴포넌트들이 위치한 폴더입니다.
  - `Question/`: 질문(root 페이지)과 관련된 컴포넌트들이 위치한 폴더입니다.
  - `Result/`: 결과 페이지와 관련된 컴포넌트들이 위치한 폴더입니다.
- `hooks/`: 커스텀 훅들이 위치한 폴더입니다.
- `pages/`: 각 페이지에 대응하는 컴포넌트들이 위치한 폴더입니다.
- `store/`: Redux store와 관련된 파일들이 위치한 폴더입니다. `slices/` 하위 폴더에는 각각의 리덕스 슬라이스들이 위치해 있습니다.
- `styles/`: 스타일과 관련된 파일들이 위치한 폴더입니다. 전역 스타일, 테마 등을 정의하는 파일들이 포함되어 있습니다.

## 커밋 컨벤션

다음과 같은 커밋 컨벤션을 사용했습니다.

- `feat`: 새로운 기능을 추가할 때 사용합니다.
- `refactor`: 코드를 개선하거나 리팩토링할 때 사용합니다.
- `Add`: 새로운 패키지를 설치할 때 사용합니다.
- `fix`: 오류나 경고를 해결할 때 사용합니다.
- `style`: 기능에 변화가 없는 경우에 사용합니다. 예를 들어, 폴더 구조를 변경하거나, 스타일을 수정하는 경우입니다.
- `doc`: 문서를 수정하는 경우에 사용합니다.

## 아쉬운 점 및 개선 방향

### 렌더링 최적화

컴포넌트의 렌더링 최적화에 충분히 집중하지 못했습니다. 특히, 불필요하게 재렌더링되는 컴포넌트가 있을 수 있다고 생각합니다.
React.memo, useMemo, useCallback 등의 최적화 기법을 적용하는 것을 고려하겠습니다.

### 양식 지우기

`window.reload()`를 활용하여 양식 초기화 기능을 구현했습니다. 이 방법은 렌더링에 필요한 파일들을 다시 불러오는 과정을 포함하므로 사용자 경험(UX) 측면에서는 좋지 않다는 것을 인지하고 있습니다.

원래는 reducer를 이용하여 양식을 초기화하려고 했으나, '답변 데이터'는 초기화되지만 라디오 버튼과 체크박스의 체크 상태는 유지되는 문제가 발생했습니다. 이 문제의 원인은 라디오 버튼과 체크박스의 checked 상태를 따로 관리하지 않고, onChange 이벤트로 dispatch만 실행하고 있기 때문으로 추정하고 있습니다.

## 설치 및 실행 방법

### 설치

```
npm i
```

### 실행

```
npm run dev
```
