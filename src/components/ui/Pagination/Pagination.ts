export type PaginationProps = {
    page: number
    totalPages: number
    changePage(p: number): void
}