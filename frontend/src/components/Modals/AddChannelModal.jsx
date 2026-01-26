import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { addNewChannel, setCurrentChannel } from '../../store/slices/chatSlice.js';
import { useDispatch, useSelector } from "react-redux";
import { channelSchema } from "../../schemas/validationSchema.js";
import { addChannel } from "../../api/channels.js";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);
  const channelNames = channels.map((channel) => channel.name);
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.add')}</Modal.Title>
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

            toast.success(t('channels.created'));
          } catch (err) {
            if (err.response) {
              toast.error(t('errors.unknown'));
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, handleChange, isSubmitting, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="name">
                <Form.Label visuallyHidden>{t('channels.channelName')}</Form.Label>
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
                  {t(errors.name)}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t('channels.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {t('channels.submit')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
