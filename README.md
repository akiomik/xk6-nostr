# xk6-nostr

A load testing extension for [Nostr](https://nostr.com) using [k6](https://k6.io).

## Build

1. Download `xk6`:

```bash
go install go.k6.io/xk6/cmd/xk6@latest
```

2. Build the k6 with extension:

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
# NOTE: k6 is built with `make build`
./k6 run --vus 5 --duration 1m examples/publish.js
```

## Examples

You can find more examples in [examples/](https://github.com/akiomik/xk6-nostr/tree/main/examples).

```javascript
import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';
import { check } from 'k6';

const relay = nostr.relayConnect("ws://127.0.0.1:7777");
const sk = nostr.generatePrivateKey();

export default function () {
  const now = Math.round(new Date().getTime() / 1000);
  const ev = event.sign({ content: Math.random(), kind: 1, created_at: now }, sk);
  const status = relay.publish(ev);
  check(status, { 'status is success': (s) => s.string() === 'success' });
}

export function teardown() {
  relay.close();
}
```
