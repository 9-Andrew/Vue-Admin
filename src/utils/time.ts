export function getTime() {
  const hour = new Date().getHours()
  return hour <= 9 ? '早上' : hour <= 12 ? '上午' : hour <= 17 ? '下午' : '晚上'
}
