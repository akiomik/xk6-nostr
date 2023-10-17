package nostr

import (
  "github.com/nbd-wtf/go-nostr"
)

type Event struct {}

func (e *Event) Sign(event *nostr.Event, pk string) (*nostr.Event, error) {
  err := event.Sign(pk)
  return event, err
}
