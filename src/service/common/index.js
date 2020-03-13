
/*
 * 根据类型值返回对应名称
 * @param {number} val 对象中某个属性的 'value' 值
 * @param {Object} obj 对象
 * @return {string} 返回obj.value === val 对应的'text' 属性值
 */
export const convertAttrName = (val, obj) => {
  for (let stu in obj) {
    if (obj.hasOwnProperty(stu)) {
      if (obj[stu].value === parseInt(val)) {
        return obj[stu].text
      }
    }
  }
  return ''
}
