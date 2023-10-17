import nostr from 'k6/x/nostr';
import event from 'k6/x/nostr/event';

export default function () {
  const sk = nostr.generatePrivateKey();
  console.log(sk);
  const pk = nostr.getPublicKey(sk);
  console.log(pk);
  const now = Math.round(new Date().getTime() / 1000)
  const ev = event.sign({ content: 'foo', kind: 1, created_at: now }, sk)
  console.log(ev);
  const relay = nostr.relayConnect("wss://relay.damus.io");
  const status = relay.publish(ev)
  console.log(status);
}
