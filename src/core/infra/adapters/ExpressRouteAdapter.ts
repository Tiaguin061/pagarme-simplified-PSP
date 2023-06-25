import { Request, Response } from 'express';

import { Controller } from '../Controller';
import { HttpResponse } from '../HttpResponse';

const adaptRequest = (request: Request) => {
  return {
    ...request.body,
    ...request.params,
    ...request.query,
    // userId: request.userId,
  };
}

const isSuccessful = (statusCode: number) => {
  return statusCode >= 200 && statusCode <= 299;
}

const adaptResponse = (result: HttpResponse, response: Response) => {
  const { statusCode } = result;

  if (isSuccessful(statusCode)) {
    return response.status(statusCode).json(result);
  }

  return response.status(statusCode).json(result);
}

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = adaptRequest(request);

    const result = await controller.handle(requestData);

    adaptResponse(result, response);
  }
}


