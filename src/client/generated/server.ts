/**
 * Generated code from OpenAPI schema, DO NOT EDIT MANUALLY.
 */

type GetResponseType<
  ParseResponseFn extends ParseResponseFunctionInterface<any>,
> = Parameters<ParseResponseFn>[0];

// types
export type HttpMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch';

export type ParseRequestFunctionInterface<
  Path extends string,
  Method extends HttpMethod,
  RequestParsed,
> = (req: Bun.BunRequest<Path>, method: Method) => RequestParsed;

export type InferParsedRequest<
  Path extends string,
  Method extends HttpMethod,
  T extends ParseRequestFunctionInterface<Path, Method, any>,
> = T extends ParseRequestFunctionInterface<Path, Method, infer R> ? R : never;

export type ParseResponseFunctionInterface<Data> = (
  data: Data,
  metadata: { contentType: string }
) => Response;

export type BunPathToOpenapiPath = {
  '/:userId/lists': '/{userId}/lists';
  '/:userId/lists/:listId': '/{userId}/lists/{listId}';
  '/:userId/lists/:listId/accommodation-ids': '/{userId}/lists/{listId}/accommodation-ids';
  '/:userId/lists/create': '/{userId}/lists/create';
  '/:userId/lists/:listId/update': '/{userId}/lists/{listId}/update';
  '/:userId/lists/:listId/delete': '/{userId}/lists/{listId}/delete';
  '/:userId/lists/:listId/item/add': '/{userId}/lists/{listId}/item/add';
  '/:userId/lists/:listId/item/:accommodationId/remove': '/{userId}/lists/{listId}/item/{accommodationId}/remove';
};

export type BunPath = keyof BunPathToOpenapiPath;

export type OpenapiPath =
  | '/{userId}/lists'
  | '/{userId}/lists/{listId}'
  | '/{userId}/lists/{listId}/accommodation-ids'
  | '/{userId}/lists/create'
  | '/{userId}/lists/{listId}/update'
  | '/{userId}/lists/{listId}/delete'
  | '/{userId}/lists/{listId}/item/add'
  | '/{userId}/lists/{listId}/item/{accommodationId}/remove';

export type RequestBodyDef = {
  content: Record<string, any>;
};

export type MethodDefinition = {
  requestBody?: RequestBodyDef;
  responses: {};
};

export type PathMethods = {
  parameters?: { [key: string]: any };
} & {
  [M in HttpMethod]?: MethodDefinition;
};

export type PathsObject = Record<string, PathMethods>;

export type GetOpenapiRequestMethodDef<
  Paths extends PathsObject,
  Path extends keyof Paths,
  Method extends HttpMethod,
> = Paths[Path][Method] extends MethodDefinition ? Paths[Path][Method] : never;

export type GetOpenapiRequestBodyDef<MetgodDef extends MethodDefinition> =
  MetgodDef['requestBody'] extends undefined
    ? never
    : NonNullable<MetgodDef['requestBody']>;

export type GetRequestBodyType<Def extends RequestBodyDef> =
  Def['content'] extends {
    'application/json': any;
  }
    ? Def['content']['application/json']
    : never;

export type GetOpenapiRequestBodyType<
  Paths extends PathsObject,
  Path extends keyof Paths,
  Method extends HttpMethod,
> = GetRequestBodyType<
  GetOpenapiRequestBodyDef<GetOpenapiRequestMethodDef<Paths, Path, Method>>
>;

export type ParsePaths<Paths extends {}> = {
  [K in keyof Paths]: K extends string ? Paths[K] : never;
};

export type GetOpenapiRequestBodyTypeMap<Paths extends PathsObject> = {
  [K in keyof Paths]: {
    [M in keyof Paths[K]]: M extends HttpMethod
      ? GetOpenapiRequestBodyType<Paths, K, M>
      : never;
  };
};

