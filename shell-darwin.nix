{ pkgs }:

pkgs.mkShell {
  buildInputs = [
    pkgs.darwin.apple_sdk.frameworks.Security
    pkgs.pkg-config
    pkgs.openssl
  ];

  packages = [
    pkgs.gnumake
    pkgs.foundry-bin
    pkgs.bun
  ];
}
