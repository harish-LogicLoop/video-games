import { IGame } from "./game"

export interface IPagination {
    pageIndex: number
    pageSize: number
    count: number
    data: IGame[]
}
