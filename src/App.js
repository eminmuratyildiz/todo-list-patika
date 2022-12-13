import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/todoSlice";

function App() {
  const { data } = useSelector((state) => state.todos);
  const { colors } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(0);
  const [newTodo, setNewTodo] = useState("");
  const [searchedTodo, setSearchedTodo] = useState("");
  const changeActive = (key) => {
    setActiveKey(key);
  };
  const changeTodo = (e) => {
    setNewTodo(e.target.value);
  };
  const add = () => {
    dispatch(addTodo({ newTodo, activeKey }));
    setNewTodo("");
  };
  const changeSearch = (e) => {
    setSearchedTodo(e.target.value);
  };
  const filteredTodo = data.filter((item) =>
    item.todo
      .toLocaleLowerCase("tr")
      .includes(searchedTodo.toLocaleLowerCase("tr"))
  );
  return (
    <div className="w-full h-screen bg-[#e7e7e7] p-10 flex flex-col items-center">
      <h1 className="text-[#747474] font-bold text-[20px] mb-4">NotesApp</h1>
      <input
        className="border-[#d0d0d0] placeholder:text-[#747474] border outline-none rounded-full w-1/5 px-4 py-1 flex items-center mb-4"
        placeholder="Search..."
        value={searchedTodo}
        onChange={changeSearch}
      />
      <div className="w-11/12 h-60 bg-white shadow-md mb-4">
        <textarea
          className="w-full h-40 p-6 resize-none outline-none"
          placeholder="Enter your note here..."
          value={newTodo}
          onChange={changeTodo}
          autoFocus={true}
        />
        <div className="w-full h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-x-1">
            {colors.map((item, key) => (
              <div
                onClick={() => changeActive(key)}
                key={key}
                style={{ backgroundColor: item }}
                className="rounded-full w-10 h-10 cursor-pointer flex items-center justify-center"
              >
                {activeKey === key ? "✓" : null}
              </div>
            ))}
          </div>
          <button
            onClick={add}
            className="bg-green-500 border border-green-700 text-white px-9 py-2 rounded-3xl disabled:opacity-70 cursor-pointer"
            disabled={newTodo===""?true:false}
          >
            ADD
          </button>
        </div>
      </div>
      <div className="w-[95%] grid grid-cols-3 gap-2">
        {filteredTodo.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: item.bg }}
            className="h-12 rounded flex items-center px-4 text-lg"
          >
            {item.todo}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
