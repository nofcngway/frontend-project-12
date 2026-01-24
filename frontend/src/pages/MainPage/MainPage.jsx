import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getChannels } from "../../api/channels.js";
import { getMessages } from "../../api/messages.js";
import { setChannels, setMessages, addMessage } from "../../store/slices/chatSlice.js";
import { socket } from "../../socket.js";
import ChannelsList from "../../components/Channels/ChannelsList.jsx";
import MessagesList from "../../components/Messages/MessagesList.jsx";
import MessageForm from "../../components/Messages/MessageForm.jsx";

const MainPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    socket.connect();
    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });

    const fetchData = async () => {
      try {
        const [resChannels, resMessages] = await Promise.all([
          getChannels(),
          getMessages(),
        ]);
        dispatch(setChannels(resChannels));
        dispatch(setMessages(resMessages));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsList />
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesList />
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
