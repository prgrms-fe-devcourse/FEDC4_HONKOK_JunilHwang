const errors = {
  badRequest: {
    name: 'Bad Request',
    statusCode: 400,
    message: '잘못된 요청입니다.'
  },
  unauthorized: {
    name: 'Unauthorized',
    statusCode: 401,
    message: '이메일 혹은 비밀번호를 잘못 입력했습니다.'
  },
  serverError: {
    name: 'Internal Server Error',
    statusCode: 500,
    message: '알 수 없는 에러가 발생했습니다.'
  }
} as const;

type Errors = typeof errors;

export class ApiError extends Error {
  public statusCode;

  public constructor(type: keyof Errors) {
    super(errors[type].message);
    this.name = errors[type].name;
    this.statusCode = errors[type].statusCode;
  }
}
