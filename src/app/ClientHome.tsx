
'use client';
import { useEffect, useState } from "react";

export default function ClientHome() {
  const [data, setData] = useState([]);
  const [grade, setGrade] = useState(9.0);
  const [region, setRegion] = useState("전체");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/filtered_data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const filtered = data.filter((item) => {
    const avg = parseFloat(item.grade2025 || "9.9");
    const regionMatch = region === "전체" || item.region === region;
    const keywordMatch = item.university.includes(search) || item.department.includes(search);
    return avg <= grade && regionMatch && keywordMatch;
  });

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">🎓 수시모집 입시결과 검색</h1>

      <div className="mb-4 space-x-2">
        {["전체", "서울", "경기", "강원"].map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={\`px-3 py-1 rounded-full border \${region === r ? "bg-blue-700 text-white" : "bg-gray-100"}\`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <input
          className="border p-2 w-full rounded"
          type="text"
          placeholder="대학명 또는 학과명 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label>내신 70% 컷 이하: {grade.toFixed(1)}등급</label>
        <input
          type="range"
          min="1"
          max="9"
          step="0.1"
          value={grade}
          onChange={(e) => setGrade(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="border p-4 rounded-xl bg-white shadow">
            <h2 className="font-bold text-lg text-blue-800">
              {item.university} | {item.department}
            </h2>
            <p className="text-sm text-gray-600">{item.region} · {item.admissionType}</p>
            <table className="w-full mt-2 text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">연도</th>
                  <th className="border px-2 py-1">내신컷</th>
                  <th className="border px-2 py-1">경쟁률</th>
                </tr>
              </thead>
              <tbody>
                {["2025", "2024", "2023"].map((yr) => (
                  <tr key={yr}>
                    <td className="border px-2 py-1">{yr}</td>
                    <td className="border px-2 py-1">{item[\`grade\${yr}\`] || "-"}</td>
                    <td className="border px-2 py-1">{item[\`competition\${yr}\`] || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">조건에 맞는 학과가 없습니다.</p>
      )}
    </main>
  );
}
