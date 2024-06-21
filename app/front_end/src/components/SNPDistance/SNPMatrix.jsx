import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SNPMatrixSideBar from './SNPMatrixSideBar.jsx';

const SNPMatrix = () => {
  return  (<div className='container-fluid content'>
  <Container fluid id="custom-container">
  <Row>
    <Col className="sidebar col-3">
      <SNPMatrixSideBar />
    </Col>
    <Col>

    </Col>
  </Row>
</Container>
</div>)
};
export default SNPMatrix;
