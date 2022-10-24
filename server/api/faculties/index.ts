const createGetResponse = () => ({
  data: {
    data: [
      {
        id: '1',
        name: 'information technology',
      },
      {
        id: '2',
        name: 'architect',
      },
      {
        id: '3',
        name: 'chemical',
      },
      {
        id: '4',
        name: 'information technology',
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
  