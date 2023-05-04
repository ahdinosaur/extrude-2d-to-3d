import { extname } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import modeling from '@jscad/modeling'
import dxfDeserializer from '@jscad/dxf-deserializer'
import stlSerializer from '@jscad/stl-serializer'
import mf3Serializer from '@jscad/3mf-serializer'

const {
  extrusions: { extrudeLinear },
  booleans: { union },
  geometries: { path2: Path2, geom2: Geom2 }
} = modeling

export async function extrude2dTo3D(options) {
  const { input: inputFilePath, output: outputFilePath, height } = options

  const inputFileExt = extname(inputFilePath)
  const outputFileExt = extname(outputFilePath)

  const inputFileData = await readFile(inputFilePath, 'utf8')

  let geom2d
  switch (inputFileExt) {
    case '.dxf':
      const geoms2d = dxfDeserializer.deserialize({ filename: inputFilePath, output: 'geometry' }, inputFileData)
      const lines = []
      geoms2d.forEach(geom2d => {
        if (isLine(geom2d)) {
          lines.push(geom2d)
        } else {
          // TODO handle other cases
          console.error(geom2d)
          throw new Error('Not implemented.')
        }
      })
      const linesGeom2d = Geom2.create(
        lines.map(line => line.points)
      )
      geom2d = union(linesGeom2d)
      break
    default: 
      throw new Error(`Unexpected input file extension: ${inputFileExt}`)
  }

  const geom3d = extrudeLinear({ height }, geom2d)

  let outputFileData
  switch (outputFileExt) {
    case '.stl':
      outputFileData = stlSerializer.serialize({}, geom3d)
      break
    case '.3mf':
      outputFileData = mf3Serializer.serialize({}, geom3d)
      break
    default: 
      throw new Error(`Unexpected output file extension: ${outputFileExt}`)
  }

  await writeFile(outputFilePath, outputFileData)
}

function isLine(obj) {
  return Path2.isA(obj) && obj.points.length === 2
}
