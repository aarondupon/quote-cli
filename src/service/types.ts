
/**
 * Represents a quote with additional slug information for the character.
 */
export interface QuoteWithSlug {
    readonly sentence: string;
    readonly character: {
      readonly name: string;
      readonly slug: string;
    };
  }
  
/**
 * Represents a character object.
 */
export interface Characters {
    readonly [key: string]: {
      readonly name: string;
    };
  }
  
/**
 * Represents a quote object.
 */
export interface Quote {
    readonly sentence: string;
    readonly character: string;
  }
  
/**
 * Represents the data structure containing characters and quotes.
 */
export interface Data {
    readonly characters: Characters;
    readonly quotes: Quote[];
}





/**
 * Retrieves quotes based on specified options.
 * @param characters The object containing character data.
 * @param quotes The array of quotes.
 * @param options The options to filter quotes.
 * @returns Either a single quote with slug information or an array of quotes with slug information.
 */

export interface CharacterWithQuotes {
    readonly name: string;
    readonly slug: string;
    readonly quotes: string[];
    }
    
      