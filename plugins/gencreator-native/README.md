# GenCreator native workflows

Developer candidate: two local skills for expert creators with owned source material. Python 3.10+ runs source/revision checks. Node 22+ runs the existing GenCreator v0.5.0 launch engine. No API key or GenCreator account is required for local workflows.

- GenCreator Producer: editorial drafting in the host model, exact source spans, voice preservation, draft review receipts and production handoffs.
- GenCreator Launch: editable page/email/social/search copy, local compilation, integrity verification and supplied-metric calculations.

The model writes and judges creative work. The scripts validate and arrange inputs. Source substring matches do not prove truth, entailment or ownership. Confirmation receipts do not verify reviewer identity or authorize publication.

## Installation

Supported local clients can add the repository marketplace with `codex plugin marketplace add frankxai/gencreator-skills --ref <reviewed-release-ref>` and install GenCreator from that source. This candidate must land before main includes it. Root plugin.json and mcp.json follow the portable Agent Plugins formats. Skill installations alone work in ChatGPT Work with filesystem execution.

For ChatGPT remote tools, enable developer mode when available and register `https://gencreator.ai/api/mcp` through Plugins → plus. This package does not invent a registered app ID or silently connect an account. Test initialization, tools/list and representative calls in the actual host; this candidate is not directory-published. Workflows remain usable locally when remote tools are disabled.

Public remote operations process submitted data on GenCreator infrastructure. Use them only when the user chooses that processing path. Private workspace tools remain HOLD while OAuth and managed readiness are unproven. On 2026-10-02 the production manifest and v0.5.0 bundle responded 200; OAuth metadata responded 503.

## Verify

Run `python3 -m unittest discover -s plugins/gencreator-native/tests -v`. Validate both skills and exercise the launch CLI against a new output directory. Do not treat developer tests as actual ChatGPT registration or a paid release gate. No server changes, migration, billing changes or publishing are bundled.

## Scope and ownership

This package distributes the existing GenCreator launch runtime and adds a local source/evidence receipt workflow. The product and managed APIs remain owned by frankxai/gencreator.ai. This receipt is deliberately separate from its CreatorPack and Mission contracts. No customer sources or private operator context ship in the package.

