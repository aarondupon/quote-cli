#!/usr/bin/env tsx
import { parseCommandLineArguments } from './cli/cli';
import { CommandLineOptions } from './cli/types';
import { formatQuote, fetchQuotesRandom, fetchQuotesAll, getRandom, fetchQuotesByAuthors, fetchQuotesByCharacters, filterQuotesByKeywords } from './service/quotesService';
import { QuoteWithSlug } from './service/types';


/**
 * Retrieves quotes based on the provided options.
 * @param options The options object containing number, character, and keyword.
 * @returns An array of quotes with slug information.
 */
export const getQuotes = async (options:CommandLineOptions): Promise<QuoteWithSlug[]> => {
  const { number: count = 1, character, keyword } = options;
  const characters = character && (Array.isArray(character) ? character : [character]);
  const keywords = keyword && (Array.isArray(keyword) ? keyword : [keyword]);

  // Fetch quotes based on keyword if no characters specified
  if (!characters && keywords &&keywords.length > 0  && count > 0) {
    const filteredQuotes = await fetchQuotesAll();
    let formattedQuotes = formatQuote(filteredQuotes);
    formattedQuotes = filterQuotesByKeywords(formattedQuotes, keywords);
    return getRandom(formattedQuotes, count);
  }

  // Fetch quotes based on characters, keyword, and count
  if (characters && keywords &&keywords.length > 0 && count > 0) {
    let filteredQuotes = await fetchQuotesByCharacters(characters);
    let formattedQuotes = formatQuote(filteredQuotes);
    formattedQuotes = filterQuotesByKeywords(formattedQuotes, keywords);
    return getRandom(formattedQuotes, count);
  }

  // Fetch quotes based on characters only
  if (characters && count > 0) {
    return await fetchQuotesByAuthors(characters, count);
  }

  // Fetch random quotes based on count only (default count is 1)
  return count > 0 ? await fetchQuotesRandom(count) : [];
};




/**
 * Main function to run the CLI.
 */
const main = async () => {
  const options = parseCommandLineArguments();
  const result = await await getQuotes(options);
  console.log(JSON.stringify(result, null, 2));
};

// Check if running in a testing environment
if (process.env.NODE_ENV !== 'test') {
  main();
}