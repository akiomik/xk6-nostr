package nostr

import (
	"github.com/nbd-wtf/go-nostr"
	"go.k6.io/k6/js/modules"
)

type RootModule struct{}

type ModuleInstance struct {
	nostr *Nostr
}

type Nostr struct {
	vu modules.VU
}

func (*RootModule) NewModuleInstance(vu modules.VU) modules.Instance {
	return &ModuleInstance{
		nostr: &Nostr{vu: vu},
	}
}

func (m *ModuleInstance) Exports() modules.Exports {
	return modules.Exports{
		Default: m.nostr,
	}
}

func (n *Nostr) GeneratePrivateKey() string {
	return nostr.GeneratePrivateKey()
}

func (n *Nostr) GetPublicKey(sk string) (string, error) {
	return nostr.GetPublicKey(sk)
}

func (n *Nostr) RelayConnect(url string) (*Relay, error) {
	relay, err := nostr.RelayConnect(n.vu.Context(), url)
	return &Relay{underlying: relay, vu: n.vu}, err
}
