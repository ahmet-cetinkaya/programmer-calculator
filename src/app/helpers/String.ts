export class String {
  static addToIndex(string: string, index: number, addedString: string) {
    if (string.length - 1 < index) return string + addedString;
    return string.slice(0, index) + addedString + string.slice(index);
  }

  static removeFromIndex(string: string, index: number) {
    if (string.length - 1 < index) return string.slice(0, -1);
    return string.slice(0, index) + string.slice(index + 1);
  }
}
