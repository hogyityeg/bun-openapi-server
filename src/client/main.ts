import { serve } from 'bun';
import {
  createOpenapiRoutes,
  defaultParseRequestWithBody,
  defaultParseResponse,
  GetDefaultRequestTypeMapWithBody,
  ServerInterface,
} from './generated/server';
import { paths } from './generated/types';
import { serveUI } from './swagger';

const getRoutes = () => {
  type ServiceType = ServerInterface<{}, typeof defaultParseResponse>;

  const service: Pick<ServiceType, 'postUseridListsCreate' | 'getUseridLists'> =
    {
      postUseridListsCreate: async () => {
        return {
          responseData: {
            message: 'body not parsed',
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
    };

  const routes = createOpenapiRoutes<
    GetDefaultRequestTypeMapWithBody<paths>,
    typeof defaultParseResponse
  >(defaultParseRequestWithBody, defaultParseResponse, service as ServiceType);

  return routes;
};

const getRoutesWithBody = () => {
  type ServiceType = ServerInterface<
    GetDefaultRequestTypeMapWithBody<paths>,
    typeof defaultParseResponse
  >;

  const service: Pick<ServiceType, 'postUseridListsCreate' | 'getUseridLists'> =
    {
      postUseridListsCreate: async (parsed) => {
        const body = await parsed.getBody();
        return {
          responseData: body,
          statusCode: 201,
        };
      },
      getUseridLists: async () => {
        return {
          responseData: {},
          statusCode: 200,
        };
      },
    };

  type WithBodyMap = GetDefaultRequestTypeMapWithBody<paths>;

  const routes = createOpenapiRoutes<WithBodyMap, typeof defaultParseResponse>(
    defaultParseRequestWithBody,
    defaultParseResponse,
    service as ServiceType
  );

  return routes;
};

const runServer = (port: number, name: string, routes: Record<string, any>) => {
  const schemaPath = 'src/client/schema.yaml';

  serve({
    port,
    routes: {
      ...routes,
      '/docs/*': (req: Bun.BunRequest<any>) => {
        return serveUI(req, schemaPath, '/docs');
      },
    },
  });

  console.log(`Server (${name}) running on http://localhost:${port}`);
  console.log(
    `Swagger (${name}) running on http://localhost:${port}/docs/index.html`
  );
};

(async () => {
  await runServer(3000, 'simple', getRoutes());
  await runServer(3001, 'with body', getRoutesWithBody());
})();
