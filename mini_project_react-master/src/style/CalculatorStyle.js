import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const CalculatorCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.5fr;
  text-align: center;
  font-weight: bold;
  padding: 12px 0;
  background: #f8f8f8;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 14px;
`;

export const SubjectList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

export const SubjectRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.5fr;
  gap: 10px;
  margin-bottom: 10px;

  input,
  select {
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border 0.2s;

    &:focus {
      border-color: #ff4d4f;
    }
  }
`;

export const AddBtn = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px dashed #ddd;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  color: #ff4d4f;
  font-weight: bold;
  margin-bottom: 15px;

  &:hover {
    background: #fff5f5;
  }
`;

export const CalcBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: #ff4d4f;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const DelBtn = styled.button`
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  color: #ff4d4f;
  font-size: 12px;
  border-radius: 8px;

  &:hover {
    background: #ffebeb;
  }
`;

export const ResultSection = styled.div`
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px solid #f9f9f9;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const GpaDisplay = styled.span`
  margin-left: 20px;
  background: #f8f8f8;
  padding: 10px 30px;
  border-radius: 8px;
  color: #ff4d4f;
  font-size: 1.3rem;
  border: 1px solid #eee;
  min-width: 100px;
  text-align: center;
`;
