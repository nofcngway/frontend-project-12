import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { removeChannel as removeChannelAction } from '../../store/slices/chatSlice.js'
import { removeChannel } from '../../api/channels.js'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannelModal = ({ show, onHide, channelId }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useTranslation()

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await removeChannel(channelId)
      dispatch(removeChannelAction(channelId))

      onHide()

      toast.success(t('channels.removed'))
    }
    catch (err) {
      if (err.response) {
        toast.error(t('errors.unknown'))
      }
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.remove')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('channels.confirmRemove')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          {t('channels.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          {t('channels.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
