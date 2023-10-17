package nostr

import (
  "github.com/nbd-wtf/go-nostr"
)

type Nostr struct {}

func (n *Nostr) GeneratePrivateKey() string {
	return nostr.GeneratePrivateKey()
}

func (n *Nostr) GetPublicKey(sk string) (string, error) {
	return nostr.GetPublicKey(sk)
}
