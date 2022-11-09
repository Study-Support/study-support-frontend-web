const createGetResponse = () => ({
    data:{
      data: [
        {
          id: '5',
          subject: 'Giải tích 1',
          img: 'g1.png',
          faculty: 'Hóa',
          quantity: '3',
          status: 1,
          is_creator: true,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '4',
          subject: 'Tin học đại cương',
          img: 'g2.jpg',
          faculty: 'Công nghệ thông tin',
          quantity: '3',
          status: 2,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '1',
          subject: 'Xác suất thống kê',
          img: 'g3.jpg',
          faculty: 'Cơ khí giao thông',
          quantity: '1',
          status: 2,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },  
        {
          id: '2',
          subject: 'Vi điều khiển',
          img: 'g4.jpg',
          faculty: 'Cơ khí giao thông',
          quantity: '3',
          status: 1,
          is_creator: true,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '3',
          subject: 'Khoa học dữ liệu',
          img: 'g4.jpg',
          faculty: 'Công nghệ tiên tiến',
          quantity: '2',
          status: 1,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '6',
          subject: 'Chuyên đề công nghệ Công nghệ thông tin',
          img: 'g4.jpg',
          faculty: 'Công nghệ tiên tiến và xây dựng dân dụng',
          quantity: '2',
          status: 1,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '7',
          subject: 'Giải tích 1',
          img: 'g1.png',
          faculty: 'Hóa',
          quantity: '3',
          status: 1,
          is_creator: true,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '8',
          subject: 'Tin học đại cương',
          img: 'g2.jpg',
          faculty: 'Công nghệ thông tin',
          quantity: '3',
          status: 1,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '9',
          subject: 'Xác suất thống kê',
          img: 'g3.jpg',
          faculty: 'Cơ khí giao thông',
          quantity: '1',
          status: 2,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },  
        {
          id: '10',
          subject: 'Vi điều khiển',
          img: 'g4.jpg',
          faculty: 'Cơ khí giao thông',
          quantity: '3',
          status: 1,
          is_creator: true,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '11',
          subject: 'Khoa học dữ liệu',
          img: 'g4.jpg',
          faculty: 'Công nghệ tiên tiến',
          quantity: '2',
          status: 2,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
        {
          id: '12',
          subject: 'Chuyên đề công nghệ Công nghệ thông tin',
          img: 'g4.jpg',
          faculty: 'Công nghệ tiên tiến và xây dựng dân dụng',
          quantity: '2',
          status: 1,
          created_at: '2022-08-05T16:04:43.967Z',
          updated_at: '2022-08-05T16:04:43.967Z',
        },
      ]
    }
  });
    
    const createPostResponse = () => ({
    });
    
    const ValidationErrorResponses = () => ({
      meta: {
        error_message: 'Nhóm này đã tồn tại!'
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
    
      return createGetResponse();
    });
    