// 封装本地存储方法

// 设置本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') value = JSON.stringify(value)
  window.localStorage.setItem(key, value)
}

// 获取本地存储
export const getItem = key => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

// 删除本地存储
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
