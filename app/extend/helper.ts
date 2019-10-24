
export default {
  parseInt(str: string | number, defaultValue = 0) {
    if (typeof str === 'number') return str;
    if (!str) return defaultValue;
    return parseInt(str) || defaultValue;
  },
}
