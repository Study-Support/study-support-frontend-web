const createGetResponse = () => (
  {
    data:
    {
      id: '1',
      full_name: 'Hoàng Thị Thu Như',
      image: '/assets/mentors/m1.jpg',
      faculty: 'Công nghệ thông tin',
      subjects: [
        {
          id: '1',
          name: 'Đại số tuyến tính'
        },
        {
          id: '2',
          name: 'Vật lý 1'
        }
      ],
      rating: '4.5',
      group_quantity: '2'
    }
  }
);

const createPostResponse = () => ({
  api_token: 'beareAuthApiToken',
});

const ValidationErrorResponses = () => ({
  username: [
    'Tên đăng nhập đã tồn tại',
    'Tên đăng nhập đã tồn tại',
  ],
  image: [
    'Tên đăng nhập đã tồn tại',
    'Tên đăng nhập đã tồn tại',
  ],
});
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.username === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPostResponse();
  }

  return createGetResponse();
});
