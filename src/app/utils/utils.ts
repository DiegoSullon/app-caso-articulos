const getUrl = (img: any): string => {
  if (img.includes(':-:')) {
    let len = img.length;
    let substr = img.substring(img.indexOf(':-:'), len);
    return img.replace(substr, '');
  } else {
    return img;
  }
};
export {getUrl}