export type GetDefaultRequestTypeMap = {
  '/{userId}/lists': { get: Bun.BunRequest<'/:userId/lists'> };
  '/{userId}/lists/{listId}': { get: Bun.BunRequest<'/:userId/lists/:listId'> };
  '/{userId}/lists/{listId}/accommodation-ids': {
    get: Bun.BunRequest<'/:userId/lists/:listId/accommodation-ids'>;
  };
  '/{userId}/lists/create': { post: Bun.BunRequest<'/:userId/lists/create'> };
  '/{userId}/lists/{listId}/update': {
    patch: Bun.BunRequest<'/:userId/lists/:listId/update'>;
  };
  '/{userId}/lists/{listId}/delete': {
    delete: Bun.BunRequest<'/:userId/lists/:listId/delete'>;
  };
  '/{userId}/lists/{listId}/item/add': {
    post: Bun.BunRequest<'/:userId/lists/:listId/item/add'>;
  };
  '/{userId}/lists/{listId}/item/{accommodationId}/remove': {
    delete: Bun.BunRequest<'/:userId/lists/:listId/item/:accommodationId/remove'>;
  };
};

export type GetDefaultRequestTypeMapWithBody<
  T extends {},
  Paths = ParsePaths<T>,
> = Paths extends PathsObject
  ? {
      [K in keyof GetOpenapiRequestBodyTypeMap<Paths>]: {
        [M in keyof GetOpenapiRequestBodyTypeMap<Paths>[K]]: {
          getBody: () => Promise<GetOpenapiRequestBodyTypeMap<Paths>[K][M]>;
        };
      };
    }
  : never;

// built in functions

/**
 * Default request parser function that returns the request as is.
 *
 * @param req - The Bun request object.
 * @return The request object itself.
 */
export const defaultParseRequest = (<Path extends string>(
  req: Bun.BunRequest<Path>
) => {
  return req;
}) satisfies ParseRequestFunctionInterface<any, any, any>;

/**
 * Default response parser function that handles JSON and text responses.
 *
 * @param data - The data to be returned in the response.
 * @param metadata - Metadata containing the content type.
 * @return A Response object with the appropriate content type and status code.
 */
export const defaultParseResponse = ((
  data: { statusCode: number; responseData: object },
  { contentType }: { contentType: string }
) => {
  if (contentType === 'application/json') {
    return Response.json(data.responseData, { status: data.statusCode });
  }
  return new Response(data.responseData.toString(), {
    status: data.statusCode,
    headers: {
      'Content-Type': contentType,
    },
  });
}) satisfies ParseResponseFunctionInterface<any>;

export const defaultParseRequestWithBody = (x: Bun.BunRequest<any>) => ({
  getBody: (): Promise<any> => {
    if (x.headers.get('content-type') !== 'application/json') {
      throw new Error(
        'Unable to parse request body, expected application/json'
      );
    }
    return x.json() as any;
  },
});

export type ParsedResponseMap = Partial<
  Record<OpenapiPath, Partial<Record<HttpMethod, any>>>
>;

// interface
export type ServerInterface<
  ResMap extends ParsedResponseMap,
  ParseResponseFn extends ParseResponseFunctionInterface<any>,
