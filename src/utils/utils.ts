export const beautifulPhone: (tenNumbersPhone: string) => string = tenNumbersPhone => {
  if(tenNumbersPhone.length === 10) {
    const str = tenNumbersPhone;
    const newStr = `+7 (${str.slice(0, 3)}) ${str.slice(3, 6)} ${str.slice(6, 8)} ${str.slice(8, 10)}`;
    return newStr;
  } else {
    return "Error";
  }
}

export const toFormData: (datas: any) => FormData = datas => {
  let formData = new FormData();
  for(var key in datas) {
    formData.append(key, datas[key]);
 }
 return formData;
}