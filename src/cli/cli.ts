import { CommandLineOptions } from './types';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


/**
 * Parses command-line arguments and validates options.
 * @returns The parsed and validated options.
 */
export const parseCommandLineArguments = (): CommandLineOptions =>{
  const options = yargs(hideBin(process.argv))
    .option('number', {
      alias: 'n',
      describe: 'Display a specific number of random quotes',
      type: 'number',
      default: undefined, // Default value for the 'number' option
    })
    .option('character', {
      alias: 'c',
      describe: 'Display a random quote from the specified character',
      type: 'string',
      default: undefined, // Default value for the 'character' option
    })
    .option('keyword', {
      alias: 'k',
      describe: 'Display a random quote containing the keyword',
      type: 'string',
      default: undefined, // Default value for the 'keyword' option
    })
    .help()
    .alias('help', 'h')
    .parse() as CommandLineOptions;
  
      // Fix parse options
  return {
    number: options.number === undefined ? undefined : Number(options.number),
    character: options.character === undefined ? undefined : options.character,
    keyword: options.keyword === undefined ? undefined : options.keyword,  
  };
  }