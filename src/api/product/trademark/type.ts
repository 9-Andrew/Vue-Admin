interface Response {
  code: number
  message: string
  ok: string
}

interface Trademark {
  id?: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

export type Records = Trademark[]

export interface TrademarkResponse extends Response {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders?: object
    optimizeCountSql?: boolean
    hitCount: boolean
    countId?: null
    maxLimit?: null
    searchCount: boolean
    pages: number
  }
}
