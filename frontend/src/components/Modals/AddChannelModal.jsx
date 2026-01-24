import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { addNewChannel, setCurrentChannel } from '../../store/slices/chatSlice.js';
import { useDispatch, useSelector } from "react-redux";
import { channelSchema } from "../../schemas/validationSchema.js";
import { addChannel } from "../../api/channels.js";

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);
  const channelNames = channels.map((channel) => channel.name);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={channelSchema(channelNames)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const data = await addChannel({ name: values.name });
            dispatch(addNewChannel({
              id: data.id,
              name: values.name,
              removable: data.removable,
            }));
            dispatch(setCurrentChannel(data.id));
            resetForm();
            onHide();
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="name">
                <Form.Label visuallyHidden>Название канала</Form.Label>
                <Form.Control
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
              <Form.Control.Feedback type="invalid">
                {String(errors.name)}
              </Form.Control.Feedback>
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

export default AddChannelModal;
