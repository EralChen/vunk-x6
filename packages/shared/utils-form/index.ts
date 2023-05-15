
export const PATTERN = {
  /**
   * 由数字、26个英文字母或者下划线以及中文组成的字符串
   */
  normal: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
  /**
   * 只能由数字或字母组成, 且不能以数字开头
   */
  code: /^[a-zA-Z][a-zA-Z0-9]*$/,
}

