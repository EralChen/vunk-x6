export interface DataModel {
  id: string
  modelId: string
  table: string
  keys: string | string[] // xxx, xxx
  dir: string

  path?: string;
    
}

