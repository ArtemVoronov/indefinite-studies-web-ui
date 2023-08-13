export interface ApiConfig {
  url: string
  timeoutInMillis: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.API_URL || "",
  timeoutInMillis: Number(process.env.API_TIMEOUT_IN_MILLIS) || 10000,
}
