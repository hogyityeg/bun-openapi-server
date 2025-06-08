import path from 'path';
// @ts-ignore
import { absolutePath } from 'swagger-ui-dist';

export const serveUI = async (
  req: Bun.BunRequest,
  schemaPath: string,
  urlRoot: string
) => {
  const uiRoot = absolutePath();
  const urlParsed = new URL(req.url);
  const requestPath = urlParsed.pathname.replace(`${urlRoot}/`, '');
  const filePath = path.join(uiRoot, requestPath);

  if (filePath.endsWith('schema.yaml')) {
    return new Response(await Bun.file(schemaPath), {
      headers: {
        'Content-Type': 'plain/text',
      },
    });
  }

  if (filePath.endsWith('swagger-initializer.js')) {
    return new Response(
      `
          window.onload = function() {
            window.ui = SwaggerUIBundle({
              url: "${urlRoot}/schema.yaml",
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout"
            });
          };
        `,
      {
        headers: {
          'Content-Type': 'application/javascript',
        },
      }
    );
  }

  const fileResponse = await Bun.file(filePath);
  return new Response(fileResponse);
};
