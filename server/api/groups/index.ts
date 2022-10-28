const createGetResponse = () => ({
  data:{
    data: [
      {
        id: '5',
        name: 'Giải tích 1',
        img: 'g1.png',
        faculty: 'Hóa',
        quatity: '3',
        status: 1,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '4',
        name: 'Tin học đại cương',
        img: 'g2.jpg',
        faculty: 'Công nghệ thông tin',
        quatity: '3',
        status: 0,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '1',
        name: 'Xác suất thống kê',
        img: 'g3.jpg',
        faculty: 'Cơ khí giao thông',
        quatity: '1',
        status: 2,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },  
      {
        id: '2',
        name: 'Vi điều khiển',
        img: 'g4.jpg',
        faculty: 'Cơ khí giao thông',
        quatity: '3',
        status: 0,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '3',
        name: 'Khoa học dữ liệu',
        img: 'g4.jpg',
        faculty: 'Công nghệ tiên tiến',
        quatity: '2',
        status: 2,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '6',
        name: 'Chuyên đề công nghệ Công nghệ thông tin',
        img: 'g4.jpg',
        faculty: 'Công nghệ tiên tiến và xây dựng dân dụng',
        quatity: '2',
        status: 1,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
    ]
  }
});
  
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
  