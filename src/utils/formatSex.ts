/**
 * 格式化性别代码为可读文本
 * @param sex 性别代码 - 1: 男, 0: 女, 其他值(包括null): 未定义
 * @returns 格式化后的性别文本
 */
export function formatSex(sex: string | number | null): string {
  if (sex === '1' || sex === 1) {
    return '男'
  }
  else if (sex === '0' || sex === 0) {
    return '女'
  }
  else {
    return '未定义'
  }
}
