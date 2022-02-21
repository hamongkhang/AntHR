import React from 'react';
import ChangePassword from './components/ChangePassword';
import { Button } from 'react-bootstrap';

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <ChangePassword
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;