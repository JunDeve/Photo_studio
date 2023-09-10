import React, { useState, useEffect } from 'react';
import './BoardPage.css';
import {
  getDatabase,
  ref as dbRef,
  push,
  update,
  onValue,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';

const BoardPage = () => {
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

  const firebaseApp = initializeApp(firebaseConfig);

  const [posts, setPosts] = useState([]);

  // 새로운 게시글 입력 필드 상태
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // 선택한 게시글 상태
  const [selectedPost, setSelectedPost] = useState(null);

  // 댓글 입력 필드 상태
  const [newComment, setNewComment] = useState('');

  // "글쓰기" 버튼 클릭 시 입력 필드 표시 상태
  const [isWriting, setIsWriting] = useState(false);

  // Firebase Realtime Database에서 게시글 불러오기
  useEffect(() => {
    const database = getDatabase(firebaseApp);
    const postsRef = dbRef(database, 'posts');

    // onValue 이벤트 리스너를 사용하여 데이터베이스에서 게시글 가져오기
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // 데이터베이스에서 가져온 게시글 설정
        setPosts(Object.values(data));
      }
    });
  }, [firebaseApp]);

  // 게시글 추가 함수
  const addPost = () => {
    if (newPost.title && newPost.content) {
      // Firebase Realtime Database에 새 게시글 추가
      const database = getDatabase(firebaseApp);
      const postsRef = dbRef(database, 'posts');
      const newPostRef = push(postsRef);

      if (newPostRef) {
        const newPostKey = newPostRef.key;

        // 새 게시글 데이터 설정
        const postData = {
          id: newPostKey,
          title: newPost.title,
          content: newPost.content,
          comments: [],
        };

        // 게시글 데이터를 Realtime Database에 저장
        const updates = {};
        updates['/posts/' + newPostKey] = postData;

        // 업데이트를 수행
        update(dbRef(database), updates);

        // 입력 필드 초기화
        setNewPost({ title: '', content: '' });

        // 입력 필드 숨기기
        setIsWriting(false);
      }
    }
  };

  // 게시글 클릭 시 상세 내용 표시
  const handlePostClick = (postId) => {
    const selected = posts.find((post) => post.id === postId);
    setSelectedPost(selected);
  };

  // 댓글 추가 함수
  const addComment = () => {
    if (newComment) {
      // Firebase Realtime Database에 댓글 추가
      const database = getDatabase(firebaseApp);
      const postRef = dbRef(database, 'posts/' + selectedPost.id);

      // 기존 댓글 가져오기
      const existingComments = selectedPost.comments || [];

      // 새 댓글 추가
      const updatedComments = [...existingComments, newComment];

      // 댓글 업데이트 후 상태 업데이트
      update(postRef, { comments: updatedComments });

      // 댓글 입력 필드 초기화
      setNewComment('');
    }
  };

  return (
    <div className="board-page">
      <h1>게시판</h1>

      {/* 글 목록 표시 */}
      <h2>글 목록</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            style={{ cursor: 'pointer' }}
          >
            {post.title}
          </li>
        ))}
      </ul>

      {/* "글쓰기" 버튼 */}
      {!isWriting && (
        <button
          onClick={() => {
            setSelectedPost(null);
            setNewPost({ title: '', content: '' });
            setIsWriting(true); // 버튼 클릭 시 입력 필드 표시
          }}
        >
          글쓰기
        </button>
      )}

      {/* 글쓰기 입력란 */}
      {isWriting && (
        <div className="form-box">
          <input
            type="text"
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <hr />
          <textarea
            placeholder="내용"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{ width: '100%', height: '100px' }} // 내용 입력 박스 크기 지정
          />
          <button
            onClick={addPost}>
            등록
          </button>
        </div>
      )}
      <br />
      {/* 게시글 상세 내용 표시 */}
      {selectedPost !== null && (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <h3>댓글</h3>
          <ul>
            {selectedPost.comments && selectedPost.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>댓글 추가</button>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
