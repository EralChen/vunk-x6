export enum FieldType {
  String = 'String',
  Integer = 'Integer',
  Boolean = 'Boolean',
  Number = 'Number',
  Object = 'Object',
  ArrayString = 'ArrayString',
  ArrayInteger = 'ArrayInteger',
  ArrayBoolean = 'ArrayBoolean',
  ArrayNumber = 'ArrayNumber',
  ArrayObject = 'ArrayObject',
}
export const fieldTypeOptions = [
  {
    label: 'String',
    value: FieldType.String,
  },
  {
    label: 'Integer',
    value: FieldType.Integer,
  },
  {
    label: 'Boolean',
    value: FieldType.Boolean,
  },
  {
    label: 'Number',
    value: FieldType.Number,
  },
  {
    label: 'Object',
    value: FieldType.Object,
  },
  {
    label: 'Array<String>',
    value: FieldType.ArrayString,
  },
  {
    label: 'Array<Integer>',
    value: FieldType.ArrayInteger,
  },
  {
    label: 'Array<Boolean>',
    value: FieldType.ArrayBoolean,
  },
  {
    label: 'Array<Number>',
    value: FieldType.ArrayNumber,
  },
  {
    label: 'Array<Object>',
    value: FieldType.ArrayObject,
  },
]
export const fieldTypeMap = fieldTypeOptions.reduce((acc, cur) => {
  acc[cur.value] = cur
  return acc
}, {} as Record<FieldType, typeof fieldTypeOptions[number]>)
