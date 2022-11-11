const createGetResponse = () => ({
  data: {
    data:
    {
      id: '5',
      subject: 'Lập trình hướng đối tượng',
      img: 'g1.png',
      faculty: 'Khoa công nghệ thông tin',
      quantity: '3',
      title: 'Cải thiện, hiểu rõ hơn về cách viết code theo đối tượng',
      information: 'Mình chưa hiểu rõ các tính chất cơ bản của lập trình hướng đối tượng, muốn có thêm nhiều lần thực hành để thuần thạo hơn. Bên cạnh đó học thêm kiến thức nâng cao hơn, ứng dụng vào dự án thực tế để sau này biết cách áp dụng',
      status: 1,
      members: [
        {
          full_name: 'Hoàng Thị Thu Như',
          faculty: 'Công nghệ thông tin',
        },
        {
          full_name: 'Hoàng Thị Thu Như',
          faculty: 'Công nghệ thông tin',
        },
        {
          full_name: 'Hoàng Thị Thu Như',
          faculty: 'Công nghệ thông tin',
        },
      ],
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    }
  }
});

const createPostResponse = () => ({
  
});
const createDelResponse = () => ({
  
});
const createPutResponse = () => ({
  data: {
    cv_link: 'ab',
    schedule: 'a',
    smart_banking: 'a',
    note: 'a',
    confirm: 'agreed',
  }
});

const ValidationErrorResponses = () => ({
  meta: {
    error_message: 'Lỗi đăng ký!'
  }
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.note === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPostResponse();
  }
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req);
    if (body.cv_link === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPutResponse();
  }
  if (isMethod(event.req, 'DELETE')) {
    // event.res.statusCode = 422;
    // return ValidationErrorResponses();
    return createDelResponse();
  }
  return createGetResponse();
});
