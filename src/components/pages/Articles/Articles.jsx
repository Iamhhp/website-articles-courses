import './Articles.css';
import useFetch from '../../../Hooks/useFetch';
import AccordionMenu from '../../AccordionMenu/AccordionMenu';
import CardArticle from '../../CardArticle/CardArticle';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const Articles = () => {
  useEffect(() => {
    console.log('Article Render!');
    window.scrollTo(0, 0);
  });

  const [dataArticleFetch, isPending] = useFetch('http://localhost:5000/articles');
  const [articleShow, setArticleShow] = useState([]);
  useEffect(() => {
    setArticleSearch(() => [...dataArticleFetch]);
  }, [dataArticleFetch]);

  // Search Data Articles ////////////////////////////////////////////////////////////////////////////////////////
  const [reloadItemsAccordion, setReloadItemsAccordion] = useState(false);
  useEffect(() => {
    setReloadItemsAccordion(false);
  }, [reloadItemsAccordion]);

  const boxSearch = useRef();
  const [articleSearch, setArticleSearch] = useState([]);

  useEffect(() => {
    filteringArticle();
  }, [articleSearch]);

  const clickHandlerSearchArticle = (e) => {
    if (e.target.nodeName === 'INPUT') {
      if (e.code !== 'Enter') {
        return;
      }
    }

    optionSorting.current = 'newest';
    optionFilter.current = { writers: [], categories: [] };
    setReloadItemsAccordion(true);

    const inputSearch = boxSearch.current.children[0];
    const optionSearch = boxSearch.current.children[1];
    const resultSearch = dataArticleFetch.filter((article) => article[optionSearch.value].includes(inputSearch.value));
    setArticleSearch(() => [...resultSearch]);
  };

  // Filter Data Articles ////////////////////////////////////////////////////////////////////////////////////////
  const changeHandlerOptionsWriter = (e) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      optionFilter.current.writers.push(value);
    } else {
      optionFilter.current.writers = [...optionFilter.current.writers.filter((writer) => writer !== value)];
    }

    filteringArticle();
  };

  const changeHandlerOptionsCategory = (e) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      optionFilter.current.categories.push(value);
    } else {
      optionFilter.current.categories = [...optionFilter.current.categories.filter((category) => category !== value)];
    }

    filteringArticle();
  };

  const itemsAccordionOptionsFiltering = useMemo(() => {
    const writers = [];
    const categories = [];
    articleSearch.forEach((article) => {
      if (!writers.includes(article.writer)) {
        writers.push(article.writer);
      }

      if (!categories.includes(article.category)) {
        categories.push(article.category);
      }
    });

    const optionFilteringWriters = writers.map((writer, i) => (
      <li key={i}>
        <input type='checkbox' value={writer} id={`writer-${i}`} onChange={changeHandlerOptionsWriter} />
        <label htmlFor={`writer-${i}`}>{writer}</label>
      </li>
    ));

    const optionFilteringCategories = categories.map((category, i) => (
      <li key={i}>
        <input type='checkbox' value={category} id={`article-${i}`} onChange={changeHandlerOptionsCategory} />
        <label htmlFor={`category-${i}`}>{category}</label>
      </li>
    ));

    return { writers: [...optionFilteringWriters], categories: [...optionFilteringCategories] };
  }, [articleSearch]);

  const optionFilter = useRef({ writers: [], categories: [] });
  const articleFilter = useRef([]);
  const filteringArticle = () => {
    if (optionFilter.current.writers.length) {
      articleFilter.current = [...articleSearch.filter((article) => optionFilter.current.writers.includes(article.writer))];
    } else {
      articleFilter.current = [...articleSearch];
    }

    if (optionFilter.current.categories.length) {
      articleFilter.current = [...articleFilter.current.filter((article) => optionFilter.current.categories.includes(article.category))];
    }

    sortingArticle();
  };

  // Sorting Data Article ////////////////////////////////////////////////////////////////////////////////////////
  const optionSorting = useRef('newest');
  const sortingArticle = () => {
    switch (optionSorting.current) {
      case 'newest':
        articlePagination.current = [...articleFilter.current.sort((a, b) => b.id - a.id)];
        break;
      case 'oldest':
        articlePagination.current = [...articleFilter.current.sort((a, b) => a.id - b.id)];
        break;
      case 'longest':
        articlePagination.current = [
          ...articleFilter.current.sort((a, b) => {
            const readingTimeA = a.readingTime.split(':');
            const timeA = Number(readingTimeA[0]) * 60 + Number(readingTimeA[1]);

            const readingTimeB = b.readingTime.split(':');
            const timeB = Number(readingTimeB[0]) * 60 + Number(readingTimeB[1]);

            return timeB - timeA;
          }),
        ];
        break;
      default: // 'shortest':
        articlePagination.current = [
          ...articleFilter.current.sort((a, b) => {
            const readingTimeA = a.readingTime.split(':');
            const timeA = Number(readingTimeA[0]) * 60 + Number(readingTimeA[1]);

            const readingTimeB = b.readingTime.split(':');
            const timeB = Number(readingTimeB[0]) * 60 + Number(readingTimeB[1]);

            return timeA - timeB;
          }),
        ];
        break;
    }

    setReloadPaginate(true);
    paginateHandler({ selected: 0 });
  };

  // Pagination Handler ////////////////////////////////////////////////////////////////////////////////////////
  const articlePagination = useRef([]);
  const [reloadPaginate, setReloadPaginate] = useState(false);
  useEffect(() => {
    setReloadPaginate(false);
  }, [reloadPaginate]);

  const containerArticleShow = useRef(null);
  useEffect(() => {
    containerArticleShow.current.classList.add('container-articleShow-show');
  }, [articleShow]);

  const paginateHandler = ({ selected: pageNum }) => {
    const dataPage = articlePagination.current.filter((article, i) => i >= pageNum * 6 && i < pageNum * 6 + 6);

    containerArticleShow.current.classList.remove('container-articleShow-show');
    window.setTimeout(() => {
      setArticleShow([...dataPage]);
    }, 200);
  };

  // Items Accordion Menu ///////////////////////////////////////////////////////////////////////////////////////
  const changeHandlerOptionsSorting = (e) => {
    optionSorting.current = e.currentTarget.id;
    sortingArticle();
  };

  const itemsAccordionOptionsSorting = useMemo(() => {
    return (
      <>
        <li>
          <input type='radio' name='sorting' id='newest' onChange={changeHandlerOptionsSorting} defaultChecked />
          <label htmlFor='newest'>جدیدترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='oldest' onChange={changeHandlerOptionsSorting} />
          <label htmlFor='oldest'>قدیمی ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='longest' onChange={changeHandlerOptionsSorting} />
          <label htmlFor='longest'>طولانی ترین</label>
        </li>
        <li>
          <input type='radio' name='sorting' id='shortest' onChange={changeHandlerOptionsSorting} />
          <label htmlFor='shortest'>کوتاه ترین</label>
        </li>
      </>
    );
  }, []);

  return (
    <>
      <Container fluid className='container-header-articles'>
        <Container className='header-articles'>
          <div className='title'>مقالات</div>
          <div ref={boxSearch} className='search-article'>
            <input type='text' name='input-search' id='input-search' onKeyDown={clickHandlerSearchArticle} />
            <select name='optionSearch' id='optionSearch'>
              <option value='title'>عنوان</option>
              <option value='writer'>نویسنده</option>
              <option value='category'>موضوع</option>
            </select>
            <button type='button' onClick={clickHandlerSearchArticle}>
              جستوجو
            </button>
          </div>
        </Container>
      </Container>

      <Container>
        <Row>
          <Col className='col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2'>
            <div className='container-accordion-menu'>
              <AccordionMenu title={'مرتب سازی'} reloadAccordion={reloadItemsAccordion}>
                {itemsAccordionOptionsSorting}
              </AccordionMenu>

              <AccordionMenu title={'نویسنده'} reloadAccordion={reloadItemsAccordion}>
                {itemsAccordionOptionsFiltering.writers}
              </AccordionMenu>

              <AccordionMenu title={'موضوع'} reloadAccordion={reloadItemsAccordion}>
                {itemsAccordionOptionsFiltering.categories}
              </AccordionMenu>
            </div>
          </Col>

          <Col className='col-12 col-sm-7 col-md-8 col-lg-9 col-xl-10' style={{ overflow: 'hidden' }}>
            <div className='container-articleShow-hide' ref={containerArticleShow}>
              {isPending ? (
                <b>درحال بارگذاری...</b>
              ) : (
                <Row className='row-cols-1 row-cols-lg-2 row-cols-xl-3'>
                  {!articleShow.length ? (
                    <b className='not-found'>موردی یافت نشد!</b>
                  ) : (
                    articleShow.map((article) => (
                      <Col key={article.id}>
                        <CardArticle {...article} />
                      </Col>
                    ))
                  )}
                </Row>
              )}

              {reloadPaginate ? null : (
                <ReactPaginate
                  renderOnZeroPageCount={null}
                  onPageChange={paginateHandler}
                  className='container-paginate-article'
                  nextClassName='btn-next'
                  previousClassName='btn-prev'
                  breakClassName='item-paginate'
                  pageClassName='item-paginate'
                  pageCount={articlePagination.current.length <= 6 ? 0 : Math.ceil(articlePagination.current.length / 6)}
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
export default Articles;
