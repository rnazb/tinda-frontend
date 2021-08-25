import './Button.styles.scss';

const CustomButton = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
};

export default CustomButton;