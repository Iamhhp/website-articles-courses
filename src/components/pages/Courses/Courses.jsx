import './Courses.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { Col, Container, Row } from 'react-bootstrap';
import AccordionMenu from '../../AccordionMenu/AccordionMenu';
import ToggleBtn from '../../ToggleBtn/ToggleBtn';
import ReactPaginate from 'react-paginate';
import CardCourse from '../../CardCourse/CardCourse';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';

const Courses = () => {
  useEffect(() => {
    console.log('Courses Render!');
    window.scrollTo(0, 0);
  });

  const [courseFetch, isPending] = useFetch('http://localhost:5000/courses');
  const [courseShow, setCourseShow] = useState([]);
  useEffect(() => {
    setCourseSearch(() => [...courseFetch]);
  }, [courseFetch]);

  // Searching Courses //////////////////////////////////////////////////////////////////////////////////////////
  const [reloadAccordion, setReloadAccordion] = useState(false);
  useEffect(() => {
    setReloadAccordion(false);
  }, [reloadAccordion]);

  const [courseSearch, setCourseSearch] = useState([]);
  useEffect(() => {
    filteringCourse();
  }, [courseSearch]);

  const clickHandlerSearchCourse = (e) => {
    const boxSearch = e.target.parentElement;
    const inputSearch = boxSearch.children[0];
    const optionSearch = boxSearch.children[1];
    const resultSearch = courseFetch.filter((course) => course[optionSearch.value].includes(inputSearch.value));

    optionSorting.current = 'newest';
    optionFilter.current = { teacher: [], category: [], status: [] };
    setReloadAccordion(true);
    setCourseSearch(() => [...resultSearch]);
  };

  // Filtering Courses ///////////////////////////////////////////////////////////////////////////////////////
  const optionFilter = useRef({ teacher: [], category: [], status: [] });
  const courseFilter = useRef([]);
  const filteringCourse = () => {
    if (optionFilter.current.teacher.length) {
      courseFilter.current = [...courseSearch.filter((course) => optionFilter.current.teacher.includes(course.teacher))];
    } else {
      courseFilter.current = [...courseSearch];
    }

    if (optionFilter.current.category.length) {
      courseFilter.current = [...courseFilter.current.filter((course) => optionFilter.current.category.includes(course.category))];
    }

    if (optionFilter.current.status.length) {
      courseFilter.current = [...courseFilter.current.filter((course) => optionFilter.current.status.includes(course.state))];
    }

    setReloadPaginate(true);
    sortingCourse();
  };

  // sorting Course //////////////////////////////////////////////////////////////////////////////////////////
  const optionSorting = useRef('newest');
  const sortingCourse = () => {
    switch (optionSorting.current) {
      case 'newest':
        coursePaginate.current = [...courseFilter.current.sort((a, b) => b.id - a.id)];
        break;
      case 'oldest':
        coursePaginate.current = [...courseFilter.current.sort((a, b) => a.id - b.id)];
        break;
      case 'longest':
        coursePaginate.current = [
          ...courseFilter.current.sort((a, b) => {
            const durationA = a.duration.split(':');
            const timeA = Number(durationA[0]) * 60 + Number(durationA[1]);

            const durationB = b.duration.split(':');
            const timeB = Number(durationB[0]) * 60 + Number(durationB[1]);

            return timeB - timeA;
          }),
        ];
        break;
      case 'shortest':
        coursePaginate.current = [
          ...courseFilter.current.sort((a, b) => {
            const durationA = a.duration.split(':');
            const timeA = Number(durationA[0]) * 60 + Number(durationA[1]);

            const durationB = b.duration.split(':');
            const timeB = Number(durationB[0]) * 60 + Number(durationB[1]);

            return timeA - timeB;
          }),
        ];
        break;
      case 'expensive':
        coursePaginate.current = [
          ...courseFilter.current.sort((a, b) => {
            const priceA = a.discountPrice ? a.discountPrice : a.mainPrice;
            const priceB = b.discountPrice ? b.discountPrice : b.mainPrice;

            return priceB - priceA;
          }),
        ];
        break;
      default: // cheapest
        coursePaginate.current = [
          ...courseFilter.current.sort((a, b) => {
            const priceA = a.discountPrice ? a.discountPrice : a.mainPrice;
            const priceB = b.discountPrice ? b.discountPrice : b.mainPrice;

            return priceA - priceB;
          }),
        ];
        break;
    }

    paginateHandler({ selected: 0 });
  };

  // Pagination //////////////////////////////////////////////////////////////////////////////////////////////
  const coursePaginate = useRef([]);
  const [reloadPaginate, setReloadPaginate] = useState(false);
  useEffect(() => {
    setReloadPaginate(false);
  }, [reloadPaginate]);

  const containerCourseShow = useRef(null);
  useEffect(() => {
    containerCourseShow.current.classList.add('container-course-show');
  }, [courseShow]);

  const paginateHandler = ({ selected: numPage }) => {
    const result = coursePaginate.current.filter((course, i) => i >= numPage * 6 && i < (numPage + 1) * 6);

    containerCourseShow.current.classList.remove('container-course-show');
    window.setTimeout(() => {
      setCourseShow(() => [...result]);
    }, 200);
  };

  // items Accordions Sorting ////////////////////////////////////////////////////////////////////////////////
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

  // items Accordions Status /////////////////////////////////////////////////////////////////////////////////
  const changeHandlerOptionFilterStatus = (e) => {
    if (e.target.checked) {
      optionFilter.current.status.push(e.target.id);
    } else {
      optionFilter.current.status = [...optionFilter.current.status.filter((status) => status !== e.target.id)];
    }

    console.log(optionFilter.current.status);
    filteringCourse();
  };

  const itemsAccordionStatus = useMemo(() => {
    return (
      <>
        <li className='item-accordion'>
          <ToggleBtn id={'completed'} changeHandler={changeHandlerOptionFilterStatus} />
          <label className='lbl-toggleBtn' htmlFor='completed'>
            تکمیل شده
          </label>
        </li>
        <li className='item-accordion'>
          <ToggleBtn id={'recording'} changeHandler={changeHandlerOptionFilterStatus} />
          <label className='lbl-toggleBtn' htmlFor='recording'>
            در حال ضبط
          </label>
        </li>
        <li className='item-accordion'>
          <ToggleBtn id={'presell'} changeHandler={changeHandlerOptionFilterStatus} />
          <label className='lbl-toggleBtn' htmlFor='presell'>
            پیش فروش
          </label>
        </li>
      </>
    );
  }, [courseSearch]);

  // items Accordions Filter Teacher & Category ///////////////////////////////////////////////////////////////////////
  const changeHandlerOptionFilteringTeacher = (e) => {
    if (e.target.checked) {
      optionFilter.current.teacher.push(e.target.value);
    } else {
      optionFilter.current.teacher = [...optionFilter.current.teacher.filter((teacher) => teacher !== e.target.value)];
    }

    filteringCourse();
  };

  const changeHandlerOptionFilteringCategory = (e) => {
    if (e.target.checked) {
      optionFilter.current.category.push(e.target.value);
    } else {
      optionFilter.current.category = [...optionFilter.current.category.filter((category) => category !== e.target.value)];
    }

    filteringCourse();
  };

  const itemsAccordionFiltering = useMemo(() => {
    const teacher = [];
    const category = [];

    // Extract Options Filter by new courseSearch
    courseFetch.forEach((course) => {
      if (!teacher.includes(course.teacher)) {
        teacher.push(course.teacher);
      }

      if (!category.includes(course.category)) {
        category.push(course.category);
      }
    });

    const itemsAccordionTeacher = teacher.map((teacher, i) => (
      <li key={i}>
        <input type='checkbox' value={teacher} id={`teacher-${i}`} onChange={changeHandlerOptionFilteringTeacher} />
        <label htmlFor={`teacher-${i}`}>{teacher}</label>
      </li>
    ));

    const itemsAccordionCategory = category.map((category, i) => (
      <li key={i}>
        <input type='checkbox' value={category} id={`category-${i}`} onChange={changeHandlerOptionFilteringCategory} />
        <label htmlFor={`category-${i}`}>{category}</label>
      </li>
    ));

    return { teacher: itemsAccordionTeacher, category: itemsAccordionCategory };
  }, [courseSearch]);

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
            <button type='button' onClick={clickHandlerSearchCourse}>
              جستوجو
            </button>
          </div>
        </Container>
      </Container>

      <Container>
        <Row>
          <Col className='col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2'>
            <div className='container-accordions'>
              <AccordionMenu reloadAccordion={reloadAccordion} title={'مرتب سازی'}>
                {itemAccordionSorting}
              </AccordionMenu>

              <AccordionMenu reloadAccordion={reloadAccordion} title={'مدرس'}>
                {itemsAccordionFiltering.teacher}
              </AccordionMenu>

              <AccordionMenu reloadAccordion={reloadAccordion} title={'دسته بندی'}>
                {itemsAccordionFiltering.category}
              </AccordionMenu>

              <AccordionMenu reloadAccordion={reloadAccordion} title={'وضعیت دوره'}>
                {itemsAccordionStatus}
              </AccordionMenu>
            </div>
          </Col>

          <Col className='col-12 col-sm-7 col-md-8 col-lg-9 col-xl-10' style={{ paddingTop: '20px', overflow: 'hidden' }}>
            <div className='container-course-hide' ref={containerCourseShow}>
              {isPending ? (
                <b>درحال بارگذاری...</b>
              ) : (
                <Row className='row-cols-1 row-cols-lg-2 row-cols-xl-3'>
                  {!courseShow.length ? (
                    <b>موردی یافت نشد!</b>
                  ) : (
                    courseShow.map((course) => (
                      <Col key={course.id}>
                        <CardCourse {...course} />
                      </Col>
                    ))
                  )}
                </Row>
              )}

              {reloadPaginate ? null : (
                <ReactPaginate
                  renderOnZeroPageCount={null}
                  onPageChange={paginateHandler}
                  className='container-paginate-course'
                  nextClassName='btn-next'
                  previousClassName='btn-prev'
                  breakClassName='item-paginate'
                  pageClassName='item-paginate'
                  pageCount={coursePaginate.current.length <= 6 ? 0 : Math.ceil(coursePaginate.current.length / 6)}
                  nextLabel={<IoIosArrowDropright className='icon' />}
                  previousLabel={<IoIosArrowDropleft className='icon' />}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Courses;
