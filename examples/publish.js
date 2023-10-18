import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';
import { check, sleep } from 'k6';


const sk = nostr.generatePrivateKey();
const pk = nostr.getPublicKey(sk);
const now = Math.round(new Date().getTime() / 1000)
const ev = event.sign({ content: 'foo', kind: 1, created_at: now }, sk)

export default function () {
  const relay = nostr.relayConnect("ws://localhost:8080");
  const status = relay.publish(ev)
  check(status, { 'status is success': (s) => s.string() === 'success' })
  sleep(1)
}
