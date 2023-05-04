#!/usr/bin/env node

import meow from 'meow'
import { extrude2dTo3D } from './index.js'

const cli = meow(`
  Usage
    $ extrude-2d-to-3d [options]

  Options
    --input, -i  Input file path
    --output, -o  Output file path
    --height, -h  Height of the extrusion

  Examples
    $ extrude-2d-to-3d -i 2d.dxf -o 3d.stl -h 10
`, {
  importMeta: import.meta,
  flags: {
    input: {
      type: 'string',
      shortFlag: 'i',
      isRequired: true,
    },
    output: {
      type: 'string',
      shortFlag: 'o',
      isRequired: true,
    },
    height: {
      type: 'number',
      shortFlag: 'h',
      isRequired: true,
    },
  },
})

extrude2dTo3D(cli.flags)
