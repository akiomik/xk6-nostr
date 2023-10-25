import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';
import { check } from 'k6';

const relay = nostr.relayConnect("ws://127.0.0.1:7777");

function sample(as) {
  return as[Math.floor(Math.random() * as.length)];
}

function range(n) {
  return [...Array(n).keys()];
}

export function setup() {
  const keys = range(50).map(() => {
    const sk = nostr.generatePrivateKey();
    const pk = nostr.getPublicKey(sk);
    return [sk, pk];
  });

  range(10000).forEach(() => {
    const sk = sample(keys)[0];
    const kind = sample([1, 6, 7]);
    const now = Math.round(new Date().getTime() / 1000);
    const ev = event.sign({ content: Math.random(), kind, created_at: now }, sk);
    relay.publish(ev);
  });

  return { keys };
}

export default function ({ keys }) {
  const pubkeys = range(10).map(() => sample(keys)[1]);
  relay.querySync({ authors: pubkeys, limit: 50 });
}

export function teardown() {
  relay.close();
}
