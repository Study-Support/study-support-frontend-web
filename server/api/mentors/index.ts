const createGetResponse = () => (
  {
    data: {
      data: [
        {
          id: '5',
          faculty: 'Công nghệ thông tin',
          full_name: 'Hoàng Thị Thu Như',
          subjects: [{id: 3, name: "Đại số tuyến tính"}, {id: 2, name: "Vật lý 1"}],
          image: 'assets/mentors/m1.jpg',
          group_id: '12332111',
          rating: 4,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '1',
          faculty: 'Điện',
          full_name: 'Trần Thị Hồng Ngọc',
          subjects: [{id: 3, name: "Đại số tuyến tính"}, {id: 2, name: "Vật lý 1"}],
          image: 'assets/mentors/m2.jpg',
          group_id: '12332111',
          rating: 4,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '2',
          faculty: 'Cơ khí',
          full_name: 'Kiến trúc',
          subjects: [{id: 3, name: "Đại số tuyến tính"}, {id: 2, name: "Vật lý 1"}],
          image: 'assets/mentors/m3.jpg',
          group_id: '12332111',
          rating: 4,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '3',
          faculty: 'My',
          full_name: 'Cơ khí giao thông',
          subjects: [{id: 3, name: "Đại số tuyến tính"}, {id: 2, name: "Vật lý 1"}],
          image: 'assets/mentors/m4.jpg',
          group_id: '12332111',
          rating: 4,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
      ]
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
  