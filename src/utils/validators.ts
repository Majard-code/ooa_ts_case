export const required = (value: string) => !value ? "Заполните поле" : undefined;

export const maxLength = (maxL: number) => (value: string) => value && value.length > maxL ? `Вы ввели больше ${maxL} символов` : undefined;

export const minLength = (minL: number, name: string) => (value: string) => value && value.length < minL ? `${name} не может быть меньше ${minL} символов` : undefined;

export const alphaNumeric = (value: string) => value && /[^a-zA-Zа-яА-Я0-9 ]/i.test(value) ? 'Используйте только буквы и цифры' : undefined;

export const email = (value: string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value) ? 'Введите корректный email' : undefined;

export const password = (value: string) => value && /[^a-zA-Z0-9!@#$%^&*_]/i.test(value) ? 'Введите корректный пароль' : undefined;

export const passwordsMustMatch = (value: string, allValues: any) => value && value !== allValues.password ? 'Пароли должны совпадать' : undefined;

export const phone = (value: string) => value && !/^[0-9]{10}$/i.test(value) ? 'Введите последние 10 цифр телефона.' : undefined;

export const address = (value: string) => value && /[^a-zA-Zа-яА-Я0-9,. /]/i.test(value) ? 'Введите корректный адрес.' : undefined;

export const coordinates = (value: string) => value && !/^-?\d{1,3}\.\d{6}, -?\d{1,3}\.\d{6}$/i.test(value) ? 'Введите корректные координаты на Яндекс.Картах.' : undefined;

export const requiredPhoto = (photo: Blob) => !photo ? "Фото не загружено" : undefined;

export const photoIsPhoto = (photo: Blob) => !photo.type.match('image.*') ? "Загружено не фото" : undefined;