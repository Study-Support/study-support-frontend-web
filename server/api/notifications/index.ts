const createGetResponse = () => ({
    data:{
      data: [
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
        },
        {
          id: '5',
          title: 'Nhắc nhở tiến độ học tập',
          time: '10/24/2022',
          description: 'Lớp giải tích 1 22N1 đẩy nhanh tiến độ học tập'
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
