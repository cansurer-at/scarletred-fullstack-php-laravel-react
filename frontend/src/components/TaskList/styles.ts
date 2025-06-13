// src/components/TaskListStyles.ts
import styled from "styled-components";

export const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  transition: all 0.3s ease;
`;

// en üst kısma ekle
 export const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

 export const Checkbox = styled.input`
  margin-right: 10px;
  transform: scale(1.3);
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

 export const Button = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff5c5c;
`;

export const EditButton = styled(Button)`
  background-color: #4caf50;
`;