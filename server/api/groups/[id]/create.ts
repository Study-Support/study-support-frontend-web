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
  },
})

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
  return createGetResponse()
})
