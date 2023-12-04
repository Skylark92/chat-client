import { useEffect, useState } from "react";
import "./App.css";
import socket from './server';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomListPage from './pages/RoomListPage/RoomListPage';
import ChatPage from './pages/Chatpage/Chatpage';

function App() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on('rooms', (res) => {
      setRooms(res);
    })
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt('당신의 이름을 입력하세요');

    socket.emit('login', userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<RoomListPage rooms={rooms} />} />
        <Route exact path='/room/:id' element={<ChatPage user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
