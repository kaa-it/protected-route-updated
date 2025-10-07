/* Функция setCookie принимает три аргумента:
 *  name (имя куки),
 * value (значение куки) и
 * props (объект, содержащий дополнительные свойства куки) */
export function setCookie(name, value, props = {}) {
  console.log(props);
  props = {
    path: '/',
    ...props,
  };
  let expires = props.expires;

  // Если в объекте props передано значение для свойства expires (время жизни куки), то оно обрабатывается
  // Если expires — число (предполагается, что это количество секунд),
  // то к текущей дате прибавляется это количество секунд и устанавливается новая дата истечения
  if (typeof expires == 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = props.expires = d;
  }

  //  Если expires — объект типа Date, то он преобразуется в строку в формате UTC
  if (expires && expires instanceof Date) {
    props.expires = expires.toUTCString();
  }

  //  Значение value кодируется с использованием encodeURIComponent,
  // чтобы убедиться, что оно может быть использовано внутри куки без проблем
  value = encodeURIComponent(value);
  //  Создадим строку updatedCookie, которая содержит имя и значение куки
  let updatedCookie = name + '=' + value;

  //  Проходим по всем свойствам объекта props.
  // Каждое переданное свойство и его значение добавляем к строке updatedCookie , разделяя их «;»
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  // Находим куки по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(name, null, { expires: -1 });
}
