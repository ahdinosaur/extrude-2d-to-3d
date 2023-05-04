# extrude-2d-to-3d

Extrude 2d (`.dxf`) file to 3d (`.stl`, `.3mf`) file

(At the moment, this only handles my specific use case. Open to pull requests!)

## Install

```shell
npm install -g extrude-2d-to-3d
```

## Usage

```shell
Usage
  $ extrude-2d-to-3d [options]

Options
  --input, -i  Input file path
  --output, -o  Output file path
  --height, -h  Height of the extrusion

Examples
  $ extrude-2d-to-3d -i 2d.dxf -o 3d.stl -h 10
```
