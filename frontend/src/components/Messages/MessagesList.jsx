import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

const MessagesList = () => {
    const messages = useSelector((state) => state.chat.messages);
    const channels = useSelector((state) => state.chat.channels);
    const currentChannelId = useSelector((state) => state.chat.currentChannelId);

    const currentChannel = channels.find((ch) => ch.id === currentChannelId) || {
        name: "general",
    };
    const currentMessages = messages.filter(
        (message) => message.channelId === currentChannelId
    );

    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {currentChannel.name}</b>
                </p>
                <span className="text-muted">{currentMessages.length} сообщений</span>
            </div>

            <div id="messages-box" className="chat-messages overflow-auto px-5">
                {currentMessages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </div>
        </>
    );
};

export default MessagesList;
