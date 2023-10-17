import nostr from 'k6/x/nostr';

export default function () {
  const sk = nostr.generatePrivateKey();
  console.log(nostr.getPublicKey(sk));
}
