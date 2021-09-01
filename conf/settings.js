import path from 'path'

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = !isDev
export const mode = isDev ? 'development' : 'production'
export const isLocal = process.env.TARGET !== 'remote'

export const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}

export const ALIASES = {
  vue: 'vue/dist/vue.esm-bundler.js',
  vuex: 'vuex/dist/vuex.esm-bundler.js',
  'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
  '@': path.resolve(`${PATHS.src}`),
  '@scripts': path.resolve(`${PATHS.src}/scripts`),
  '@styles': path.resolve(`${PATHS.src}/styles`),
  '@static': path.resolve(`${PATHS.src}/static`),
  '@i18n': path.resolve(`${PATHS.src}/static/i18n`),
  '@components': path.resolve(`${PATHS.src}/components`),
  '@templates': path.resolve(`${PATHS.src}/templates`)
}

export const ENTRYES = {
  app: `${PATHS.src}/scripts/app.js`
}

export const TEMPLATES = ['app.html']

export const CONSTANTS = {
  TWO: '1+1',
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false,
  __VUE_I18N_FULL_INSTALL__: true,
  __VUE_I18N_LEGACY_API__: true,
  __VUE_I18N_PROD_DEVTOOLS__: false
}

export const DEVSERVER = {
  port: 777,
  proxyTarget: 'https://wp2.websharik.ru'
}

export const OBFUSCATOR = {
  enabled: false,
  config: {
    compact: true, //в одну строку
    controlFlowFlattening: false, //усложнение кода (увеличиает размер)
    controlFlowFlatteningThreshold: 1, //сила усложнения 0.0-1.0
    deadCodeInjection: false, //обвес рандомным кодом (увеличиает размер)
    deadCodeInjectionThreshold: 1, //сила обвеса 0.0-1.0
    //debugProtection: true, //мешает работать в devtools
    //debugProtectionInterval: true, //вызывает debug хуки
    //disableConsoleOutput: true, //отключает вывод в консоль
    //domainLock: 'unitiket.ru', //блокирует запуск на других доменах
    identifierNamesGenerator: 'hexadecimal', //генератор имен
    // hexadecimal: identifier names like _0xabc123
    // mangled: short identifier names like a, b, c
    // mangled-shuffled: same as mangled but with shuffled alphabet
    identifiersDictionary: [],
    identifiersPrefix: '',
    numbersToExpressions: true, //конвертация чисел в выражения 1234 => -0xd93+-0x10b4+0x41*0x67+0x84e*0x3+-0xff8
    renameGlobals: true, //переименовывание названий переменных и функций
    renameProperties: false, //переименовывание свойств и значений (ломает код, лучше не включать)
    reservedNames: [], //свойста и значения которые не будт переименованы (RegExp  format)
    reservedStrings: [], //строки которые не будут переименованы (RegExp  format)
    selfDefending: true, //любое изменение кода сломает его
    simplify: true, //упрощение кода (уменьшает размер логики но делает непонятной)
    //splitStrings: false, //разбивать строки на части
    //splitStringsChunkLength: 8, //длина частей разбитых строк
    stringArray: true, //превращать строки в массивы "Hello World" => _0x12c456[0x1]
    stringArrayEncoding: ['rc4'], //шифрование строк-массивов
    //base64 (легко найти нужное знаечние)
    //rc4 (30-50% медленнее но сложнее)
    stringArrayThreshold: 1, //как часто строки будут шифроваться в массивы
    //transformObjectKeys: true, //преобразование ключей объекта (выносит ключи и значения в массив а через функцию возвращает, ломает сеттеры/геттеры)
    //unicodeEscapeSequence: false, //преобразование кодировки строк (сильно увеличивает размер но легко обходится)
    //log: false, //логирование обусификации
    //sourceMap: false //Obfuscators sourcemaps
    target: 'browser' //где будет использоваться (для лучшего результата) browser, browser-no-eval, node
  },
  excludes: ['scripts/vendors.js']
}

export const PRERENDER = {
  items: [
    // {
    //     template: 'app.html',
    //     elementId: 'app',
    //     routes: ['/'],
    //     inject: {
    //         //msg: 'Hello world'
    //     }
    // }
  ]
}

export const publicPath = isDev && isLocal ? '' : ''
