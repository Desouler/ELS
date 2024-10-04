# Start server
```bash
npm start
```

# Start server in debug mode
Debug mode uses changes detection and auto reload
```bash
npm run debug
```

# Create new migration
```bash
./node_modules/.bin/ts-node .\node_modules\typeorm\cli.js migration:generate -n <migration-name>
```

# Run migrations
```bash
./node_modules/.bin/ts-node .\node_modules\typeorm\cli.js migration:run
```

# Revert migration
```bash
./node_modules/.bin/ts-node .\node_modules\typeorm\cli.js migration:revert
```