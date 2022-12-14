const createGetResponse = () => ({
  data: {
    id: '1s',
    full_name: 'Hoàng Thị Thu Như',
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

export default defineEventHandler(() => {
  return createGetResponse()
})
