import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { removeChannel as removeChannelAction } from '../../store/slices/chatSlice.js';
import { removeChannel } from "../../api/channels.js";
import { useState } from 'react';

const RemoveChannelModal = ({ show, onHide, channelId }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async () => {
        setIsSubmitting(true);
        try {
            await removeChannel(channelId);
            dispatch(removeChannelAction(channelId));
            onHide();
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="lead">Уверены?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
                    Отменить
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                >
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveChannelModal;
