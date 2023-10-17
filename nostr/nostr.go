package nostr

import (
  "context"

  "github.com/nbd-wtf/go-nostr"
)

type Nostr struct {}

func (n *Nostr) GeneratePrivateKey() string {
	return nostr.GeneratePrivateKey()
}

func (n *Nostr) GetPublicKey(sk string) (string, error) {
	return nostr.GetPublicKey(sk)
}

func (n *Nostr) RelayConnect(url string) (*Relay, error) {
  relay, err := nostr.RelayConnect(context.Background(), url)
  return &Relay{ underlying: relay }, err
}
