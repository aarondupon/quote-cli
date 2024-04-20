import { CharacterWithQuotes, QuoteWithSlug } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

/**
 * Fetches quotes for all characters.
 * @returns {Promise<CharacterWithQuotes[]>} A promise that resolves to an array of characters with their quotes.
 * @throws {Error} If there is an error fetching all quotes.
 */
export async function fetchQuotesAll(): Promise<CharacterWithQuotes[]> {
    try {
      const response = await fetch(`${BASE_URL}/characters`);
      if (!response.ok) throw new Error('Failed to fetch all quotes');
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching all quotes');
    }
  }

/**
 * Fetches quotes for specified characters.
 * @param {string[]} characters - An array of character names.
 * @returns {Promise<CharacterWithQuotes[]>} A promise that resolves to an array of quotes.
 * @throws {Error} If there is an error fetching quotes by characters.
 */
export async function fetchQuotesByCharacters(characters: string[]): Promise<CharacterWithQuotes[]> {
    try {
      const responses = await Promise.all(characters.map(character => fetch(`${BASE_URL}/character/${character}`)));
      if (!responses.every(response => response.ok)) throw new Error('Failed to fetch quotes by characters');
  
      const quoteData = await Promise.all(responses.map(response => response.json()));
      return quoteData.flat();
    } catch (error) {
      throw new Error('Error fetching quotes by characters');
    }
  }

/**
 * Fetches quotes for a specific author.
 * @param {string} character - The name of the author.
 * @param {number} [number] - Optional parameter specifying the number of quotes to fetch.
 * @returns {Promise<QuoteWithSlug[]>} A promise that resolves to an array of quotes.
 * @throws {Error} If there is an error fetching quotes by author.
 */  
export async function  fetchQuotesByAuthor(character: string, number?: number):Promise<QuoteWithSlug[]>{
    const url = number ? `${BASE_URL}/author/${character}/${number}` : `${BASE_URL}/author/${character}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch quotes by author');

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) return [];

    const quoteData = await response.json();
    return quoteData;
  };

/**
 * Fetches quotes for multiple authors concurrently.
 * @param {string[]} characters - An array of author names.
 * @param {number} [number] - Optional parameter specifying the number of quotes to fetch for each author.
 * @returns {Promise<QuoteWithSlug[]>} A promise that resolves to an array of quotes.
 * @throws {Error} If there is an error fetching quotes by authors.
 */
  export async function fetchQuotesByAuthors(characters: string[], number?: number): Promise<QuoteWithSlug[]> {
    try {
        const quoteArrays = await Promise.all(characters.map(character => fetchQuotesByAuthor(character, number)));
        const flattenedQuotes = quoteArrays.flat();
        return flattenedQuotes;
    } catch (error) {
        throw new Error('Error fetching quotes by authors');
    }
}

/**
 * Fetches random quotes.
 * @param {number} count - The number of random quotes to fetch.
 * @returns {Promise<QuoteWithSlug[]>} A promise that resolves to an array of random quotes.
 * @throws {Error} If there is an error fetching random quotes.
 */
export async function fetchQuotesRandom(count: number): Promise<QuoteWithSlug[]> {
    try {
        const response = await fetch(`${BASE_URL}/random/${count}`);
        if (!response.ok) throw new Error('Failed to fetch random quotes');
        const result = await response.json();
  
      return Array.isArray(result) ? result : [result];
    } catch (error) {
        throw new Error('Error fetching random quotes');
    }
  }
  
/**
 * Filters quotes by a specified keyword.
 * @param {QuoteWithSlug} quotes - The array of quotes to filter.
 * @param {string} keyword The keyword to filter by.
 * @returns {QuoteWithSlug} The filtered array of quotes.
 */
  export const filterQuotesByKeyword = (quotes: QuoteWithSlug[], keyword?: string): QuoteWithSlug[] => {
    if (!keyword) return quotes;
    const lowerCaseKeyword = keyword.toLowerCase();
    return quotes.filter(quote => quote.sentence.toLowerCase().includes(lowerCaseKeyword));
  };

/**
 * Filters an array of quotes by keywords.
 * 
 * @param {QuoteWithSlug[]} quotes - The array of quotes to filter.
 * @param {string[]} [keywords] - The keywords to filter by.
 * @returns {QuoteWithSlug[]} - The filtered array of quotes.
 */
  export const filterQuotesByKeywords = (quotes: QuoteWithSlug[], keywords?: string[]): QuoteWithSlug[] => {
    if (!keywords || !keywords.length ) return quotes;
    const lowerCaseKeywords = keywords.map(keyword => keyword.toLowerCase());

   // Filter quotes that include at least one of the provided keywords
   return quotes.filter(quote => {
      const lowerCaseSentence = quote.sentence.toLowerCase();
      return lowerCaseKeywords.some(keyword => lowerCaseSentence.includes(keyword));
    });
  };

  
  
  /**
   * Adds slug information to quotes.
   * @param quotes The array of quotes to modify.
   * @returns The array of quotes with slug information.
   */
  export const formatQuote = (items:CharacterWithQuotes[]): QuoteWithSlug[] =>{
    if(!items || !items.length) return [];
    return items.reduce<QuoteWithSlug[]>((arr, quote) => {
      if(quote.quotes.length){
        const quotesWithSlug = quote.quotes.map(sentence=>({
          sentence: sentence,
          character: {
            name: quote.name,
            slug: quote.slug,
          },
        }));
        return [...arr,...quotesWithSlug];
      }
      return arr;
      
    },[]);
  }

  // utility functions

  /**
   * Shuffles the elements of an array.
   * @param array The array to be shuffled.
   * @returns The shuffled array.
   */
  export const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
    
  /**
   * Retrieves a specified number of random quotes from an array of quotes.
   * @param quotes The array of quotes.
   * @param number The number of quotes to retrieve (default is 1).
   * @returns An array of random quotes.
   */
  export const getRandom = <T>(array: T[], number: number = 1): T[] => 
    shuffleArray(array).slice(0, number)