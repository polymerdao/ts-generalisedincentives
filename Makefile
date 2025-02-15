.PHONY: build
build: forge-build bindings-gen-ts

.PHONY: forge-build
forge-build:
	cd GeneralisedIncentives && forge build

CONTRACT_JSON_FILES = \
	./GeneralisedIncentives/out/vIBCEscrow.sol/IncentivizedPolymerEscrow.json \
	./GeneralisedIncentives/out/SimpleApplication.sol/SimpleApplication.json \

.PHONY: bindings-gen-ts
bindings-gen-ts: forge-build
	echo "Generating TypeScript bindings..."; \
	rm -rfd ./src/evm/contracts/*; \
	npx typechain --target ethers-v6 --out-dir ./src/evm/contracts $(CONTRACT_JSON_FILES); \
	echo "Done."

dist: bindings-gen-ts
	bun run build
