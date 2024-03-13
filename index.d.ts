export type response =
    | String
    | Number
    | Object
    | Array<String | Number | Object>;

declare function response_interceptor(res: response): Promise<response>;

export class Myxios {
    constructor(response_interceptors?: Array<response_interceptor>);
    response_interceptors: Array<response_interceptor>;
    request(url: String, options?: Object): Promise<response>;
    requestOneTimeIntercepts(url: String, options?: Object, interceptors?: Array<response_interceptor>): Promise<response>;
    addResponseInterceptor(interceptor: response_interceptor): void;
    removeResponseInterceptor(interceptor: response_interceptor): void;
}


export function createInstance(response_interceptors?: Array<response_interceptor>): Myxios;

declare function dispatchRequest(url: String, options?: Object): Promise<response>;

declare function paramCarryPromise(param: response, promise: Promise<response>): Promise<response>;