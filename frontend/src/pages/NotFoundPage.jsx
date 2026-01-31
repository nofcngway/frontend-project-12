import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div>
      {t('errors.notFound')}
    </div>
  )
}

export default NotFoundPage
