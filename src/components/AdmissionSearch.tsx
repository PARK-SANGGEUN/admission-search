import { useEffect, useState } from "react";

export default function AdmissionSearch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/filtered_data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admission Search</h1>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <strong>{item.university} - {item.department}</strong><br />
          지역: {item.region}, 전형: {item.admissionType}<br />
          2025 내신: {item.grade2025}, 경쟁률: {item.competition2025}
        </div>
      ))}
    </div>
  );
}
