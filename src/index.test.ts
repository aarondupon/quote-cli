import { getQuotes } from ".";

describe('getQuotes', () => {
    // Test case for retrieving quotes based on keyword
    it('should retrieve quotes based on keyword', async () => {
      const options = { keyword: 'inspiration' };
      const quotes = await getQuotes(options);
      expect(quotes).toEqual(expect.any(Array));
    });
  
    // Test case for retrieving quotes based on characters
    it('should retrieve quotes based on characters', async () => {
      const options = { character: 'homer simpson' };
      const quotes = await getQuotes(options);
      expect(quotes).toEqual(expect.any(Array))
    });
  
    // Test case for retrieving random quotes
    it('should retrieve random quotes', async () => {
      const options = { number: 5 };
      const quotes = await getQuotes(options);
      expect(quotes.length).toBe(5);
    });
  
    // Test case for retrieving quotes with no options provided
    it('should retrieve default number of random quotes', async () => {
      const quotes = await getQuotes({});
      expect(quotes.length).toBe(1);
    });
  
    // Test case for retrieving quotes with invalid options provided
    it('should return an empty array for invalid options', async () => {
      const options = { character: 'Invalid Character', keyword: 'Invalid Keyword' };
      const quotes = await getQuotes(options);
      expect(quotes.length).toBe(0);
    });
  });


  