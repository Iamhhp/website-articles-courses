import './ToggleBtn.css';

const ToggleBtn = ({ id }) => {
  return (
    <label className='toggle-btn' htmlFor={id}>
      <input type='checkbox' name='' id={id} />
      <div className='slider'></div>
    </label>
  );
};
export default ToggleBtn;
