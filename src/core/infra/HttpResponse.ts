export type HttpResponse = {
  statusCode: number
  body: any;
}

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  };
}

export function created<T>(dto?: T): HttpResponse {
  return {
    statusCode: 201,
    body: dto,
  };
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function tooMany(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}

export function fail(error: Error) {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: {
        message: error.message,
        name: error.name,
      },
    },
  };
}