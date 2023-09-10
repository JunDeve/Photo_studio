import React, { useState } from 'react';
import './HomePage.css';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { getDatabase, ref as dbRef, push, update } from 'firebase/database'; // update를 가져옵니다.
import { initializeApp } from 'firebase/app';

const HomePage = () => {
  // Firebase 설정 객체
  const firebaseConfig = {
    apiKey: "AIzaSyDeIG8OUdrQ4Lpb5hdyYlQXFDKvPWesDkU",
    authDomain: "lastweeklyproject.firebaseapp.com",
    databaseURL: "https://lastweeklyproject-default-rtdb.firebaseio.com",
    projectId: "lastweeklyproject",
    storageBucket: "lastweeklyproject.appspot.com",
    messagingSenderId: "1021427333793",
    appId: "1:1021427333793:web:fc01dbff7a337bc1348ee0"
  };

  // Firebase 초기화
  const firebaseApp = initializeApp(firebaseConfig);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  // 이미지 엘리먼트를 저장하기 위한 배열
  const imageElements = [];

  // 랜덤한 이미지 15개 생성
  for (let i = 1; i <= 15; i++) {
    const imageUrl = `https://picsum.photos/300/200?random=${i}`;
    imageElements.push(
      <div key={i} className="image-container">
        <img src={imageUrl} alt={`랜덤 이미지 ${i}`} />
      </div>
    );
  }

  // 파일 선택 핸들러
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // 파일 업로드 함수
  const uploadFile = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    // Firebase Storage에 파일 업로드
    const storage = getStorage(firebaseApp);
    const storageRefInstance = storageRef(storage, 'uploads/' + selectedFile.name);
    await uploadBytes(storageRefInstance, selectedFile);

    // Firebase Storage에서 업로드한 파일의 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(storageRefInstance);

    // Firebase Realtime Database에 파일 메타데이터 저장
    const database = getDatabase(firebaseApp);
    const filesRef = dbRef(database, 'files');
    const newFileRef = push(filesRef);

    if (newFileRef) {
      const newFileKey = newFileRef.key;

      // 파일 메타데이터 저장
      const fileData = {
        name: selectedFile.name,
        url: downloadURL,
        // 추가적인 메타데이터 필드 추가 가능
      };

      // 파일 메타데이터를 Realtime Database에 저장
      const updates = {};
      updates['/files/' + newFileKey] = fileData;

      // 업데이트를 수행
      await update(dbRef(database), updates); // update 함수를 사용하여 업데이트 수행

      // 업로드 후 초기화
      setSelectedFile(null);
       // 업로드한 이미지 URL 설정
      setUploadedImageUrl(downloadURL);

      alert('파일 업로드 및 메타데이터 저장이 완료되었습니다.');
    } else {
      console.error('Failed to generate a new file key.');
      // 오류 처리를 추가할 수 있습니다.
    }
  };

  // 16번째 슬롯을 위한 빈 컨테이너 추가
  imageElements.push(
    <div key={16} className="image-container empty">
      {/* 파일 선택 input */}
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      <button onClick={uploadFile}>파일 업로드</button>
      {/* 업로드한 이미지 미리보기 */}
      {uploadedImageUrl && (
        <img src={uploadedImageUrl} alt="업로드한 이미지" className="uploaded-image" />
      )}
    </div>
  );

  return (
    <div className="home-page">
      <h1>사진관</h1>
      <div className="image-grid">{imageElements}</div>
    </div>
  );
};

export default HomePage;
