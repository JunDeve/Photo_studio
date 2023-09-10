import React, { useState } from 'react';
import './ContactPage.css';
import { getDatabase, ref as dbRef, push, set } from 'firebase/database';
import { initializeApp } from "firebase/app";


const ContactPage = () => {
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Firebase Realtime Database에 데이터 저장
    const database = getDatabase(firebaseApp);
    const contactsRef = dbRef(database, 'contacts');

    // 데이터 생성
    const newContactRef = push(contactsRef);

    // 데이터 객체 생성
    const newContactData = {
      name: name,
      email: email,
      message: message
    };

    // 데이터 저장
    await set(newContactRef, newContactData);

    // 저장 후 입력 필드 초기화
    setName('');
    setEmail('');
    setMessage('');

    alert('질문이 성공적으로 저장되었습니다.');
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <h1>질문 페이지</h1>
      <h3>공지사항</h3>
      <p>안녕하세요 SW전문인재양성사업을 참여한 김준입니다.</p>
      <p>공지에 앞서 먼저 강의를 이끌어주신 김범준 강사님께 감사인사를 올립니다.</p>
      <p>좋은 강의 해주셔서 감사힙니다. 항상 건강하시고 좋은일만 가득하길 바라겠습니다.</p>
      <p>현재 파일은 weekly project 마지막 과제입니다. 간단하게 만들었기에 오류도 많고, 디자인 또한 부족하니 양해를 구합니다.</p>
      <p>ps. 안드로이드 스튜디오에서 작업을 하다 한번 날려먹고, vscode에서 재작업하였습니다.</p>
      <p>H2 DB를 사용하려했으나, 호환문제로 인하여 Firebase 를 선택하였습니다.</p>
      <p>사진관에 업로드 한 사진은 개발자가 검토 이후 반영됩니다.</p>
      <hr />
      <h3>질문을 작성해주시면 이메일로 해당사항에 대한 답변을 드리겠습니다.</h3>
      <button onClick={toggleFormVisibility}>
        {isFormVisible ? '취소' : '질문하기'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div className="form-box">
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-box">
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-box">
            <label htmlFor="message">메시지:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">작성</button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
