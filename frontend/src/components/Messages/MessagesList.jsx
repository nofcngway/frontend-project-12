import { useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import { useTranslation } from 'react-i18next'

const MessagesList = () => {
  const messages = useSelector(state => state.chat.messages)
  const channels = useSelector(state => state.chat.channels)
  const currentChannelId = useSelector(state => state.chat.currentChannelId)
  const { t } = useTranslation()

  const currentChannel = channels.find(ch => ch.id === currentChannelId) || {
    name: 'general',
  }
  const currentMessages = messages.filter(
    message => message.channelId === currentChannelId,
  )

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{t('messages.header', { channel: currentChannel.name })}</b>
        </p>
        <span className="text-muted">{t('messages.count', { count: currentMessages.length })}</span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </>
  )
}

export default MessagesList
