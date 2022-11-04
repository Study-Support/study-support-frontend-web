const createGetResponse = () => ({
  data: {
    data: [
      {
        id: '1',
        name: 'Công nghệ thông tin',
      },
      {
        id: '2',
        name: 'Kiến trúc',
      },
      {
        id: '3',
        name: 'Hóa',
      },
      {
        id: '4',
        name: 'Tự động hóa',
      },
    ]
  }
}
);  

  export default defineEventHandler(async (event) => {
    if (isMethod(event.req, 'POST')) {
    }
  
    return createGetResponse();
  });
  