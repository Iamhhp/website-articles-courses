import './ToggleBtn.css';

const ToggleBtn = ({ id, changeHandler }) => {
  return (
    <label className='toggle-btn' htmlFor={id}>
      <input type='checkbox' id={id} onChange={changeHandler} />
      <div className='slider'></div>
    </label>
  );
};
export default ToggleBtn;
