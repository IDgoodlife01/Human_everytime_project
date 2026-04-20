import React, { useState } from "react";
import * as S from "../style/CalculatorStyle"; // 스타일 컴포넌트 임포트

const CalculatorPage = () => {
  // --- 데이터 상태 (초기 6개 과목) ---
  const [subjects, setSubjects] = useState([
    { id: 1, name: "", credit: "", grade: "4.5" },
    { id: 2, name: "", credit: "", grade: "4.5" },
    { id: 3, name: "", credit: "", grade: "4.5" },
    { id: 4, name: "", credit: "", grade: "4.5" },
    { id: 5, name: "", credit: "", grade: "4.5" },
    { id: 6, name: "", credit: "", grade: "4.5" },
  ]);
  const [totalGPA, setTotalGPA] = useState("0.00");

  // --- 핸들러 함수 ---
  const handleChange = (id, field, value) => {
    setSubjects(
      subjects.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub)),
    );
  };

  const addSubject = () => {
    const newId =
      subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;
    setSubjects([
      ...subjects,
      { id: newId, name: "", credit: "", grade: "4.5" },
    ]);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((sub) => {
      const credit = parseFloat(sub.credit);
      const grade = parseFloat(sub.grade);

      if (!isNaN(credit) && credit > 0) {
        totalPoints += credit * grade;
        totalCredits += credit;
      }
    });

    const result =
      totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    setTotalGPA(result);
  };

  return (
    <S.Container>
      <S.CalculatorCard>
        <S.Title>학점 계산기</S.Title>

        <S.TableHeader>
          <span>과목명</span>
          <span>학점</span>
          <span>성적</span>
          <span>삭제</span>
        </S.TableHeader>

        <S.SubjectList>
          {subjects.map((sub) => (
            <S.SubjectRow key={sub.id}>
              <input
                type="text"
                placeholder="과목명"
                value={sub.name}
                onChange={(e) => handleChange(sub.id, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="학점"
                value={sub.credit}
                onChange={(e) => handleChange(sub.id, "credit", e.target.value)}
              />
              <select
                value={sub.grade}
                onChange={(e) => handleChange(sub.id, "grade", e.target.value)}
              >
                <option value="4.5">A+</option>
                <option value="4.0">A</option>
                <option value="3.5">B+</option>
                <option value="3.0">B</option>
                <option value="2.5">C+</option>
                <option value="2.0">C</option>
                <option value="1.5">D+</option>
                <option value="1.0">D</option>
                <option value="0">F</option>
              </select>
              <S.DelBtn onClick={() => deleteSubject(sub.id)}>삭제</S.DelBtn>
            </S.SubjectRow>
          ))}
        </S.SubjectList>

        <S.AddBtn onClick={addSubject}>+ 과목 추가</S.AddBtn>

        <S.CalcBtn onClick={calculate}>계산하기</S.CalcBtn>

        <S.ResultSection>
          총 평점
          <S.GpaDisplay>{totalGPA}</S.GpaDisplay>
        </S.ResultSection>
      </S.CalculatorCard>
    </S.Container>
  );
};

export default CalculatorPage;
