import { Card } from "react-bootstrap";

const ProductItem = (props) => {

  return (
    <>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="mb-0 pb-0">
          {props.name}
        </Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text className="my-2">
          PHP {props.price}
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default ProductItem;