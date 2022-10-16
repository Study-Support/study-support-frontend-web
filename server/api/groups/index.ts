const createGetResponse = () => ([
    {
      id: '5',
      name: 'Giải tích 1',
      fullname: 'Harry Potter',
      faculty: 'Hóa',
      quatity: '3',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '4',
      name: 'Hình họa',
      fullname: 'Harry Potter',
      faculty: 'Kiến trúc',
      quatity: '3',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '1',
      name: 'Tin học đại cương',
      fullname: 'Harry Potter',
      faculty: 'Công nghệ thông tin',
      quatity: '1',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },  
    {
      id: '2',
      name: 'Lập trình hướng đối tượng',
      faculty: 'Công nghệ thông tin',
      quatity: '3',
      group_id: '12332111',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
    {
      id: '3',
      name: 'Khoa học dữ liệu',
      fullname: 'Harry Potter',
      faculty: 'Công nghệ tiên tiến',
      quatity: '2',
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
    quatity: [
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
  