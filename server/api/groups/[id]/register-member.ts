const createGetResponse = () => ({
  data: {
    difficult: 'a',
    target: 'a',
    note: 'a',
    confirm: 'agreed',
    }
});

const createPostResponse = () => ({

});
const createPutResponse = () => ({
  data: {
    difficult: 'aa',
    target: 'a',
    note: 'a',
    confirm: 'agreed',
    }
});
const createDelResponse = () => ({

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
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req);
    if (body.note === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPutResponse();
  }
  if (isMethod(event.req, 'DELETE')) {
    // event.res.statusCode = 422;
    // return ValidationErrorResponses();
    return createDelResponse();
  }
  return createGetResponse();
});
