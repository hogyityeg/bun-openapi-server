/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/{userId}/lists': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Gets the lists of a user
     * @description This endpoint returns all lists created by a user, including the list count and details of each list.
     *     It is useful for retrieving all lists associated with a user.
     *
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Ok */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ListsResponse'];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/{listId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Gets the list details & content
     * @description This endpoint returns the details of a specific list, including its title and all items within it.
     *     It is useful for viewing the contents of a list.
     *
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Ok */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ListResponse'];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description List not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/{listId}/accommodation-ids': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Gets all the accommodation ids saved to a list
     * @description This endpoint returns all the accommodation IDs that are saved in a specific list.
     *     It is useful for quickly retrieving the IDs without fetching full accommodation details.
     *
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Ok */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['ListAccomIdsResponse'];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/create': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Creates a list
     * @description This endpoint allows you to create a new list for a user.
     *     The list will be empty initially.
     *
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
        };
        cookie?: never;
      };
      /** @description Create list payload */
      requestBody?: {
        content: {
          'application/json': components['schemas']['CreateListRequest'];
        };
      };
      responses: {
        /** @description Ok */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': components['schemas']['CreateListResponse'];
          };
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/{listId}/update': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /**
     * Update a list
     * @description This endpoint allows you to update the title of a list.
     *
     */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
        };
        cookie?: never;
      };
      /** @description Update list payload */
      requestBody?: {
        content: {
          'application/json': components['schemas']['UpdateListRequest'];
        };
      };
      responses: {
        /** @description Ok */
        204: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    trace?: never;
  };
  '/{userId}/lists/{listId}/delete': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Delete a list
     * @description This endpoint allows you to delete a list permanently, including all its items.
     *
     */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Ok */
        204: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/{listId}/item/add': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Add item to a list
     * @description This endpoint allows you to add an item to a list.
     *     If the item already exists in another list of the user, it will be removed from that
     *     list before being added to the specified list. If the item exists in the
     *     specified list, it will be updated with the new details.
     *
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
        };
        cookie?: never;
      };
      /** @description Add item to list payload */
      requestBody?: {
        content: {
          'application/json': components['schemas']['AddListItemRequest'];
        };
      };
      responses: {
        /** @description Ok */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{userId}/lists/{listId}/item/{accommodationId}/remove': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Remove item from a list
     * @description This endpoint allows you to remove an item from a list.
     *
     */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          userId: string;
          listId: number;
          accommodationId: number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Ok */
        204: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
        /** @description Bad Request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
        /** @description Internal Server Error */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': string;
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    ListsResponse: {
      /** Format: int */
      listCount: number;
      lists: components['schemas']['ListOverviewItem'][];
    };
    ListOverviewItem: {
      title: string;
      /** Format: int64 */
      listId: number;
    };
    ListResponse: {
      title: string;
      createdAt: string;
      items: components['schemas']['ListItem'][];
    };
    ListItem: {
      /** Format: int64 */
      accommodationId: number;
      /** Format: float */
      accommodationRatingScore: number;
      /** Format: int64 */
      accommodationRatingCount: number;
      accommodationName: string;
      accommodationCity: string;
      offerProviderName: string;
      offerProviderCode: string;
      offerDateFrom: string;
      offerDateTo: string;
      /** Format: float */
      offerPriceEur: number;
      offerPriceCurrency: string;
      offerPrice: string;
    };
    ListAccomIdsResponse: {
      accommodationIds: number[];
    };
    CreateListRequest: {
      listTitle: string;
    };
    CreateListResponse: {
      /** Format: int64 */
      listId: number;
    };
    UpdateListRequest: {
      listTitle: string;
    };
    AddListItemRequest: {
      /** Format: int64 */
      accommodationId: number;
      offerDateFrom: string;
      offerDateTo: string;
      /** Format: float */
      offerPrice: number;
      offerPriceCurrency: string;
      /** Format: float */
      offerPriceEur: number;
      offerProviderCode: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
