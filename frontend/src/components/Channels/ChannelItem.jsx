import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../store/slices/chatSlice";

const ChannelItem = ({ channel }) => {
    const dispatch = useDispatch();
    const currentChannelId = useSelector((state) => state.chat.currentChannelId);
    const isActive = channel.id === currentChannelId;

    const handleClick = () => {
        dispatch(setCurrentChannel(channel.id));
    };

    return (
        <li className="nav-item w-100">
            <Button
                type="button"
                variant={isActive ? "secondary" : ""}
                className="w-100 rounded-0 text-start"
                onClick={handleClick}
            >
                <span className="me-1">#</span>
                {channel.name}
            </Button>
        </li>
    );
};

export default ChannelItem;
