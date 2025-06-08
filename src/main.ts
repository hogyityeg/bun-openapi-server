import SwaggerParser from '@apidevtools/swagger-parser';
import { command, option, run, string, subcommands } from 'cmd-ts';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { load } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types/dist';
import path from 'path';
import prettier from 'prettier';
import { first, firstOrFail, isRouteParameter } from './utils';

const scaffoldCommand = command({
  name: 'download',
  description: 'Download the schema from the given source',
  args: {
    inputFilePath: option({
      type: string,
      long: 'inputFilePath',
      short: 'i',
      description: 'Input file path for the schema to be downloaded',
    }),
    outputFilePath: option({
      type: string,
      long: 'outputFilePath',
      short: 'o',
      description: 'Output file path for the scaffolded schema',
    }),
  },
  handler: async ({ inputFilePath, outputFilePath }) => {
    if (!existsSync(inputFilePath)) {
      throw new Error(`Input file path ${inputFilePath} does not exist.`);
    }

    if (!inputFilePath.endsWith('.yaml')) {
      throw new Error(`Input file path ${inputFilePath} must be a TS file.`);
    }

    const data = readFileSync(inputFilePath, 'utf-8');
    const parsed = load(data);
    const validated = (await SwaggerParser.validate(
      parsed as any
    )) as OpenAPIV3.Document;
    const paths = validated.paths;

    if (!validated.paths) {
      throw new Error(`No paths found in the schema at ${inputFilePath}`);
    }

    const parsedPaths = Object.keys(paths).map((openapiPath) => {
      const pathObject = paths[openapiPath];
      if (!pathObject) {
        throw new Error(`Path object for ${openapiPath} is undefined or null`);
      }

      const methods = getPathMethods(pathObject);
      if (methods.length === 0) {
        throw new Error(`No methods found for path ${openapiPath}`);
      }
      if (methods.length > 1) {
        throw new Error(
          `Multiple methods found for path ${openapiPath}: ${methods.join(', ')}`
        );
      }
      const methodUpper = methods[0];

      const segments = openapiPath.split('/');
      const cleanedSegments = segments.map((segment) => {
        if (isRouteParameter(segment)) {
          return segment.slice(1, -1); // Remove the curly braces
        }
        return segment;
      });

      const routeAsPascalCase =
        methodUpper +
        cleanedSegments
          .filter((segment) => segment.length > 0)
          .map((segment) => {
            const words = segment.split(/[-_]/);
            return words
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join('');
          })
          .join('');

      const bunRoute = segments
        .map((x) => (isRouteParameter(x) ? `:${x.slice(1, -1)}` : x))
        .join('/');

      return {
        routeAsPascalCase,
        openapiPath,
        pathObject,
        methodUpper,
        methodLower: methodUpper.toLowerCase(),
        methods,
        segments,
        methodObject: pathObject[methodUpper],
        bunRoute,
      };
    });

    const routesText = parsedPaths.map((x) => {
      const responses = x.methodObject?.responses;
      if (!responses) {
        throw new Error(
          `No responses found for method ${x.methodLower} at path ${x.openapiPath}`
        );
      }

      const okResponseCode = firstOrFail(Object.keys(responses), (x) =>
        x.startsWith('2')
      );

      const okResponse = responses[okResponseCode] as OpenAPIV3.ResponseObject;
      const contentTypeKey = first(Object.keys(okResponse?.content || {}));
      const contentType = contentTypeKey || 'text/plain';

      const ads = `
        async (x: Bun.BunRequest<"${x.bunRoute}">) => {
          const res = await service.${x.routeAsPascalCase}(parseRequest(x, "${x.methodLower}") as any);
          return responseParser(res, { contentType: "${contentType}" });
        }
      `;

      const text = `"${x.bunRoute}": {
        ${x.methods.map((method) => `${method.toUpperCase()}: ${ads}`).join(',\n')}
      }`;
      return text;
    });

    const outputData = `
      /**
       * Generated code from OpenAPI schema, DO NOT EDIT MANUALLY.
       */
 
      type GetResponseType<ParseResponseFn extends ParseResponseFunctionInterface<any>> = Parameters<ParseResponseFn>[0]

      // types
      export type HttpMethod =
        | 'get'
        | 'put'
        | 'post'
        | 'delete'
        | 'options'
        | 'head'
        | 'patch';

      export type ParseRequestFunctionInterface<Path extends string, Method extends HttpMethod, RequestParsed> = (
        req: Bun.BunRequest<Path>, method: Method) => RequestParsed
      
      export type InferParsedRequest<
        Path extends string, 
        Method extends HttpMethod,
        T extends ParseRequestFunctionInterface<Path, Method, any>> = T extends ParseRequestFunctionInterface<Path, Method, infer R> ? R : never;

      export type ParseResponseFunctionInterface<Data> = (data: Data, metadata: { contentType: string }) => Response; 

      export type BunPathToOpenapiPath = {
        ${parsedPaths.map((x) => `"${x.bunRoute}": "${x.openapiPath}"`).join(',\n')}
      };
      
      export type BunPath = keyof BunPathToOpenapiPath;

      export type OpenapiPath = ${parsedPaths.map((x) => `"${x.openapiPath}"`).join(' | ')};
      
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
        ${parsedPaths.map((x) => `"${x.openapiPath}": { ${x.methodLower}: Bun.BunRequest<"${x.bunRoute}"> }`).join(',\n')}
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
      export const defaultParseRequest = (<Path extends string>(req: Bun.BunRequest<Path>) => {
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
        if (contentType === "application/json") {
          return Response.json(data.responseData, { status: data.statusCode });
        }
        return new Response(data.responseData.toString(), {
          status: data.statusCode,
          headers: {
            "Content-Type": contentType,
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
      >

      // interface 
      export type ServerInterface<
        ResMap extends ParsedResponseMap,
        ParseResponseFn extends ParseResponseFunctionInterface<any>,  
      > = {
        ${parsedPaths
          .map((x) => {
            const routeName = x.routeAsPascalCase;
            return `${routeName}: (
              parsed: ResMap['${x.openapiPath}'] extends { ${x.methodLower}: any }
                ? ResMap['${x.openapiPath}']['${x.methodLower}']
                : never 
            ) => Promise<GetResponseType<ParseResponseFn>>;`;
          })
          .join('\n')}
      };

      // routes 
      export const createOpenapiRoutes = <
        ResMap extends ParsedResponseMap,
        ResponseFn extends ParseResponseFunctionInterface<any>
      >(parseRequest: (x: Bun.BunRequest<string>, method: string) => any, responseParser: ResponseFn, service: ServerInterface<ResMap, ResponseFn>) => {
        return {
          ${routesText.join(',\n')}
        }
      }`;

    const folder = path.dirname(outputFilePath);
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }

    writeFileSync(outputFilePath, outputData, 'utf-8');
    try {
      await formatFile(outputFilePath);
    } catch (_) {
      console.error(`Error formatting file ${outputFilePath}`);
    }

    console.log(`Scaffolded schema saved to ${outputFilePath}`);
  },
});

type HttpMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch';

function getPathMethods(path: OpenAPIV3.PathsObject[string]): HttpMethod[] {
  if (!path) {
    throw new Error('Path is undefined or null');
  }
  const methods: HttpMethod[] = [];
  if (path.get) methods.push('get');
  if (path.put) methods.push('put');
  if (path.post) methods.push('post');
  if (path.delete) methods.push('delete');
  if (path.options) methods.push('options');
  if (path.head) methods.push('head');
  if (path.patch) methods.push('patch');
  return methods;
}

const genCommand = subcommands({
  name: 'gen',
  description: 'Generate code from the schema',
  cmds: {
    scaffold: scaffoldCommand,
  },
});

run(genCommand, process.argv.slice(2)).catch((error) => {
  console.error('Error running command:', error);
  process.exit(1);
});

async function formatFile(filePath: string) {
  const text = readFileSync(filePath, 'utf8');
  const config = (await prettier.resolveConfig(filePath)) ?? {};
  const formatted = await prettier.format(text, {
    ...config,
    filepath: filePath,
  });
  writeFileSync(filePath, formatted, 'utf8');
}
