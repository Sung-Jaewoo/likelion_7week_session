# 종로구 실시간 대기질 조회

공공데이터포털의 `한국환경공단_에어코리아_대기오염정보` Open API를 React에서 연동한 과제입니다.

## 사용 기술

- React
- Vite
- axios
- useEffect / useState
- Tailwind CSS
- 공공데이터포털 Open API

## API 정보

- API 이름: 한국환경공단 에어코리아 대기오염정보
- 사용 기능: 측정소별 실시간 측정정보 조회
- 요청 방식: GET
- 측정소: 종로구

## 실행 방법

1. 공공데이터포털에서 `한국환경공단_에어코리아_대기오염정보` API 활용 신청을 합니다.
2. `.env` 파일에 발급받은 서비스 키를 넣습니다.

```env
VITE_PUBLIC_DATA_API_KEY=발급받은_디코딩_서비스키
```

3. 의존성을 설치하고 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

4. 브라우저에서 안내된 로컬 주소로 접속합니다.

```text
http://127.0.0.1:5173/
```


## 실행 결과 화면
<img width="2872" height="1636" alt="스크린샷 2026-05-24 045243" src="https://github.com/user-attachments/assets/d3edac7d-ea19-4ba4-834c-0433a73fd85e" />



