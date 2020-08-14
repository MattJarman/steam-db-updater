import Axios, { AxiosInstance, AxiosResponse } from 'axios'

declare module 'axios' {
  // eslint-disable-next-line
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance

  protected constructor(baseURL: string) {
    this.instance = Axios.create({
      baseURL
    })

    this._initialiseResponseInterceptor()
  }

  private _initialiseResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: unknown): Promise<unknown> =>
    Promise.reject(error)
}

export default HttpClient
