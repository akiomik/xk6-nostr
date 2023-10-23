package nostr

import (
	"github.com/nbd-wtf/go-nostr"
	"go.k6.io/k6/js/modules"
)

type Relay struct {
	underlying *nostr.Relay
	vu         modules.VU
}

func (r *Relay) Publish(ev nostr.Event) (nostr.Status, error) {
	return r.underlying.Publish(r.vu.Context(), ev)
}

func (r *Relay) Close() error {
	return r.underlying.Close()
}
