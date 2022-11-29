export class BaseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(options: BaseErrorOptions) {
    super(options.msg);
    this.status = options.status;
    this.code = options.code;
    this.data = options.data;
  }

  private status: number;
  private code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private data?: any;
  public stack?: string;

  toJSON() {
    const response: {
      code?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [p: string]: any; // response may be any
    } = {
      msg: this.message,
    };

    if (this.data) Object.assign(response, this.data);
    if (this.code) response.code = this.code;

    return {
      status: this.status,
      response,
    };
  }
}

class UnauthenticatedError extends BaseError {
  constructor() {
    super({ msg: 'Unauthenticated', status: 401 });
  }
}
class PermissionError extends BaseError {
  constructor() {
    super({ msg: 'Permission denied', status: 403 });
  }
}
class RequstStatusError extends BaseError {
  constructor() {
    super({
      msg: "Your registration request wasn't confirmed yet. Check your Email.",
      status: 403,
    });
  }
}
class NotFoundError extends BaseError {
  constructor() {
    super({ msg: 'Not Found', status: 404 });
  }
}
class ConflictError extends BaseError {
  constructor() {
    super({ msg: 'User is already registered', status: 409 });
  }
}

class ConflictEmail extends BaseError {
  constructor() {
    super({ msg: 'User is already has such email', status: 409 });
  }
}
class LoginEmailConflictError extends BaseError {
  constructor() {
    super({ msg: 'User with this email is not registered', status: 404 });
  }
}

class LoginPasswordConflictError extends BaseError {
  constructor() {
    super({ msg: 'Invalid password', status: 401 });
  }
}

class LoginRejectionError extends BaseError {
  constructor() {
    super({ msg: 'Your registration request was rejected', status: 405 });
  }
}

class UnprocessableEntityError extends BaseError {
  constructor(options: { code?: string; data?: object } = {}) {
    super({ ...options, msg: 'Unprocessable Entity', status: 422 });
  }
}

class InternalServerError extends BaseError {
  constructor(options: { stack?: string } = {}) {
    super({ ...options, msg: 'Internal Server Error', status: 500 });
  }
}

class ManagerConflict extends BaseError {
  constructor(options: { stack?: string } = {}) {
    super({
      ...options,
      msg: 'You can`t add this user to your team because he/she is your manager',
      status: 403,
    });
  }
}

class HigherManagerConflict extends BaseError {
  constructor(options: { stack?: string } = {}) {
    super({
      ...options,
      msg: 'You can`t add user of higher manager level',
      status: 403,
    });
  }
}

export const createError = {
  RequstStatusError: RequstStatusError,
  PermissionError: PermissionError,
  Unauthenticated: UnauthenticatedError,
  NotFound: NotFoundError,
  ConflictError: ConflictError,
  UnprocessableEntity: UnprocessableEntityError,
  InternalServerError: InternalServerError,
  LoginEmailConflictError: LoginEmailConflictError,
  LoginPasswordConflictError: LoginPasswordConflictError,
  LoginRejection: LoginRejectionError,
  ConflictEmail: ConflictEmail,
  ManagerConflict: ManagerConflict,
  HigherManagerConflict: HigherManagerConflict,
};

export interface BadDataError {
  // number is added to satisfy joi's typings, in
  // most cases string is used
  path: (string | number)[];
  message: string;
  type: string;
}

interface BaseErrorOptions {
  msg: string;
  status: number;
  code?: string;
  stack?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // additional error data
}
