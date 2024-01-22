import './ArticleEditCreate.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useRef } from 'react';
import { LuRefreshCw } from 'react-icons/lu';

const ArticleEditCreate = () => {
  const navigate = useNavigate();
  const dataArticle = useRef(null);
  const elementForm = useRef(null);

  const { editCreate, idArticle } = useParams();
  useEffect(() => {
    if (editCreate === 'Edit') {
      fetch(`https://dbserver.liara.run/articles/${idArticle}`)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((json) => {
              dataArticle.current = json;
              elementForm.current.elements[0].value = json.image;
              elementForm.current.elements[1].value = json.title;
              elementForm.current.elements[2].value = json.description;
              elementForm.current.elements[3].value = json.writer;
              elementForm.current.elements[4].value = json.category;
              elementForm.current.elements[5].value = json.readingTime;
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: response.statusText,
              text: 'اطلاعات دریافت نشد!\nبه صفحه قبل باز میگردید',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 2000,
            }).then(() => {
              window.history.back();
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err,
            text: 'اطلاعات دریافت نشد!\nبه صفحه قبل باز میگردید',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          }).then(() => {
            window.history.back();
          });
        });
    }
  }, []);

  const isEmptyInputs = () => {
    let result = false;
    const inputs = [...elementForm.current.elements];
    inputs.forEach((input, i) => {
      console.log(input.value);
      if (!input.value && i <= 5) {
        console.log(input.value, 'id');
        result = true;
      }
    });
    return result;
  };

  const clickHandlerBtnEditCreateArticle = (e) => {
    if (isEmptyInputs()) {
      Swal.fire({
        icon: 'info',
        text: 'لطفا تمامی ورودی ها را پر کنید.',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return;
    }

    const dataInputs = {
      [elementForm.current.elements[0].id]: elementForm.current.elements[0].value,
      [elementForm.current.elements[1].id]: elementForm.current.elements[1].value,
      [elementForm.current.elements[2].id]: elementForm.current.elements[2].value,
      [elementForm.current.elements[3].id]: elementForm.current.elements[3].value,
      [elementForm.current.elements[4].id]: elementForm.current.elements[4].value,
      [elementForm.current.elements[5].id]: elementForm.current.elements[5].value,
    };

    if (editCreate === 'Edit') {
      Swal.fire({
        icon: 'question',
        text: 'آیا ویرایش ثبت شود؟',
        confirmButtonText: 'بله',
        confirmButtonColor: 'green',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        cancelButtonColor: 'red',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(`http://localhost:5000/articles/${idArticle}`, dataInputs)
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  icon: 'success',
                  text: 'ویرایش انجام شد.',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 2000,
                }).then(() => {
                  navigate('/Articles');
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  text: response.statusText,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 2000,
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
              });
            });
        } else {
          Swal.fire({
            icon: 'info',
            text: 'ویرایش مقاله لغو شد.',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'question',
        text: 'آیا مقاله ثبت شود؟',
        confirmButtonText: 'بله',
        confirmButtonColor: 'green',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        cancelButtonColor: 'red',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post('http://localhost:5000/articles', dataInputs)
            .then((response) => {
              console.log(response);
              if (response.status === 201) {
                Swal.fire({
                  icon: 'success',
                  text: 'ثبت مقاله انجام شد.',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 2000,
                }).then(() => {
                  navigate('/Articles');
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  text: response.statusText,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 2000,
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                text: err,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
              });
            });
        } else {
          Swal.fire({
            icon: 'info',
            text: 'ثبت مقاله لغو شد.',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
          });
        }
      });
    }
  };

  const refreshInput = (numInput, prop) => {
    elementForm.current.elements[numInput].value = dataArticle.current[prop];
  };

  return (
    <Container>
      <form className='container-form' ref={elementForm}>
        <label htmlFor='image'>عکس</label>
        <div className='container-input'>
          <input
            type='text'
            id='image'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(0, 'image');
              }}
            />
          )}
        </div>

        <label htmlFor='title'>عنوان</label>
        <div className='container-input'>
          <input
            type='text'
            id='title'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(1, 'title');
              }}
            />
          )}
        </div>

        <label htmlFor='description'>توضیحات</label>
        <div className='container-input'>
          <input
            type='text'
            id='description'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(2, 'description');
              }}
            />
          )}
        </div>

        <label htmlFor='writer'>نویسنده</label>
        <div className='container-input'>
          <input
            type='text'
            id='writer'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(3, 'writer');
              }}
            />
          )}
        </div>

        <label htmlFor='category'>موضوع</label>
        <div className='container-input'>
          <input
            type='text'
            id='category'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(4, 'category');
              }}
            />
          )}
        </div>

        <label htmlFor='readingTime'>زمان مطالعه</label>
        <div className='container-input'>
          <input
            type='text'
            id='readingTime'
            onBlur={(e) => {
              e.currentTarget.value = String(e.currentTarget.value).trim();
            }}
          />

          {editCreate === 'Create' ? null : (
            <LuRefreshCw
              className='icon'
              onClick={() => {
                refreshInput(5, 'readingTime');
              }}
            />
          )}
        </div>
        <button type='button' onClick={clickHandlerBtnEditCreateArticle}>
          {editCreate === 'Edit' ? 'ویرایش مقاله' : 'ایجاد مقاله'}
        </button>
      </form>
    </Container>
  );
};
export default ArticleEditCreate;
