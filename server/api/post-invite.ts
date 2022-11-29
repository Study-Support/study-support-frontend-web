const SuccessResponse = () => ({
    data: {
      token: {
        access_token: 'accesstoken'
      }
    }
  });
  const validationErrorResponses = () => ({
    meta: {
      error_message: {
        email: [
          'Tên đăng nhập không được để trống',
          'Tên đăng nhập phải dài hơn 5 ký tự',
        ],
      }
    }
  });
  const unauthorizedErrorResponse = () => ({
    meta: {
      error_message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ',
    }
  });
  export default defineEventHandler(async (event) => {
    const body = await useBody(event.req);
    if (body.email === 'a') {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 401;
      return unauthorizedErrorResponse();
    }
    if ([body.email, body.password].includes('1')) {
      // eslint-disable-next-line no-param-reassign
      event.res.statusCode = 422;
      return validationErrorResponses();
    }
    return SuccessResponse();
  });
  