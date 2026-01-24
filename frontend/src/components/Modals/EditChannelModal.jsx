import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { renameChannel } from '../../store/slices/chatSlice.js';
import { useDispatch, useSelector } from "react-redux";
import { channelSchema } from "../../schemas/validationSchema.js";
import { editChannel } from "../../api/channels.js";
import { useEffect, useRef } from 'react';

const EditChannelModal = ({ show, onHide, channel }) => {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.chat.channels);
    const channelNames = channels
        .filter(c => c.id !== channel?.id)
        .map((channel) => channel.name);

    const inputRef = useRef(null);

    useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.select();
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={{ name: channel?.name || '' }}
                enableReinitialize={true}
                validationSchema={channelSchema(channelNames)}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await editChannel(channel.id, { name: values.name });

                        dispatch(renameChannel({
                            id: channel.id,
                            name: values.name,
                        }));

                        onHide();
                    } catch (err) {
                        console.log(err);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleSubmit, handleChange, values, isSubmitting, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="name">
                                <Form.Label visuallyHidden>Название канала</Form.Label>
                                <Form.Control
                                    ref={inputRef}
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && !!errors.name}
                                    autoFocus
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {String(errors.name)}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Отменить
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Отправить
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default EditChannelModal;
