# Nodejs-Core
# TASKS
### [1] Блокирующие и неблокирующие операции
Напишите программный код, который 
считывает содержимое файла с 
использованием блокирующей операции 
чтения (fs.readFileSync). Затем выведите 
содержимое файла в консоль. Попробуйте 
прочитать большой файл и оцените время, 
затраченное на чтение. Сравните это с 
временем, затраченным на чтение того же 
файла с использованием неблокирующей 
операции (fs.readFile).
### [2] fs Module
Напишите программный код, который 
запрашивает у пользователя текст и имя файла, 
затем записывает этот текст в указанный файл, 
используя функцию writeFile(). После записи 
файла выведите сообщение об успешном 
завершении операции.
### [3] events Module
Используйте EventEmitter для обработки 
событий, связанных с учетными записями, 
таких как "регистрация пользователя", "вход 
пользователя", "изменение пароля" и т.д. 
Каждое событие должно генерировать 
уведомление администратору или отправлять 
электронное письмо пользователю, 
подтверждающее действие.
### [4] path Module
Напишите программный код, который 
принимает путь к файлу в виде аргумента 
командной строки. Затем используйте 
Path.basename для получения имени файла без 
расширения и Path.resolve для абсолютного 
пути к файлу. Выведите имя файла без 
расширения и его абсолютный путь в консоль.
### [5] http Module
Создайте простое CRUD (Create, Read, Update, 
Delete) API для управления списком элементов 
(например, списком пользователей, задач и 
т.д.). Реализуйте эндпоинты для создания 
нового элемента, чтения списка всех 
элементов, чтения одного элемента по его 
идентификатору, обновления существующего 
элемента и удаления элемента.
### [6] stream Module
Напишите сервер Node.js, который принимает 
HTTP-запросы и отправляет ответы с 
использованием потоков. Например, вы 
можете создать сервер, который читает файлы 
из директории и отправляет их содержимое 
клиенту по запросу. Используйте потоки 
чтения для обработки запросов и потоки 
записи для отправки ответов.

***
# THEORY

## [1] NPM

**NPM (Node Package Manager)** - это стандартный менеджер пакетов для языка JavaScript, который широко используется в экосистеме Node.js. Он предназначен для управления зависимостями проекта, а также установки, обновления и удаления пакетов Node.js. 

### Базовые понятия 

- NPM позволяет указывать зависимости для проекта в файле **package.json**, который содержит информацию о проекте, включая его зависимости. Эти зависимости могут быть как модули, необходимые для разработки приложения, так и библиотеки, необходимые для его работы в процессе выполнения;
- **dependencies** и **devdependencies** представляют собой словари с именами npm-библиотек (ключ) и их семантические версии (значение);
- Файл **package-lock.json** описывает версии пакетов, используемые в JavaScript-проекте. Если package.json включает общее описание зависимостей (название товара), то package-lock.json более детальный – всё дерево зависимостей; package-lock.json генерируется командой npm install и читается npm CLI, чтобы обеспечить воспроизведение окружения для проекта через npm ci;
- Чтобы избежать добавления в репозитории вредоносных пакетов, организация npm.js пришла к идее аудита экосистемы, создав модуль **npm audit**. Он предоставляет информацию об уязвимостях в пакетах и о существовании версий с исправлениями. 

Важная часть – **версионирование**. Вот набор правил, указывающих, когда следует увеличить номер версии пакета:  

- **Мажорная версия**: когда сделаны обратно несовместимые изменения API. 
- **Минорная версия**: когда вы добавляете новую функциональность, не нарушая обратной совместимости.  
- **Патч-версия**: когда вы делаете обратно совместимые исправления.

