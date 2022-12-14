const createGetResponse = () => ({
  data: {
    survey_questions: [
      {
        id: 1,
        content: 'Bạn có làm việc nhóm tốt không?',
        answer: 'Có',
      },
      {
        id: 2,
        content: 'Bạn có nhiều thời gian rảnh không?',
        answer: 'Rảnh nhiều vào buổi tối',
      },
      {
        id: 3,
        content: 'Bạn có đọc hiểu tài liệu tiếng anh tốt không?',
        answer: 'Đọc hiểu cơ bản nội dung',
      },
    ],
  },
})

const createPostResponse = () => ({})
const createPutResponse = () => ({
  data: {
    survey_questions: [
      {
        id: 1,
        content: 'Bạn có làm việc nhóm tốt không?',
        answer: 'Có',
      },
      {
        id: 2,
        content: 'Bạn có nhiều thời gian rảnh không?',
        answer: 'Rảnh nhiều vào buổi tối',
      },
      {
        id: 3,
        content: 'Bạn có đọc hiểu tài liệu tiếng anh tốt không?',
        answer: 'Đọc hiểu cơ bản nội dung và có thể dùng translate để hỗ trợ',
      },
    ],
  },
})
const createDelResponse = () => ({})

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
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req)
    if (body.note === 'a') {
      event.res.statusCode = 422
      return ValidationErrorResponses()
    }
    return createPutResponse()
  }
  if (isMethod(event.req, 'DELETE')) {
    // event.res.statusCode = 422;
    // return ValidationErrorResponses();
    return createDelResponse()
  }
  // event.res.statusCode = 422;
  // return ValidationErrorResponses();
  return createGetResponse()
})
