import Button from '../UI/Button';
import './ShopOrderListItem.styles.scss';

const ShopOrderListItem = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.quantity}</td>
      <td>PHP {props.orderValue.toFixed(2)}</td>
      <td>{props.customer}</td>
      <td>
        {
          props.status === 'Pending' ?
            <form id="fulfill-btn-field" onSubmit={props.onSubmit}>
              <Button className="primary-btn" type="submit">
                Fulfill
              </Button>
            </form>
            :
            <span>Fulfilled</span>
        }
      </td>
    </tr>
  );
};

export default ShopOrderListItem;