*Подробнее:* [NPM Docs](https://docs.npmjs.com/)

## [2] Modules

Код разделяется на модули, каждый из которых представляет собой независимую единицу, выполняющую конкретную функцию.
### CommonJS

В модулях можно экспортировать определенные значения, функции или объекты с помощью ключевого слова **module.exports**. Другие модули могут импортировать эти значения с помощью функции **require()**. 

```js
const { myName } = require('./multiple-exports');

const myFunction = () => {
  console.log("Привет из myFunction");
}

module.exports = { myFunction, myName }; 
```
### ES Modules

**ES Modules (ECMAScript Modules)** - это стандартная система модулей JavaScript, введенная в ECMAScript 6 (ES6) или ES2015. Она предоставляет механизм импорта и экспорта, который позволяет организовывать код в модули для повторного использования, поддерживая четкое разделение областей видимости и улучшая поддержку зависимостей.

В ES Modules используется ключевые слова **import** и **export**.

*Подробнее:* [CommonJS vs ES Modules](https://www.knowledgehut.com/blog/web-development/commonjs-vs-es-modules)

## [3] Внутреннее устройство Node.js

Первая составляющая часть, которая есть в Node.js — это двигатель. Node.js использует движок **V8**, разработанный Google для браузера Chrome. V8 компилирует JavaScript код в машинный код и выполняет его.  

Так же внутри Node.js есть **встроенные модули** предоставляют базовые функциональности, такие как работа с файловой системой, сетевые операции, работа с потоками и другие.

Когда запрос приходит на сервер, **Libuv** отвечает за управление асинхронными операциями ввода/вывода, такими как чтение файлов, обращения к сети и т.д. Он позволяет Node.js выполнять множество операций параллельно без блокировки потоков. 

Связующие звенья на **C++ Bindings** устанавливают связь между JavaScript кодом и библиотеками, написанными на C++. Эти звенья обеспечивают эффективное взаимодействие между высокоуровневым кодом JavaScript и низкоуровневыми системными вызовами операционной системы. 

*Подробнее:* [Node.js Architecture](https://medium.com/dkatalis/nodejs-architecture-relationship-between-libuv-v8-and-js-7dce74cf1c51)

### Потоки и процессы 

**Потоки** и **процессы** — это два ключевых концепта, которые позволяют эффективно управлять выполнением программ. 

Процесс представляет собой экземпляр запущенной программы. Когда вы запускаете программу, операционная система создает для нее процесс. Процесс включает в себя память, ресурсы, стек вызовов и др. Например, запуск терминала или Node.js REPL создает отдельный процесс. 

Поток, с другой стороны, представляет собой путь выполнения внутри процесса. В одном процессе может быть несколько потоков, которые выполняют разные задачи параллельно.  

Параллельное выполнение потоков в одном процессе может привести к повышению производительности программы, так как они могут выполнять разные задачи одновременно, в то время как процессы работают независимо друг от друга. 

### Модель Node.js

В Node.js в рамках одного процесса - работает один поток, в рамках которого обрабатываются все задачи. В рамках этого потока выполняются и другие действия. Node.js может выполнять только одну операция, пока остальные ожидают своей очереди. Например, если в Node.js вы решили записать много данных в один файл, это все работает в одном потоке, все остальные задачи ожидают, пока вы выполните запись в большой файл.  

### Блокирующие и неблокирующие операции 

Блокирующими считаются те операции, при выполнении которых процесс Node.js вынужден ждать ее окончания, прежде чем начать выполнять следующий код. Это происходит из-за того, что приостанавливается работа Event loop. 

**Пример блокирующей операции:**
```js
const fs = require('fs');  

console.log(fs.readFileSync('./file.txt')); 
console.log('After reading file'); 
```
**Пример неблокирующей операции:**
```js
const fs = require('fs');  

fs.readFile('./file.txt', (err, data) => {  
	if (err) throw err;  
	console.log(data);  
});  
console.log('Before reading file'); 
```
## [4] Libuv  

Библиотека Libuv играет ключевую роль в том, как Node.js обрабатывает блокирующие операции асинхронно. Её составляющие - Event Loop и Thread Pool. 	

Event Loop - это бесконечный цикл, который обрабатывает события и вызывает соответствующие колбэки для этих событий. Он эффективно управляет асинхронными операциями, позволяя Node.js продолжать выполнение кода, даже когда операции ввода/вывода выполняются. Когда операция завершается, её колбэк помещается в очередь событий и выполняется в следующем цикле Event Loop. 

Thread Pool используется для выполнения блокирующих операций, таких как долгие вычисления или обращения к файловой системе. По умолчанию, в Node.js имеется небольшой пул потоков (обычно 4 потока), который используется для этих целей. Путём расширения пула потоков можно управлять параллельным выполнением таких операций и улучшить производительность приложения. 
Использование Thread Pool позволяет Node.js обрабатывать блокирующие операции без блокировки Event Loop. Вместо того, чтобы ожидать завершения операции, Node.js делегирует её выполнение в Thread Pool и продолжает обработку других событий. Когда операция завершается, её результат возвращается в основной поток выполнения через колбэк.  Так же стоит добавить, что в Thread Pool автоматически забрасываются задачки по работе с файлами и криптографией. 

**Группы событий:** 
- **nextTick** - включает в себя выполнение process.nextTick();
- **microtask** - включает в себя выполнение промисов;
- **timers**: выполнение callback-функций, зарегистрированных функциями setTimeout() и setInterval(); 
- **pending callbacks** : вызов callback-функций операций ввода/вывода, выполнение которых было отложено на предыдущей стадии цикла событий; 
- **idle, prepare**: выполнение внутренних действий, необходимых самому event loop; 
- **poll**: выполнение callback-функций завершенных асинхронных операций и управление фазой timers; 
- **check**: выполнение callback-функций, зарегистрированных функцией setImmediate(); 
- **close callbacks**: обработка внезапно завершающихся действий.

*Подробнее:* [Libuv](https://habr.com/ru/articles/336498/)

## [5] Встроенные модули

### fs

Модуль **fs** позволяет взаимодействовать с файловой системой, а именно выполнять различные операции с файлами и каталогами, такие как чтение, запись, удаление, переименование, создание и многое другое. 

**FS предоставляет 3 стиля функций**: 
1.  синхронный стиль с обычными функциями: 
    - fs.readFileSync(path, options?): string | Buffer; 
2. 2 асинхронных стиля: 
    - с функциями обратного вызова: 
        - fs.readFile(path, options?, callback): void; 
    - с функциями, возвращающими промисы: 
        - fsPromises.readFile(path, options?): Promise<string | Buffer>. 

Слово Sync означает синхронно. Синхронные вызовы функций, такие как fs.readFileSync(), блокируют выполнение основного потока процесса, пока операция не будет завершена. Это означает, что весь код, следующий за синхронным вызовом, остановится и будет ждать завершения операции чтения файла. Поэтому синхронные вызовы часто используются в сценариях, где блокировка потока недопустима или не создает проблем, например, в консольных утилитах или на этапе инициализации сервера.	 

Асинхронные вызовы функций, такие как fs.readFile(), не блокируют выполнение основного потока процесса и используют колбэк-функции для обработки результата операции после ее завершения. Это позволяет другим операциям продолжать выполнение параллельно. 

*Подробнее:* [fs docs](https://nodejs.org/api/fs.html)

### events 

Функционал Node.js в основном применяет асинхронную событийную архитектуру, которая использует специальные объекты-эмиттеры для генерации различных событий, которые обрабатываются специальными функциями-обработчиками или слушателями событий. Все объекты, которые генерируют события, представляют экземпляры класса **EventEmitter**.

Простой экземпляр EventEmitter с одним слушателем. Метод **eventEmitter.on()** используется для регистрации слушателей, а метод **eventEmitter.emit()** используется для запуска события.

```js

import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('произошло событие!');
});
myEmitter.emit('event');

const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('произошло событие!');
});
myEmitter.emit('event');
```
*Подробнее:* [events docs](https://nodejs.org/api/events.html )

### path

Модуль **path** является встроенным и предоставляет набор функций для работы с путями в файловой системе. 

**Наиболее часто используемые методы**:

- **basename()** - возвращает конечную часть пути, первым параметром принимает путь, вторым необязательным аргументом - расширение файла, которое нужно убрать из возвращаемого результата; 
- **dirname()** - возвращает директорию переданного пути; 
- **extname()** - возвращает расширение файла переданного пути; 
- **isAbsolute()** - булевое значение, true, если переданный путь является абсолютным; 
- **join()** - принимает неограниченное количество составных частей пути, включая возвраты в родительские директории, и возвращает полученный в результате путь; 

*Подробнее:* [path docs](https://nodejs.org/api/path.html )

### http

Модуль **http** предоставляет API для создания HTTP-серверов и клиентов. Этот модуль является частью стандартной библиотеки Node.js и позволяет разработчикам создавать веб-сервера, обрабатывать HTTP-запросы и отправлять HTTP-запросы к другим серверам. 

Пример создания простого сервера: 

```js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

```

Модуль http предоставляет мощные средства для создания как простых, так и сложных веб-приложений, а также для взаимодействия с другими веб-серверами и API. 

*Подробнее:* [http docs](https://nodejs.org/api/http.html)

### stream 

Node.js включает встроенный модуль **stream**, который позволяет нам работать с потоковыми данными и создавать высокопроизводительные приложения. 

**Основные типы потоков внутри Node.js**: 
- **Readable**: потоки, из которых можно считывать данные (например, fs.createReadStream()); 
- **Writable**: потоки, в которые могут быть записаны данные (например, fs.createWriteStream()); 
- **Duplex**: потоки, которые являются одновременно Readable и Writable (например, net.Socket); 
- **Transform**: потоки преобразования (Duplex). 

Чтобы передать данные из одного потока в другой, самый простой способ вызвать над потоками метод **pipe**:
```js
Readable.pipe(Writable);
Readable.pipe(Transform).pipe(Writable);
Duplex.pipe(Transform).pipe(Duplex);
```
Метод pipe возвращает экземпляр потока, который был передан в него, что и позволяет потоки объединять между собой.

*Подробнее:* [steams docs](https://nodejs.org/api/stream.html )

