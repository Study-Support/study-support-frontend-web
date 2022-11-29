const createGetResponse = () => ({
  data: {
    difficult: 'a',
    target: 'a',
    note: 'a',
    status: 0,
    confirm: 'agreed',
    self_study: 'false',
    faculty_id: '1',
    subject_id: '1',
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
  quantity: [
    'Tên đăng nhập đã tồn tại',
    'Tên đăng nhập đã tồn tại',
  ],
});
export default defineEventHandler(async (event) => {
  // if (isMethod(event.req, 'PUT')) {
  //   const body = await useBody(event.req);
  //   if (body.difficult === 'a') {
  //     // eslint-disable-next-line no-param-reassign
  //     event.res.statusCode = 422;
  //     return ValidationErrorResponses();
  //   }
  //   return createPutResponse();
  // }
  return createGetResponse();
});
