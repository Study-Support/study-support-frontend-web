const createGetResponse = () => ({
  data: {
    cv_link: 'a',
    smart_banking: 'a',
  },
})

const createPostResponse = () => ({})

const ValidationErrorResponses = () => ({
  meta: {
    error_message: 'Lỗi đăng ký!',
  },
})
export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req)
    if (body.note === 'a') {
      event.res.statusCode = 422
      return ValidationErrorResponses()
    }
    return createPostResponse()
  }
  // event.res.statusCode = 422;
  // return ValidationErrorResponses();
  return createGetResponse()
})
