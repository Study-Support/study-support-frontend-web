const createGetResponse = () => ({
    data: {
        smart_banking: '0987654321',
        accepts: [
            {
                id: 1,
                faculty: 'Công nghệ thông tin',
                subject: 'Tin học đại cương',
                cv_link: 'http://link',
                is_accept: true,
            },
            {
                id: 2,
                faculty: 'Kiến trúc',
                subject: 'Vẽ đồ họa',
                cv_link: 'http://link',
                is_accept: true,
            },
        ],
        requests: [
            {
                id: 3,
                faculty: 'Công nghệ thông tin',
                subject: 'Tin học đại cương',
                cv_link: 'http://link',
                is_accept: false,
            },
            {
                id: 4,
                faculty: 'Kiến trúc',
                subject: 'Vẽ đồ họa',
                cv_link: 'http://link',
                is_accept: false,
            },
        ]
      }
  });
  
  const createPostResponse = () => ({
  
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
    // event.res.statusCode = 422;
    // return ValidationErrorResponses();
    return createGetResponse();
  });
  