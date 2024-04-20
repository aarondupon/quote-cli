# Quote CLI

This is a command-line interface (CLI) tool for retrieving quotes based on various options such as characters, keywords, and counts.

## structure

```

├── cli
│   ├── cli.test.ts
│   ├── cli.ts
│   └── types.ts
├── service
│   
├── quotesService.test.ts
│   ├── quotesService.ts
│   └── types.ts
│ 
├── index.test.ts
└── index.ts
```

## Installation

To install the Quote CLI, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd quote-cli
    ```

3. Install dependencies:
    ```bash
    cd npm install
    ```

4. Usage
    To use the Quote CLI

    <b>DURING DEVELOPMENT</b>

    ```bash
    # run from project folder
    $ npm start
    $ npm start -- --help
    ```
    This will execute the script, you can alsow use npm watch for development and provide you with options to retrieve quotes based on various criteria.

5. Build and run as global command
    ```bash
    # run after build and global installation
    $ npm run build
    $ npm i -g . # intall global
    $ quote-cli --help # now you can use qoute-cli anyware in your terminal 🍻
    ```


## Testing
To run the tests for the Quote CLI, use the following command:
```bash
npm test
```

## Arguments

The Quote CLI accepts the following command-line arguments:

- **--number, -n**: Specifies the number of random quotes to display. This argument takes a numerical value.
- **--character, -c**: Specifies a character to retrieve a random quote from. This argument takes a string value.
- **--keyword, -k**: Specifies a keyword to find a random quote containing that keyword. This argument takes a string value.

- **--help, -h**: Displays usage information for the Quote CLI.

You can use these arguments to customize the behavior of the Quote CLI and retrieve quotes based on specific criteria.


## Response
```json
[
    {
        "sentence": "Ah ah bravo Bill, en plein dans l'dos !",
        "character": {
            "name": "Hubert Bonnisseur de La Bath (alias OSS 117)",
            "slug": "hubert"
        }
    },
    {
        "sentence": "Fonce, Slimane ! Fooonce !!!",
        "character": {
            "name": "Hubert Bonnisseur de La Bath (alias OSS 117)",
            "slug": "hubert"
        }
    }
]
```

### Examples

Running cli after global install
```bash
# Display 5 random quotes
$ quote-cli --number=5

# Display a random quote from the character "Hubert Bonnisseur de La Bath"
$ quote-cli --character="hubert"

# Display a random quote containing the keyword "water"
$ quote-cli --keyword="water"
# Use options cumulative
$ quote-cli --number=5 --character="larmina" --keyword="water"

# Display usage information
$ quote-cli --help
```

Running cli in the project folder with npm
```bash
# If running the script with npm, pass the arguments by prefixing them with --
$ npm start -- --number=5 --character="larmina" --keyword="water"
```

## Contributing
Contributions are welcome! If you'd like to contribute to the Quote CLI, please follow these steps:

1. Fork the repository.
2. Create your feature branch: git checkout -b feature-name.
3. Commit your changes: git commit -am 'Add some feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.
