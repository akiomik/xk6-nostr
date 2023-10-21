# xk6-nostr

An xk6 extension for nostr.

## Build

1. Download `xk6`:

```bash
go install go.k6.io/xk6/cmd/xk6@latest
```

2. Build the extension:

```
xk6 build --with github.com/akiomik/xk6-nostr@latest
```

## Development

### Build

```bash
make build
```

### Testing

```bash
make test
```

### Execute example scripts

```bash
k6 run --vus 10 --duration 30s examples/publish.js
```
