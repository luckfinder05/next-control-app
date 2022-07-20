# 2022-07-20
- Добавил просмотр списка пользователей в базе данных
- Добавил функцию удаления пользователя из базы данных
- Добавил просмотр списка коротких ссылок в базе данных
- Добавил функцию удаления коротких ссылок из базы данных

    После деплоя на vercel.app получаю сообщение user unauthorized при обращении к любой endpoint

# 2022-07-08
- Рефакторинг кода google spreadsheets по маршрутам api/gss/...
- Перенес разметку страницы Документа-предписания (старая форма) в React


## Хочу!
- Хочу настроить валидацию формы
- Добавить фильтрацию к таблице предписаний


# 2022-07-04
Данные в выпадающих списках теперь отсортированы. Первая буква всегда заглавная.

# 2022-06-29
Пытался настроить отзывчивую верстку для формы. Не удалось. Пойду спать

# 2022-06-28 Итоги дня...
Немного настроил внешний вид таблицы:
- условное форматирование ряда таблицы согласно Статусу замечания
- добавил обязательную выдачу поля, даже, если оно отсутствует в массиве, выдаваемом googleapis


----------

# 2022-06-26 Итоги дня...

- Добавил endpoint для получения статистики из таблицы /api/gss/getStats
- Добавил отображение статистики на странице предписаний
- Добавил отображение состояния при отправке данных на сервер [disabled button, spinner, Alert info]
- Нашёл ранее сделанный шаблон документа предписания
- Добавил новый пакет с компонентом 'react-data-table-component'. Не очень удобный, зато легковесный.При отображении таблицы ничего не подвисает. И есть очень классная функция - expansion: можно уменьшить таблицы, отображая дополнительные данные при клике на строку.

Нашёл ещё один фреймворк с таблицами: [react-bootstrap-table](http://allenfang.github.io/react-bootstrap-table/index.html). Надо бы изучить.
----------

# 2022-06-25 Итоги дня...

## Google SpreadSheets

Всё таки домучал и теперь можно добавлять строчку с замечанием (пока только одним) в таблицу.
Долго мучался с обновлением форматирования таблицы.

### Сложности:

- Не работала авторизация. Пришлось настраивать авторизацию.
- Не работала авторизация после деплоя на сервер. Пришлось прописывать токены в .env
- Не работало обновление форматирования через batchUpdate потому что sheetId должен быть цифровым идентификатором непосредственно страницы в книге. Пришлось добавить функцию получения sheetId
- Не работала смена цвета границы на black. Оказалось, что в объекте "color" цвета задаются через RGB, то есть "red", "green", "blue"
- Убрал лишние строчки с границами: лево-право-верх-низ и оставил горизонтальные и вертикальные
- **Границы обновляю по всей странице. Можно попробовать обновлять только добавленные данные.**
- Не удалось выполнить добавление строки одним вызовом функции batchUpdate. Пришлось оставить отдельно добавление строки через values.append.
