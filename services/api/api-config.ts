export interface ApiConfig {
  url: string
  timeoutInMillis: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.NEXT_PUBLIC_API_URL || "",
  timeoutInMillis: Number(process.env.NEXT_PUBLIC_API_TIMEOUT_IN_MILLIS) || 10000,
}

export const DEFAULT_SERVER_SIDE_API_CONFIG: ApiConfig = {
  url: process.env.NEXT_PUBLIC_SERVER_SIDE_API_URL || "",
  timeoutInMillis: Number(process.env.NEXT_PUBLIC_API_TIMEOUT_IN_MILLIS) || 10000,
}
