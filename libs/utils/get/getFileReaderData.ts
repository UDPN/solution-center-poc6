/**
 * @description
 * @type {Function}
 * @param file
 * @param fn
 */
export const getFileReaderData = (file: File, fn: () => void): void => {
  if (window.FileReader) {
    const reader = new FileReader();
    reader.onload = function (): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn(this?.result); // this -> FileReader
    };
    reader.readAsText(file);
  }
};
