import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';
import { check } from 'k6';

const relay = nostr.relayConnect("ws://127.0.0.1:7777");
const sk = nostr.generatePrivateKey();
const pk = nostr.getPublicKey(sk);

export default function () {
  const now = Math.round(new Date().getTime() / 1000);
  const ev = event.sign({ content: Math.random(), kind: 1, created_at: now }, sk);
  const status = relay.publish(ev);

  const events = relay.querySync({ authors: [pk], limit: 1 });
  check(events, { 'events is valid': (es) => es.length === 1 && es[0].id === ev.id });
}

export function teardown() {
  relay.close();
}
