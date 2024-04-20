#!/usr/bin/env tsx
/** Command-line options accepted by the CLI. */
interface CommandLineOptions {
    /** Specific number of random quotes to display. */
    number?: number;
    /** Random quote from the specified character to display. */
    character?: string;
    /** Random quote containing the keyword to display. */
    keyword?: string;
}

/**
 * Represents a quote with additional slug information for the character.
 */
interface QuoteWithSlug {
    readonly sentence: string;
    readonly character: {
        readonly name: string;
        readonly slug: string;
    };
}

/**
 * Retrieves quotes based on the provided options.
 * @param options The options object containing number, character, and keyword.
 * @returns Either a single quote with slug information or an array of quotes with slug information.
 */
declare const getQuotes: (options: CommandLineOptions) => Promise<QuoteWithSlug[]>;

export { getQuotes };
