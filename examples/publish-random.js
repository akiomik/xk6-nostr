import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';
import { check } from 'k6';

const relay = nostr.relayConnect("ws://127.0.0.1:7777");

const sk = nostr.generatePrivateKey();
const events = [...Array(50000).keys()].map((i) => {
  const now = Math.round(new Date().getTime() / 1000);
  return event.sign({ content: i, kind: 1, created_at: now }, sk);
});

export default function () {
  const status = relay.publish(events[__ITER]);
  check(status, { 'status is success': (s) => s.string() === 'success' });
}

export function teardown() {
  relay.close();
}
