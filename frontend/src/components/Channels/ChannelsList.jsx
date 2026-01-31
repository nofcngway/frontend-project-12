import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelItem from './ChannelItem'
import AddChannelModal from '../Modals/AddChannelModal.jsx'
import RemoveChannelModal from '../Modals/RemoveChannelModal.jsx'
import EditChannelModal from '../Modals/EditChannelModal.jsx'
import { useTranslation } from 'react-i18next'

const ChannelsList = () => {
  const channels = useSelector(state => state.chat.channels)
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null })
  const { t } = useTranslation()

  const handleOpenModal = (type, channel = null) => setModalInfo({ type, channel })
  const handleCloseModal = () => setModalInfo({ type: null, channel: null })

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => handleOpenModal('add')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>

      </div>

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map(channel => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            onOpenModal={handleOpenModal}
          />
        ))}
      </ul>
      <AddChannelModal show={modalInfo.type === 'add'} onHide={handleCloseModal} />
      {modalInfo.type === 'remove' && (
        <RemoveChannelModal
          show={true}
          onHide={handleCloseModal}
          channelId={modalInfo.channel?.id}
        />
      )}
      {modalInfo.type === 'rename' && (
        <EditChannelModal
          show={true}
          onHide={handleCloseModal}
          channel={modalInfo.channel}
        />
      )}
    </div>
  )
}

export default ChannelsList
