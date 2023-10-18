package nostr

import (
	"context"

	"github.com/nbd-wtf/go-nostr"
)

type Relay struct {
	underlying *nostr.Relay
}

func (r *Relay) Publish(ev nostr.Event) (nostr.Status, error) {
	return r.underlying.Publish(context.Background(), ev)
}

func (r *Relay) Close(ev nostr.Event) error {
	return r.underlying.Close()
}
