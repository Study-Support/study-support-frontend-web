const createGetResponse = () => ([
    {
      id: '5',
      username: 'Như',
      fullname: 'Hoàng Thị Thu Như',
      subject: 'Toán',
      image: 'assets/mentors/m1.jpg',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '1',
      username: 'Bố',
      fullname: 'Trần Thị Hồng Ngọc',
      subject: 'Toán',
      image: 'assets/mentors/m2.jpg',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '2',
      username: 'Mẹ',
      fullname: 'Hồ Văn Trường',
      subject: 'Toán',
      image: 'assets/mentors/m3.jpg',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '3',
      username: 'My',
      fullname: 'Đinh Văn Hùng',
      subject: 'Toán',
      image: 'assets/mentors/m4.jpg',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
  ]);
  
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
  