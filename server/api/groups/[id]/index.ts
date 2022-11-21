const createGetResponse0 = () => ({
  data: {
    time_study: 'Buổi tối',
    location_study: 'Khu a',
    self_study: 0,
    id: '5',
    subject: 'Lập trình hướng đối tượng',
    img: 'g1.png',
    faculty: 'Khoa công nghệ thông tin',
    quantity: '3',
    faculty_id: '1',
    subject_id: '1',
    topic: 'Cải thiện, hiểu rõ hơn về cách viết code theo đối tượng',
    information: 'Mình chưa hiểu rõ các tính chất cơ bản của lập trình hướng đối tượng, muốn có thêm nhiều lần thực hành để thuần thạo hơn. Bên cạnh đó học thêm kiến thức nâng cao hơn, ứng dụng vào dự án thực tế để sau này biết cách áp dụng',
    status: 0,
    survey_questions: [
      {
        id: '1',
        content: 'Bạn có làm việc nhóm tốt không?'
      },
      {
        id: '2',
        content: 'Bạn có nhiều thời gian rảnh không?'
      },
      {
        id: '3',
        content: 'Bạn có đọc hiểu tài liệu tiếng anh tốt không?'
      },
    ],
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  }
});
const createGetResponse1 = () => ({
  data: {
    id: '5',
    subject: 'Lập trình hướng đối tượng',
    img: 'g1.png',
    faculty: 'Khoa công nghệ thông tin',
    quantity: '3',
    topic: 'Cải thiện, hiểu rõ hơn về cách viết code theo đối tượng',
    information: 'Mình chưa hiểu rõ các tính chất cơ bản của lập trình hướng đối tượng, muốn có thêm nhiều lần thực hành để thuần thạo hơn. Bên cạnh đó học thêm kiến thức nâng cao hơn, ứng dụng vào dự án thực tế để sau này biết cách áp dụng',
    status: 1,
    members: [
      {
        id: '1',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '2',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '3',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
    ],
    survey_questions: [
      {
        id: '1',
        content: 'Bạn có làm việc nhóm tốt không?'
      },
      {
        id: '2',
        content: 'Bạn có nhiều thời gian rảnh không?'
      },
      {
        id: '3',
        content: 'Bạn có đọc hiểu tài liệu tiếng anh tốt không?'
      },
    ],
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
  }
});
const createGetResponse2 = () => ({
  data: {
    id: '5',
    subject: 'Lập trình hướng đối tượng',
    img: 'g1.png',
    faculty: 'Khoa công nghệ thông tin',
    quantity: '3',
    title: 'Cải thiện, hiểu rõ hơn về cách viết code theo đối tượng',
    information: 'Mình chưa hiểu rõ các tính chất cơ bản của lập trình hướng đối tượng, muốn có thêm nhiều lần thực hành để thuần thạo hơn. Bên cạnh đó học thêm kiến thức nâng cao hơn, ứng dụng vào dự án thực tế để sau này biết cách áp dụng',
    status: 2,
    members: [
      {
        id: '1',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '2',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '3',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
    ],
    mentors: [
      {
        id: '1',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '2',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
      {
        id: '3',
        full_name: 'Hoàng Thị Thu Như',
        faculty: 'Công nghệ thông tin',
      },
    ],
    created_at: '2022-08-05T16:04:43.967Z',
    updated_at: '2022-08-05T16:04:43.967Z',
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
  if (isMethod(event.req, 'POST')) {
    const body = await useBody(event.req);
    if (body.name === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return ValidationErrorResponses();
    }
    return createPostResponse();
  }
  return createGetResponse2();
});
