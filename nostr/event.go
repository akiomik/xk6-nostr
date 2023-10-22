package nostr

import (
	"github.com/nbd-wtf/go-nostr"
)

type Event struct{}

func (e *Event) Sign(event *nostr.Event, sk string) (*nostr.Event, error) {
	err := event.Sign(sk)
	return event, err
}
