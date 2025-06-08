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
