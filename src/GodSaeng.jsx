import { useEffect, useState } from "react";
import styled from "styled-components";

const GodSaeng = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [percent, setPercent] = useState("30%");
  const [doneCnt, setDoneCnt] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const onChangeText = (e) => {
    const todo = e.target.value;
    setInput(todo);
  };

  const onSubmitText = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const cancelDone = (ind) => {
    let copyArr = [...todos];
    copyArr[ind] = { ...copyArr[ind], done: false };
    setTodos(copyArr);
    setDoneCnt((prev) => prev - 1);
  };

  const onDoneTodo = (ind) => {
    let copyArr = [...todos];
    copyArr[ind] = { ...copyArr[ind], done: true };
    setTodos(copyArr);
    setDoneCnt((prev) => prev + 1);
  };

  const onDelTodo = (ind) => {
    setTodos([...todos.slice(0, ind), ...todos.slice(ind + 1, todos.length)]);
    setTotalCnt((prev) => prev - 1);
    setDoneCnt((prev) => prev - 1);
  };

  useEffect(() => {
    setTotalCnt(todos.length);
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    setPercent((doneCnt / totalCnt) * 100 + "%");
  }, [totalCnt, doneCnt]);

  return (
    <GodSaengBlock>
      <Header>
        <HeaderTitle>갓생살기</HeaderTitle>
        <HeaderChart percent={percent}></HeaderChart>
      </Header>
      <Main>
        <InputForm onSubmit={onSubmitText}>
          <Input
            value={input}
            placeholder="오늘 할 일을 적어보세요."
            onChange={onChangeText}
          />
          <Button>+</Button>
        </InputForm>
        <TodoList>
          <TodoHeader>
            <TodoCount>
              {doneCnt}/{totalCnt}
            </TodoCount>
          </TodoHeader>
          <TodoBlock>
            {todos.length > 0 &&
              todos.map((todo, i) => (
                <Todo key={todo + i} className={todo.done && "done"}>
                  {todo.done ? (
                    <>
                      <div className="todo-text" onClick={() => cancelDone(i)}>
                        {todo.text}
                      </div>
                      <button className="todo-btn" onClick={() => onDelTodo(i)}>
                        X
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="todo-text">{todo.text}</div>
                      <button
                        className="todo-btn"
                        onClick={() => onDoneTodo(i)}
                      >
                        V
                      </button>
                    </>
                  )}
                </Todo>
              ))}
          </TodoBlock>
        </TodoList>
      </Main>
    </GodSaengBlock>
  );
};

export default GodSaeng;

const GodSaengBlock = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  padding: 16px 24px 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;
const HeaderTitle = styled.h1`
  font-weight: 100;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: 0.045;
  width: 2.5em;
`;
const HeaderChart = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(props) =>
    `conic-gradient(#fff 0% ${props.percent}, #000 ${props.percent} 100%)`};
`;

const Main = styled.main`
  padding: 0 24px;
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 40px;
`;
const Input = styled.input`
  flex: 1;
  /* reset css */
  background-color: transparent;
  border: none;
  display: block;
  font-size: 20px;
  font-weight: 100;
  padding: 12px 20px;
  border-bottom: 1px solid #ffffffb3;
  color: #fff;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-bottom: 1px solid #fff;
  }
`;
const Button = styled.button`
  cursor: pointer;
  /* reset css */
  background-color: transparent;
  border: none;
  display: block;
  font-size: 40px;
  font-weight: 100;
  color: #fff;
`;

const TodoList = styled.div`
  display: block;
  margin-bottom: 60px;
`;

const TodoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  border-bottom: 1px solid #fff;
`;
const TodoCount = styled.div`
  padding: 12px 2px;
  font-size: 20px;
  letter-spacing: 0.05em;
`;
const TodoBlock = styled.div``;

const Todo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 27px 20px;
  border-bottom: 1px solid #fff;

  .todo-text {
    font-weight: 100;
    font-size: 20px;
  }

  .todo-btn {
    background-color: transparent;
    color: #fff;
    border: none;
    font-size: 20px;
  }

  &.done {
    background-color: #ffffff90;
    color: #000;

    .todo-btn {
      color: #000;
    }
  }
`;
