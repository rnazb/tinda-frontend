import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import './CheckoutListItem.scss';

const CheckoutListItem = (props) => {
  return (
    <tr>
      <td>
        <Link to={`/product/${props.id}`}>
          {props.name}
        </Link>
      </td>
      <td className="update-quantity-field">
        <Button className="quantity-btn" onClick={props.onMinus}>-</Button>
        <span className="amount-display">{props.amount}</span>
        <Button className="quantity-btn" onClick={props.onAdd}>+</Button>
      </td>
      <td>PHP {props.price.toFixed(2)}</td>
      <td className="remove-item-field"><Button className="secondary-btn" onClick={props.onRemove}>Remove</Button></td>
    </tr>
  );
};

export default CheckoutListItem;