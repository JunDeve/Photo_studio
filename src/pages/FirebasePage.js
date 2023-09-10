import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

function FirebasePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Firebase Realtime Database 참조 가져오기
    const database = getDatabase();
    const dataRef = ref(database, 'path/to/data');

    // 데이터 읽기
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(data);
        } else {
          console.log('데이터 없음');
        }
      })
      .catch((error) => {
        console.error('데이터 읽기 오류:', error);
      });
  }, []);

  return (
    <div>
      {/* Firebase Realtime Database에서 읽어온 데이터를 화면에 표시 */}
      {data && <p>Data: {data}</p>}
    </div>
  );
}

export default FirebasePage;
