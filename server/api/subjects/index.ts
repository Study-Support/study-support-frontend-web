const createGetResponse = () => ({
  data: {
    data: [
      {
        id: '1',
        name: 'Toán cao cấp',
      },
      {
        id: '2',
        name: 'Kỹ thuật lập trình',
      },
      {
        id: '3',
        name: 'Xác suất thông kê',
      },
      {
        id: '4',
        name: 'Kinh tế chính trị',
      },
    ],
  },
})
const createGetResponseO = () => ({
  data: {
    data: [
      {
        id: '1',
        name: 'Vẽ kỹ thuật',
      },
      {
        id: '2',
        name: 'Lập trình hướng đối tượng',
      },
      {
        id: '3',
        name: 'Chuyên đề công nghệ',
      },
      {
        id: '4',
        name: 'Kiểm thử phần mềm',
      },
    ],
  },
})

export default defineEventHandler(async (event) => {
  const query = await useQuery(event.req)
  if (query.faculty_id === '1') {
    return createGetResponse()
  } else {
    return createGetResponseO()
  }
})
