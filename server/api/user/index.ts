import crypto from 'crypto'

const createGetResponse = () => ({
  data: {
    id: '1s',
    full_name: 'Trần Thị Thảo',
    password: 'abcxyz',
    email: 'email@example.com',
    phone_number: '0866776059',
    address: 'Quảng Trị',
    gender: '1',
    birthday: '01/28/2001',
    faculty_id: '1',
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  },
})
const createPutResponse = () => ({
  data: {
    data: {
      id: 'thunhu',
      full_name: 'Trần Thị Thảo',
      password: 'abcxyz',
      email: 'email@example.com',
      phone_number: '0866776059',
      address: 'Quảng Trị',
      gender: '1',
      birthday: '01/28/2001',
      faculty: '1',
      created_at: '2022-08-05T16:04:43.967Z',
      updated_at: '2022-08-05T16:04:43.967Z',
    },
  },
})
const validationErrorResponses = () => ({
  meta: {
    error_message: {
      full_name: [
        'Họ và tên không được để trống',
        'Họ và tên không được để trống',
      ],
      email: ['Mã nhóm không được đổi', 'Mã nhóm không được đổi'],
    },
  },
})

export default defineEventHandler(async (event) => {
  if (isMethod(event.req, 'PUT')) {
    const body = await useBody(event.req)
    if (body.full_name === 'a') {
      event.res.statusCode = 422
      return validationErrorResponses()
    }
    return createPutResponse()
  }
  return createGetResponse()
})
