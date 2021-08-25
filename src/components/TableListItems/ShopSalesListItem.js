const ShopSalesListItem = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.sales}</td>
      <td>PHP {props.revenue.toFixed(2)}</td>
    </tr>
  );
};

export default ShopSalesListItem;