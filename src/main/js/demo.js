import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Figure,
  Panel,
  Card,
  Button,
  Navbar,
  Alert
} from "react-bootstrap";

import {
  fetchViral,
  openMetadataDialog,
  closeMetadataDialog,
  saveMetadataDialog
} from "./actions";
import MetaModal from "./metamodal";

function Home() {
  return <div>Home</div>;
}

class Demo extends Component {
  constructor(props) {
    super(props);

    this.showMetadata = this.showMetadata.bind(this);
    this.hideMetadata = this.hideMetadata.bind(this);
    this.saveMetadata = this.saveMetadata.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchViral());
  }

  showMetadata(event) {
    const index = event.target.getAttribute("image-id");
    const image = this.props.images.find(image => {
      if (image.id == index) {
        return image;
      }
    });
    this.props.dispatch(openMetadataDialog(image));
  }

  hideMetadata(event) {
    this.props.dispatch(closeMetadataDialog());
  }

  saveMetadata(event) {
    console.log(this.props.metadatadialog);
    this.props.dispatch(saveMetadataDialog(this.props.metadatadialog));
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>{"Imgur - koodaustesti"}</Navbar.Brand>
        </Navbar>
        <Container>
          {this.props.error != null && (
            <Alert variant="danger">{this.props.error}</Alert>
          )}
          <MetaModal
            data={this.props.metadatadialog}
            onTallenna={this.saveMetadata}
            onHide={this.hideMetadata}
          />
          <Row>
            {this.props.images.map(image => {
              const link = image.link + "/171px180px";
              return (
                <Col key={image.id} sm={12} md={6} lg={4}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Img variant="top" src={link} />
                      <Card.Title>{image.title}</Card.Title>
                      <Card.Text>{image.description}</Card.Text>
                      <Button
                        onClick={this.showMetadata}
                        image-id={image.id}
                        variant="primary"
                      >
                        Metadata
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let images = [];
  if (state != null && state.viral != null && state.viral.data != null) {
    state.viral.data.map(account => {
      if (images.length < 10 && account.images != null) {
        account.images.map(image => {
          if (images.length < 10 && image.type == "image/jpeg") {
            images.push(image);
          }
        });
      }
    });
  }

  return {
    images: images,
    metadatadialog: state.metadatadialog,
    error: state.error
  };
}

export default connect(mapStateToProps)(Demo);
