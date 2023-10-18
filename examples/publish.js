import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';

const sk = nostr.generatePrivateKey();
const pk = nostr.getPublicKey(sk);
const now = Math.round(new Date().getTime() / 1000)
const ev = event.sign({ content: 'foo', kind: 1, created_at: now }, sk)

export default function () {
  const relay = nostr.relayConnect("wss://yabu.me");
  const status = relay.publish(ev)
  console.log(status);
}
