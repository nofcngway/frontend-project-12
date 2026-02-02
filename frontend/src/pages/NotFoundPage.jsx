import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <Container fluid className="d-flex flex-grow-1 align-items-center justify-content-center bg-light">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <Card className="text-center shadow-sm rounded-4">
            <Card.Body className="p-5">
              <div className="display-1 fw-bold text-primary mb-3">404</div>
              <h2 className="mb-4 text-secondary">{t('errors.notFound')}</h2>
              <p className="lead text-muted mb-4">
                {t('errors.notFoundMessage')}
                {' '}
                <Link to="/">
                  {t('errors.homeLink')}
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage
