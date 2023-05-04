export type FlowCallback = {
  pass: FlowCallbackItem;
  reject: FlowCallbackItem;
}

export type FlowCallbackItem = {
  updateFormData: {
    id?: number
    label?: string
    value: string
    prop: string
  }[];
  notify: {
    operId: string
    operName: string
  }[]
}