export type response =
    | String
    | Number
    | Object
    | Array<String | Number | Object>;

declare function response_interceptor(res: response): Promise<response>|Promise<Array<response>>;

export class Myxios {
    constructor(response_interceptors?: Array<response_interceptor>);
    response_interceptors: Array<response_interceptor>;
    request(url: String, options?: Object): Promise<Array<response>>;
    requestOneTimeIntercepts(url: String, options?: Object, interceptors?: Array<response_interceptor>): Promise<Array<response>>;
    addResponseInterceptor(interceptor: response_interceptor): void;
    removeResponseInterceptor(interceptor: response_interceptor): void;
}


export function createInstance(response_interceptors?: Array<response_interceptor>): Myxios;

declare function dispatchRequest(request: Promise<response>|Promise<Array<response>>, response_interceptors?: Array<response_interceptor>|Array<response_interceptor>): Promise<Array<response>>;

declare function paramCarryPromise(param: response, promise: Promise<response>|Promise<Array<response>>,): Promise<Array<response>>;