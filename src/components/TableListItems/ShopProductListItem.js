import { Link } from 'react-router-dom';

const ShopProductListItem = (props) => {
  return (
    <tr>
      <td>
        <Link to={`/product/${props.id}`}>
          {props.name}
        </Link>
      </td>
      <td>{props.description}</td>
      <td>PHP {props.price.toFixed(2)}</td>
    </tr>
  );
};

export default ShopProductListItem;