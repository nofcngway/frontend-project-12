import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getChannels } from "../../api/channels.js";
import { getMessages } from "../../api/messages.js";
import { setChannels, setMessages } from "../../store/slices/chatSlice.js";

const MainPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const channels = useSelector(state => state.chat.channels);
  const messages = useSelector(state => state.chat.messages);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const [resChannels, resMessages] = await Promise.all([getChannels(), getMessages()]);
        dispatch(setChannels(resChannels));
        dispatch(setMessages(resMessages));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          {channels?.map((channel) => (
            <p key={channel.id}>{channel.name}</p>
          ))}
        </div>
        <div className="col p-0 h-100">
          {messages?.map((message) => (
            <p key={message.id}>{message.body}</p>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default MainPage;
