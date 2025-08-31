
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/filtered_data.json')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>수시모집 검색</h1>
      <ul>
        {data.slice(0, 10).map((item, idx) => (
          <li key={idx}>
            <strong>{item.university}</strong> - {item.department} ({item.region})<br/>
            2025 내신: {item.grade2025}, 경쟁률: {item.competition2025}
          </li>
        ))}
      </ul>
    </div>
  );
}
