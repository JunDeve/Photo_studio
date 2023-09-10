const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// 정적 파일 서빙 (React 앱의 빌드 파일을 제공하기 위해)
app.use(express.static(path.join(__dirname, 'build')));

// 모든 경로에 대해 React 앱의 인덱스 파일을 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Express 서버를 리슨
app.listen(port, () => {
  console.log(`Express 서버가 포트 ${port}에서 실행 중입니다.`);
});
