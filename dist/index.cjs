'use strict';

var yargs = require('yargs');
var helpers = require('yargs/helpers');
var dotenv = require('dotenv');

const parseCommandLineArguments = () => {
  const options = yargs(helpers.hideBin(process.argv)).option("number", {
    alias: "n",
    describe: "Display a specific number of random quotes",
    type: "number",
    default: void 0
    // Default value for the 'number' option
  }).option("character", {
    alias: "c",
    describe: "Display a random quote from the specified character",
    type: "string",
    default: void 0
    // Default value for the 'character' option
  }).option("keyword", {
    alias: "k",
    describe: "Display a random quote containing the keyword",
    type: "string",
    default: void 0
    // Default value for the 'keyword' option
  }).help().alias("help", "h").parse();
  return {
    number: options.number === void 0 ? void 0 : Number(options.number),
    character: options.character === void 0 ? void 0 : String(options.character),
    keyword: options.keyword === void 0 ? void 0 : String(options.keyword)
  };
};

dotenv.config();
const BASE_URL = undefinedBASE_URL;
async function fetchQuotesAll() {
  try {
    const response = await fetch(`${BASE_URL}/characters`);
    if (!response.ok)
      throw new Error("Failed to fetch all quotes");
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching all quotes");
  }
}
async function fetchQuotesByAuthor(character, number) {
  const url = number ? `${BASE_URL}/author/${character}/${number}` : `${BASE_URL}/author/${character}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("Failed to fetch quotes by author");
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json"))
    return [];
  const quoteData = await response.json();
  return quoteData;
}
async function fetchQuotesByAuthors(characters, number) {
  try {
    const quoteArrays = await Promise.all(characters.map((character) => fetchQuotesByAuthor(character, number)));
    const flattenedQuotes = quoteArrays.flat();
    return flattenedQuotes;
  } catch (error) {
    throw new Error("Error fetching quotes by authors");
  }
}
async function fetchQuotesRandom(count) {
  try {
    const response = await fetch(`${BASE_URL}/random/${count}`);
    if (!response.ok)
      throw new Error("Failed to fetch random quotes");
    const result = await response.json();
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    throw new Error("Error fetching random quotes");
  }
}
const filterQuotesByKeyword = (quotes, keyword) => {
  if (!keyword)
    return quotes;
  const lowerCaseKeyword = keyword.toLowerCase();
  return quotes.reduce((arr, item) => {
    const quotes2 = item.quotes.filter((quote) => quote.toLowerCase().includes(lowerCaseKeyword));
    if (quotes2.length) {
      arr.push({
        ...item,
        quotes: quotes2
      });
    }
    return arr;
  }, []);
};
const formatQuote = (items) => {
  if (!items || !items.length)
    return [];
  return items.reduce((arr, quote) => {
    if (quote.quotes.length) {
      const quotesWithSlug = quote.quotes.map((sentence) => ({
        sentence,
        character: {
          name: quote.name,
          slug: quote.slug
        }
      }));
      return [...arr, ...quotesWithSlug];
    }
    return arr;
  }, []);
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getRandom = (array, number = 1) => shuffleArray(array).slice(0, number);

const getQuotes = async (options) => {
  const { number: count = 1, character, keyword } = options;
  const characters = character && (Array.isArray(character) ? character : [character]);
  let filteredQuotes = [];
  if (!characters && keyword && count > 0) {
    filteredQuotes = await fetchQuotesAll();
    filteredQuotes = filterQuotesByKeyword(filteredQuotes, keyword);
    const formattedQuotes = formatQuote(filteredQuotes);
    return getRandom(formattedQuotes, count);
  }
  if (characters && count > 0) {
    return await fetchQuotesByAuthors(characters, count);
  }
  return count > 0 ? await fetchQuotesRandom(count) : [];
};
const main = async () => {
  const options = parseCommandLineArguments();
  const result = await await getQuotes(options);
  console.log(JSON.stringify(result, null, 2));
};
if (undefinedNODE_ENV !== "test") {
  main();
}

exports.getQuotes = getQuotes;
