const validationErrorResponses = () => ({
  meta: {
    error_message: {
      current_password: [
        'Mật khẩu cũ không đúng',
        'Mật khẩu cũ không đúng',
      ],
      confirm_password: [
        'Mật khẩu nhập lại không đúng',
        'Mật khẩu nhập lại không đúng',
      ],
    }
  }
});

export default defineEventHandler(async (event) => {
  const body = await useBody(event.req);
  if (body.current_password === 'a') {
    // eslint-disable-next-line no-param-reassign
    event.res.statusCode = 422;
    return validationErrorResponses();
  }
  return true;
});
