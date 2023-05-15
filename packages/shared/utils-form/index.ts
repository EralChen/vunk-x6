
export const PATTERN = {
  /**
   * 由数字、26个英文字母或者下划线组成的字符串
   */
  normal: /^\w+$/,
  /**
   * 只能由数字或字母组成, 且不能以数字开头
   */
  code: /^[a-zA-Z][a-zA-Z0-9]*$/,
}

