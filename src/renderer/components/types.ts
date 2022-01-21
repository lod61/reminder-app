export interface ListState {
  list: string
  status: boolean
  id: string
  children?: ListState[]
}
