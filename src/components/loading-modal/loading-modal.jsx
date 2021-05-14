import React from 'react';
import { bool, string } from 'prop-types';
import { Container, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap';

const LoadingModal = ({ isLoading, message }) => {
  return (
    <Modal isOpen={isLoading}>
      <ModalHeader>Loading.....</ModalHeader>
      <ModalBody>
        <Container>
          <Row style={{ margin: '1rem' }}>
            <div className="position-relative">
              <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner color="primary">&nbsp;</Spinner>
                <span>&nbsp;{message}</span>
              </div>
            </div>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default LoadingModal;

LoadingModal.propTypes = {
  isLoading: bool.isRequired,
  message: string
};

LoadingModal.defaultProps = {
  message: 'Please wait...'
};
