import { log } from 'console';
import { fetchQuotesAll, fetchQuotesByCharacters, fetchQuotesByAuthor, fetchQuotesRandom, filterQuotesByKeyword, shuffleArray, getRandom, formatQuote, fetchQuotesByAuthors } from './quotesService';

describe('quotesService', () => {
  describe('fetchQuotesAll', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });
    it('should return an array of quotes', async () => {
        try{
            const quotes = await fetchQuotesAll();
            expect(Array.isArray(quotes)).toBe(true);
        }
        catch (error) {
            fail('Error fetching quotes');
        }
    });
    it('should return an error if response is not ok', async () => {
        // Mock the fetch function to return a resolved promise with an error response
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response(null, {status: 404}));
        // Call the function and expect it to throw an error
        await expect(fetchQuotesAll()).rejects.toThrow();
    });
  });

  describe('fetchQuotesByCharacters', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });
    it('should return an array of quotes for the given characters', async () => {
      const character = ['hubert'];
      const quotes = await fetchQuotesByCharacters(character);
      expect(Array.isArray(quotes)).toBe(true);
    });
    it('should return an error if response is not ok', async () => {
        // Mock the fetch function to return a resolved promise with an error response
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response(null, {status: 404}));
        // Call the function and expect it to throw an error
        await expect(fetchQuotesByCharacters(['hubert'])).rejects.toThrow();
    });
  });

  describe('fetchQuotesByAuthor', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });

    it('should return an array of quotes for the given author', async () => {
      const character = ['hubert'];
      const quotes = await fetchQuotesByAuthors(character);
      expect(Array.isArray(quotes)).toBe(true);
    });
    
    it('should return an error if response is not ok', async () => {
        // Mock the fetch function to return a resolved promise with an error response
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response(null, {status: 404}));
        // Call the function and expect it to throw an error
        await expect(fetchQuotesByAuthors(['hubert'])).rejects.toThrow();
    });
  });

  describe('fetchQuotesRandom', () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });
    it('should return an array of random quotes', async () => {
        const count = 5;
        const quotes = await fetchQuotesRandom(count);
        expect(Array.isArray(quotes)).toBe(true);
        expect(quotes.length).toBeGreaterThanOrEqual(1); // Assuming API returns at least one quote
      });

    it('should return an error if response is not ok', async () => {
        // Mock the fetch function to return a resolved promise with an error response
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response(null, {status: 404}));
        // Call the function and expect it to throw an error
        await expect(fetchQuotesRandom(1)).rejects.toThrow();
    });
  });

  describe('filterQuotesByKeyword', () => {
    const quotes = [
        { name: 'Hubert', slug: 'hubert', quotes: ['This is quote 1', 'This is quote 2'] },
        { name: 'Larmina', slug: 'larmina', quotes: ['This is quote 3', 'This is quote 4'] },
      ];


    it('should return an array of quotes filtered by the given keyword', async () => {
      
      const filteredQuotes = filterQuotesByKeyword(quotes, 'quote 2');
      expect(Array.isArray(filteredQuotes)).toBe(true);
      expect(filteredQuotes.length).toBe(1);
      expect(filteredQuotes[0].quotes.length).toBe(1);
      expect(filteredQuotes[0].quotes[0]).toBe('This is quote 2');
    });
    
    it('should return an empty array of quotes filtered, if no keyword', async () => {
        const filteredQuotes = filterQuotesByKeyword(quotes);
        expect(filteredQuotes).toEqual(quotes)
      });
      
  });


  describe('formatQuote', () => {
    it('should return an array of quotes with slug information', () => {
      const items = [
        { name: 'Hubert', slug: 'hubert', quotes: ['This is quote 1', 'This is quote 2'] },
        { name: 'Larmina', slug: 'larmina', quotes: ['This is quote 3', 'This is quote 4'] },
        { name: 'Larmina', slug: 'larmina', quotes: [] },
      ];

      const formattedQuotes = formatQuote(items);
      expect(Array.isArray(formattedQuotes)).toBe(true);
      expect(formattedQuotes.length).toBe(4);
      expect(formattedQuotes[0]).toEqual({
        sentence: 'This is quote 1',
        character: { name: 'Hubert', slug: 'hubert' },
      });
    });
    
  });

  describe('shuffleArray', () => {
    it('should shuffle the elements of the array', () => {
      // Define an array with ordered elements
      const orderedArray = [1, 2, 3, 4, 5];
  
      // Shuffle the array
      const shuffledArray = shuffleArray([...orderedArray]); // Use spread operator to create a copy of the array
  
      // Check that the shuffled array is not equal to the original ordered array
      expect(shuffledArray).not.toEqual(orderedArray);
  
      // Check that the length of the shuffled array is the same as the original array
      expect(shuffledArray.length).toEqual(orderedArray.length);
  
      // Check that the shuffled array contains the same elements as the original array
      expect(shuffledArray.sort()).toEqual(orderedArray.sort());
    });
  });

  describe('getRandom', () => {
    it('should return a specified number of random elements from an array', () => {
      const array = [1, 2, 3, 4, 5];
      const randomElements = getRandom(array, 3);
      expect(Array.isArray(randomElements)).toBe(true);
      expect(randomElements.length).toBe(3);
      expect(randomElements).toEqual(expect.arrayContaining(array.slice(0, 3)));
    });

    it('should return one random elements from an array', () => {
        const array = [1, 2, 3, 4, 5];
        const randomElements = getRandom(array);
        expect(Array.isArray(randomElements)).toBe(true);
        expect(randomElements.length).toBe(1);
        expect(randomElements).toEqual(expect.arrayContaining(array.slice(0, 1)));
      });
  });

});