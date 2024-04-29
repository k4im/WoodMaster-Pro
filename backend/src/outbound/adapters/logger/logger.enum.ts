export enum LogLevel {
    INFO = '\x1b[36m', // ciano
    WARNING = '\x1b[33m', // amarelo
    ERROR = '\x1b[31m', // vermelho
    LIGHT_GRAY = '\x1b[37m', // Cinza claro
    DEBUG = '\x1b[93m', // amarelo claro para debug
    RESET = '\x1b[0m' // resetar a cor
  }