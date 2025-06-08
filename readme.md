# bun-openapi-server

Bun openapi server is a package designed to help users **scaffold boilerplate for the Bun server**, based on an OpenAPI manifest. This **contract-first approach** ensures good API consistency, documentation & ease of distribution across multiple platforms & languages.

GitHub: https://github.com/hogyityeg/bun-openapi-server

# Installation

* `bunx bun-openapi-server@next scaffold -i src/client/schema.yaml -o src/client/generated/server.ts`

# Basic Example

```ts
import { serve } from 'bun';
import {
  createOpenapiRoutes,
  defaultParseRequest,
  defaultParseResponse,
  GetDefaultRequestTypeMap,
} from './generated/server';

const routes = createOpenapiRoutes<
  GetDefaultRequestTypeMap,
  typeof defaultParseResponse
>(defaultParseRequest, defaultParseResponse, {
  postUseridListsCreate: async (req) => {
    return {
      responseData: {
        message: `Param is typesafe: ${req.params.userId}`,
      },
      statusCode: 201,
    };
  },
  getUseridLists: async () => {
    return {
      responseData: {},
      statusCode: 200,
    };
  },
  deleteUseridListsListidDelete: {} as any,
  getUseridListsListid: {} as any,
  deleteUseridListsListidItemAccommodationidRemove: {} as any,
  getUseridListsListidAccommodationIds: {} as any,
  patchUseridListsListidUpdate: {} as any,
  postUseridListsListidItemAdd: {} as any,
});

serve({
  port: 3000,
  routes: {
    ...routes,
  },
});
```

# Design principles

## Minimal abstraction 
The library is not designed to hide Bun server implementation details from the user. In the most basic form, it just creates the service binding, but requests and responses are still managed by the user, using the Bun types.

## Extension, not framework
The library's only purpose is to help bootstrap boilerplate code, it does not enforce any design practice. If the library is unsatifactory, or not maintained anymore, it can be very easily removed from the codebase.

## Flexibility
You choose what level of responsibility is delegated to the library: 
* **Low abstraction**: bootstrapping the routes, and binding the service 
* **Mid abstraction**: type safe request body & response body
* **Heavy abstraction**: type safe request body & response body parsing with zod 

### GitHub


[![Publish Package](https://github.com/hogyityeg/bun-openapi-server/actions/workflows/ci.yml/badge.svg?event=push)]
  (https://github.com/hogyityeg/bun-openapi-server/actions/workflows/ci.yml)
