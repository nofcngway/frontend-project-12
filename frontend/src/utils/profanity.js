import filter from 'leo-profanity';

filter.loadDictionary('ru')

export const cleanText = (text) => filter.clean(text);
