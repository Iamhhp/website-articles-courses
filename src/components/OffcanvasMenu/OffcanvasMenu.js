import './OffcanvasMenu.css';

const OffcanvasMenu = ({ title, itemMenu, refContainerOffMenu }) => {
  const clickHandler = () => {
    refContainerOffMenu.current.firstElementChild.classList.toggle('off-menu-show');

    window.setTimeout(() => {
      refContainerOffMenu.current.classList.toggle('container-off-menu-show');
    }, 500);
  };

  return (
    <div className='container-off-menu' ref={refContainerOffMenu} onClick={clickHandler}>
      <div className='off-menu'>
        <div className='title'>{title}</div>
        {itemMenu}
      </div>
    </div>
  );
};
export default OffcanvasMenu;
