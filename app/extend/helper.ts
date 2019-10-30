
export default {
  parseInt(str: string | number, defaultValue = 0) {
    if (typeof str === 'number') return str;
    if (!str) return defaultValue;
    return parseInt(str) || defaultValue;
  },
  rand(len: number, type: 'number' | 'string' | 'all'): string {
    let char = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let mix = char.concat(num);

    let str = '';
    for (let i = 0; i < len; i ++) {
      let temp;
      switch (type) {
        case 'all':
          temp = mix;
          break;
        case 'number':
          temp = num;
          break;
        case 'string':
          temp = char;
          break;
      }
      str += temp[Math.floor(Math.random() * 1000 % temp.length)];
    }

    return str;
  }
}
