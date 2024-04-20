import { parseCommandLineArguments } from './cli';

describe('parseCommandLineArguments', () => {
    it('should parse command line arguments correctly and return options', () => {
      // Mock process.argv
      process.argv = ['node', 'test.js', '-n', '5', '-c', 'character', '-k', 'keyword'];
  
      // Call the function to parse command line arguments
      const options = parseCommandLineArguments();
  
      // Validate the parsed options
        expect(options).toEqual({
            number: 5,
            character: 'character',
            keyword: 'keyword',
          });
    });
  
    it('should return default options when no arguments are provided', () => {
      // Mock process.argv
      process.argv = ['node', 'test.js'];
  
      // Call the function to parse command line arguments
      const options = parseCommandLineArguments();

        // Validate the parsed options
        expect(options).toEqual({
            number: undefined,
            character: undefined,
            keyword: undefined,
          }); 
    });
  
    // Add more test cases as needed
  });