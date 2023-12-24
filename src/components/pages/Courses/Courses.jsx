import './Courses.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { Col, Container, Row } from 'react-bootstrap';
import AccordionMenu from '../../AccordionMenu/AccordionMenu';
import ToggleBtn from '../../ToggleBtn/ToggleBtn';
import ReactPaginate from 'react-paginate';
import CardCourse from '../../CardCourse/CardCourse';

const Courses = () => {
  const [courseFetch, isPending] = useFetch('http://localhost:5000/courses');
  const [courseShow, setCourseShow] = useState([]);
  useEffect(() => {
    setCourseSearch(() => [...courseFetch]);
  }, [courseFetch]);

  // Searching Courses ///////////////////////////////////////////////////////////////////////
  const [courseSearch, setCourseSearch] = useState([]);
  useEffect(() => {
    filteringCourse();
  }, [courseSearch]);

  const clickHandlerSearching = () => {
    filteringCourse();
  };

  // Filtering Courses ///////////////////////////////////////////////////////////////////////
  const itemsAccordionFiltering = useMemo(() => {
    const writer = [];
    const category = [];

    courseFetch.forEach((course) => {
      if (!writer.includes(course.teacher)) {
        writer.push(course.teacher);
      }

      if (!category.includes(course.category)) {
        category.push(course.category);
      }
    });

    const itemsAccordionWriter = writer.map((writer, i) => (
      <li key={i}>
        <input type='checkbox' name={writer} id={`writer-${i}`} />
        <label htmlFor={`writer-${i}`}>{writer}</label>
      </li>
    ));

    const itemsAccordionCategory = category.map((category, i) => (
      <li key={i}>
        <input type='checkbox' name={category} id={`category-${i}`} />
        <label htmlFor={`category-${i}`}>{category}</label>
      </li>
    ));

    return { writer: itemsAccordionWriter, category: itemsAccordionCategory };
  }, [courseSearch]);

  const courseFilter = useRef([]);
  const filteringCourse = () => {
    courseFilter.current = [...courseSearch];
    sortingCourse();
  };

  // items Accordions ///////////////////////////////////////////////////////////////////////
  const sortingCourse = () => {
    switch (optionSorting.current) {
      case 'newest':
        setCourseShow(() => [...courseFilter.current.sort((a, b) => a.id - b.id)]);
        break;
      case 'oldest':
        setCourseShow(() => [...courseFilter.current.sort((a, b) => b.id - a.id)]);
        break;
      case 'longest':
        setCourseShow(() => [
          ...courseFilter.current.sort((a, b) => {
            const durationA = a.duration.split(':');
            const timeA = Number(durationA[0]) * 60 + Number(durationA[1]);

            const durationB = b.duration.split(':');
            const timeB = Number(durationB[0]) * 60 + Number(durationB[1]);

            return timeB - timeA;
          }),
        ]);
        break;
      case 'shortest':
        setCourseShow(() => [
          ...courseFilter.current.sort((a, b) => {
            const durationA = a.duration.split(':');
            const timeA = Number(durationA[0]) * 60 + Number(durationA[1]);

            const durationB = a.duration.split(':');
            const timeB = Number(durationB[0]) * 60 + Number(durationB[1]);

            return timeA - timeB;
          }),
        ]);
        break;
      case 'expensive':
        setCourseShow(() => [
          ...courseFilter.current.sort((a, b) => {
            const priceA = a.discountPrice ? a.discountPrice : a.mainPrice;
            const priceB = b.discountPrice ? b.discountPrice : b.discountPrice;

            return priceA - priceB;
          }),
        ]);
        break;
      default: // cheapest
        setCourseShow(() => [
          ...courseFilter.current.sort((a, b) => {
            const priceA = a.discountPrice ? a.discountPrice : a.mainPrice;
            const priceB = b.discountPrice ? b.discountPrice : b.mainPrice;

            return priceB - priceA;
          }),
        ]);
        break;
    }
  };

  // items Accordions ///////////////////////////////////////////////////////////////////////
  const optionSorting = useRef('newest');
  const changeHandlerOptionSorting = (e) => {
    optionSorting.current = e.target.id;
    sortingCourse();
  };
  const itemAccordionSorting = useMemo(() => {
    return (
      <>
        <li>
          <input type='radio' name='sorting' id='newest' onChange={changeHandlerOptionSorting} defaultChecked />
          <label htmlFor='newest'>جدیدترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='oldest' onChange={changeHandlerOptionSorting} />
          <label htmlFor='oldest'>قدیمی ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='longest' onChange={changeHandlerOptionSorting} />
          <label htmlFor='longest'>طولانی ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='shortest' onChange={changeHandlerOptionSorting} />
          <label htmlFor='shortest'>کوتاه ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='expensive' onChange={changeHandlerOptionSorting} />
          <label htmlFor='expensive'>گران ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='cheapest' onChange={changeHandlerOptionSorting} />
          <label htmlFor='cheapest'>ارزان ترین</label>
        </li>
      </>
    );
  }, []);

  const itemsAccordionState = useMemo(() => {
    return (
      <>
        <li className='item-accordion'>
          <ToggleBtn id={'complete'} onChange={changeHandlerOptionSorting} />
          <label className='lbl-toggleBtn' htmlFor='complete'>
            تکمیل شده
          </label>
        </li>
        <li className='item-accordion'>
          <ToggleBtn id={'recording'} />
          <label className='lbl-toggleBtn' htmlFor='recording'>
            در حال ضبط
          </label>
        </li>
        <li className='item-accordion'>
          <ToggleBtn id={'presell'} />
          <label className='lbl-toggleBtn' htmlFor='presell'>
            پیش فروش
          </label>
        </li>
      </>
    );
  }, []);

  return (
    <>
      <Container fluid className='container-header-courses'>
        <Container className='header-courses'>
          <div className='title'>دوره ها</div>
          <div className='box-search'>
            <input type='text' name='input-text' id='input-text' />
            <select name='option-search' id='option-search'>
              <option value='title'>عنوان</option>
              <option value='description'>توضیحات</option>
              <option value='teacher'>مدرس</option>
              <option value='category'>موضوع</option>
            </select>
            <button type='button'>جستوجو</button>
          </div>
        </Container>
      </Container>

      <Container>
        <Row>
          <Col className='col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2'>
            <div className='container-accordions'>
              <AccordionMenu title={'مرتب سازی'}>{itemAccordionSorting}</AccordionMenu>
              <AccordionMenu title={'نویسنده'}>{itemsAccordionFiltering.writer}</AccordionMenu>
              <AccordionMenu title={'دسته بندی'}>{itemsAccordionFiltering.category}</AccordionMenu>
              <AccordionMenu title={'وضعیت دوره'}>{itemsAccordionState}</AccordionMenu>
            </div>
          </Col>
          <Col className='col-12 col-sm-7 col-md-8 col-lg-9 col-xl-10'>
            <Row className='row-cols-1 row-cols-lg-2 row-cols-xl-3'>
              {courseShow.map((course) => (
                <Col key={course.id}>
                  <CardCourse {...course} />
                </Col>
              ))}

              {/* <ReactPaginate
                  renderOnZeroPageCount={null}
                  onPageChange={paginateHandler}
                  className='container-paginate'
                  nextClassName='btn-next'
                  previousClassName='btn-prev'
                  breakClassName='item-paginate'
                  pageClassName='item-paginate'
                  pageCount={articlePagination.current.length <= 6 ? 0 : Math.ceil(articlePagination.current.length / 6)}
                  nextLabel={<IoIosArrowDropright className='icon' />}
                  previousLabel={<IoIosArrowDropleft className='icon' />}
                /> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Courses;
