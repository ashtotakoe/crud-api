export interface SimpleResponse {
  headers: Record<string, string | number>
  body: string
  status: number
}
