const createGetResponse = () => ([
    {
      id: '5',
      name: 'Giải tích 1',
      fullname: 'Harry Potter',
      password: 'abcxyz',
      email: 'email@example.com',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '1',
      name: 'Tin học đại cương',
      fullname: 'Harry Potter',
      password: 'abcxyz',
      email: 'email@example.com',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '2',
      name: 'Lập trình hướng đối tượng',
      fullname: 'Harry Potter',
      password: 'abcxyz',
      email: 'email@example.com',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '3',
      name: 'Khoa học dữ liệu',
      fullname: 'Harry Potter',
      password: 'abcxyz',
      email: 'email@example.com',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
  ]);
  
  const createPostResponse = () => ({
    api_token: 'beareAuthApiToken',
  });
  
  const ValidationErrorResponses = () => ({
    name: [
      'Tên đăng nhập đã tồn tại',
      'Tên đăng nhập đã tồn tại',
    ],
    email: [
      'Tên đăng nhập đã tồn tại',
      'Tên đăng nhập đã tồn tại',
    ],
  });
  export default defineEventHandler(async (event) => {
    if (isMethod(event.req, 'POST')) {
      const body = await useBody(event.req);
      if (body.name === 'a') {
        // eslint-disable-next-line no-param-reassign
        event.res.statusCode = 422;
        return ValidationErrorResponses();
      }
      return createPostResponse();
    }
  
    return createGetResponse();
  });
  