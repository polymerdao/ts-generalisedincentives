{ pkgs }:

pkgs.mkShell {
  packages = [
    pkgs.gnumake
    pkgs.foundry-bin
  ];
}
