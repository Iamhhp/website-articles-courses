import './AccordionMenu.css';
import { FaChevronDown } from 'react-icons/fa';
import { memo, useEffect, useRef } from 'react';

const AccordionMenu = ({ title, children, reloadAccordion }) => {
  useEffect(() => {
    console.log('AccordionMenu ', title, ' Render!');
  });

  const accordion = useRef(null);
  useEffect(() => {
    accordion.current.classList.remove('accordion-active');
    accordion.current.style.height = accordion.current.children[0].scrollHeight + 'px';
  }, [reloadAccordion]);

  const clickHandlerAccordion = (e) => {
    const result = accordion.current.classList.toggle('accordion-active');
    if (result) {
      accordion.current.style.height = accordion.current.scrollHeight + 'px';
    } else {
      accordion.current.style.height = accordion.current.children[0].scrollHeight + 'px';
    }
  };

  return (
    <div className='accordion' ref={accordion}>
      <div className='title' onClick={clickHandlerAccordion}>
        {title}
        <FaChevronDown className='icon' />
      </div>
      <ul className='items'>{reloadAccordion ? null : children}</ul>
    </div>
  );
};
export default memo(AccordionMenu);
