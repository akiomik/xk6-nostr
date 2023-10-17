package nostr

import (
	"github.com/akiomik/xk6-nostr/nostr"
	"go.k6.io/k6/js/modules"
)

func init() {
	modules.Register("k6/x/nostr", &nostr.Nostr{})
	modules.Register("k6/x/nostr/event", &nostr.Event{})
}
