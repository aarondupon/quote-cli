#!/usr/bin/env tsx
import { parseCommandLineArguments } from './cli/cli';
import { CommandLineOptions } from './cli/types';
import { formatQuote, filterQuotesByKeyword, fetchQuotesRandom, fetchQuotesAll, getRandom, fetchQuotesByAuthors } from './service/quotesService';
import { QuoteWithSlug, CharacterWithQuotes } from './service/types';


/**
 * Retrieves quotes based on the provided options.
 * @param options The options object containing number, character, and keyword.
 * @returns Either a single quote with slug information or an array of quotes with slug information.
 */
export const getQuotes = async (options:CommandLineOptions): Promise<QuoteWithSlug[]> => {
  const { number: count = 1, character, keyword } = options;
  const characters = character && (Array.isArray(character) ? character : [character]);
  let filteredQuotes: CharacterWithQuotes[] = [];

  // Fetch quotes based on keyword if no characters specified
  if (!characters && keyword && count > 0) {
    filteredQuotes = await fetchQuotesAll();
    filteredQuotes = filterQuotesByKeyword(filteredQuotes, keyword);
    const formattedQuotes = formatQuote(filteredQuotes);
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