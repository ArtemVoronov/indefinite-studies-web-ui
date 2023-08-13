export class UrlBuilder {
  url: string;
  params: Array<QueryParameter>;
  constructor(url: string, params: Array<QueryParameter>) {
    this.url = url
    this.params = params
  }

  build(): string {
    let queryParams = ""
    this.params.forEach((element: QueryParameter) => {
      queryParams += element.name + "=" + encodeURIComponent(element.value) + "&"
    })
    return this.url + "?" + queryParams.substring(0, queryParams.length - 1)
  }
}

export class QueryParameter {
  name: string
  value: any
  constructor(name: string, value: any) {
    this.name = name
    this.value = value
  }
}

export function isNil(value: any) {
  return value == null
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export type GetAllOptions = { offset?: number, limit?: number, shard?: number }

export const SPIN_ICON_SHOWING_TIMEOUT = 500
export const DEFAULT_LIMIT = 50