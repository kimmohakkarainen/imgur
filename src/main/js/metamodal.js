import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Modal, Container, Row, Col, Button } from "react-bootstrap";

export default function Metamodal(props) {
  const show = props.data != null;
  const rivit = props.data != null ? props.data : [];
  return (
    <Modal show={show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Metadata</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          {Object.entries(rivit).map(rivi => {
            if (rivi[1] != null && (rivi[1] > 0 || rivi[1].length > 0)) {
              return (
                <Row key={rivi}>
                  <Col key={rivi[0]} xs={4}>
                    {rivi[0]}
                  </Col>
                  <Col key={rivi[1]} xs={6}>
                    {rivi[1]}
                  </Col>
                </Row>
              );
            }
          })}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onTallenna} variant="primary">
          Tallenna
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
