import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../store/slices/chatSlice";

const ChannelItem = ({ channel, onOpenModal }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const isActive = channel.id === currentChannelId;

  const handleClick = () => {
    dispatch(setCurrentChannel(channel.id));
  };

  if (channel.removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            variant={isActive ? "secondary" : ""}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleClick}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>

          <Dropdown.Toggle
            split
            variant={isActive ? "secondary" : ""}
            className="rounded-0"
            id={`dropdown-split-${channel.id}`}
          />

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onOpenModal('remove', channel)}>
              Удалить
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onOpenModal('rename', channel)}>
              Переименовать
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    )
  }

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