> = {
  getUseridLists: (
    parsed: ResMap['/{userId}/lists'] extends { get: any }
      ? ResMap['/{userId}/lists']['get']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  getUseridListsListid: (
    parsed: ResMap['/{userId}/lists/{listId}'] extends { get: any }
      ? ResMap['/{userId}/lists/{listId}']['get']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  getUseridListsListidAccommodationIds: (
    parsed: ResMap['/{userId}/lists/{listId}/accommodation-ids'] extends {
      get: any;
    }
      ? ResMap['/{userId}/lists/{listId}/accommodation-ids']['get']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  postUseridListsCreate: (
    parsed: ResMap['/{userId}/lists/create'] extends { post: any }
      ? ResMap['/{userId}/lists/create']['post']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  patchUseridListsListidUpdate: (
    parsed: ResMap['/{userId}/lists/{listId}/update'] extends { patch: any }
      ? ResMap['/{userId}/lists/{listId}/update']['patch']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  deleteUseridListsListidDelete: (
    parsed: ResMap['/{userId}/lists/{listId}/delete'] extends { delete: any }
      ? ResMap['/{userId}/lists/{listId}/delete']['delete']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  postUseridListsListidItemAdd: (
    parsed: ResMap['/{userId}/lists/{listId}/item/add'] extends { post: any }
      ? ResMap['/{userId}/lists/{listId}/item/add']['post']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
  deleteUseridListsListidItemAccommodationidRemove: (
    parsed: ResMap['/{userId}/lists/{listId}/item/{accommodationId}/remove'] extends {
      delete: any;
    }
      ? ResMap['/{userId}/lists/{listId}/item/{accommodationId}/remove']['delete']
      : never
  ) => Promise<GetResponseType<ParseResponseFn>>;
};

// routes
export const createOpenapiRoutes = <
  ResMap extends ParsedResponseMap,
  ResponseFn extends ParseResponseFunctionInterface<any>,
>(
  parseRequest: (x: Bun.BunRequest<string>, method: string) => any,
  responseParser: ResponseFn,
  service: ServerInterface<ResMap, ResponseFn>
) => {
  return {
    '/:userId/lists': {
      GET: async (x: Bun.BunRequest<'/:userId/lists'>) => {
        const res = await service.getUseridLists(parseRequest(x, 'get') as any);
        return responseParser(res, { contentType: 'application/json' });
      },
    },
    '/:userId/lists/:listId': {
      GET: async (x: Bun.BunRequest<'/:userId/lists/:listId'>) => {
        const res = await service.getUseridListsListid(
          parseRequest(x, 'get') as any
        );
        return responseParser(res, { contentType: 'application/json' });
      },
    },
    '/:userId/lists/:listId/accommodation-ids': {
      GET: async (
        x: Bun.BunRequest<'/:userId/lists/:listId/accommodation-ids'>
      ) => {
        const res = await service.getUseridListsListidAccommodationIds(
          parseRequest(x, 'get') as any
        );
        return responseParser(res, { contentType: 'application/json' });
      },
    },
    '/:userId/lists/create': {
      POST: async (x: Bun.BunRequest<'/:userId/lists/create'>) => {
        const res = await service.postUseridListsCreate(
          parseRequest(x, 'post') as any
        );
        return responseParser(res, { contentType: 'application/json' });
      },
    },
    '/:userId/lists/:listId/update': {
      PATCH: async (x: Bun.BunRequest<'/:userId/lists/:listId/update'>) => {
        const res = await service.patchUseridListsListidUpdate(
          parseRequest(x, 'patch') as any
        );
        return responseParser(res, { contentType: 'text/plain' });
      },
    },
    '/:userId/lists/:listId/delete': {
      DELETE: async (x: Bun.BunRequest<'/:userId/lists/:listId/delete'>) => {
        const res = await service.deleteUseridListsListidDelete(
          parseRequest(x, 'delete') as any
        );
        return responseParser(res, { contentType: 'text/plain' });
      },
    },
    '/:userId/lists/:listId/item/add': {
      POST: async (x: Bun.BunRequest<'/:userId/lists/:listId/item/add'>) => {
        const res = await service.postUseridListsListidItemAdd(
          parseRequest(x, 'post') as any
        );
        return responseParser(res, { contentType: 'text/plain' });
      },
    },
    '/:userId/lists/:listId/item/:accommodationId/remove': {
      DELETE: async (
        x: Bun.BunRequest<'/:userId/lists/:listId/item/:accommodationId/remove'>
      ) => {
        const res =
          await service.deleteUseridListsListidItemAccommodationidRemove(
            parseRequest(x, 'delete') as any
          );
        return responseParser(res, { contentType: 'text/plain' });
      },
    },
  };
};
