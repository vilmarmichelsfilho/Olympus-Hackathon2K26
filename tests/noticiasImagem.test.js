import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { test } from 'node:test'
import {
  LIMITE_IMAGEM,
  dataUrlImagemValida,
  validarCabecalhoImagem,
  validarMetadadosImagem,
} from '../src/Utils/noticiasImagemUtils.js'

test('aceita somente os formatos e tamanhos previstos, inclusive o limite exato', () => {
  for (const type of ['image/jpeg', 'image/png', 'image/webp'])
    assert.doesNotThrow(() => validarMetadadosImagem({ type, size: LIMITE_IMAGEM }))
  for (const arquivo of [
    { type: 'image/svg+xml', size: 10 },
    { type: 'text/plain', size: 10 },
    { type: 'image/png', size: 0 },
    { type: 'image/png', size: LIMITE_IMAGEM + 1 },
  ]) {
    assert.throws(() => validarMetadadosImagem(arquivo))
  }
})

test('confere assinatura de arquivo e não aceita texto renomeado como imagem', () => {
  const png = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])
  assert(validarCabecalhoImagem(png, 'image/png'))
  assert(validarCabecalhoImagem(Uint8Array.from([255, 216, 255]), 'image/jpeg'))
  assert(validarCabecalhoImagem(new TextEncoder().encode('RIFFxxxxWEBP'), 'image/webp'))
  assert.equal(validarCabecalhoImagem(png, 'image/jpeg'), false)
  assert.equal(validarCabecalhoImagem(new TextEncoder().encode('texto'), 'image/png'), false)
})

test('valida data URL com limite de bytes, tipo e base64', () => {
  const png = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])
  const url = `data:image/png;base64,${btoa(String.fromCharCode(...png))}`
  assert(dataUrlImagemValida(url))
  for (const invalida of [
    null,
    'blob:temporario',
    'data:image/svg+xml;base64,AAAA',
    'data:image/png;base64,***',
    'data:image/png;base64,dGV4dG8=',
  ]) {
    assert.equal(dataUrlImagemValida(invalida), false)
  }
  const bytes = new Uint8Array(LIMITE_IMAGEM + 1)
  bytes.set(png)
  const grande = `data:image/png;base64,${Buffer.from(bytes).toString('base64')}`
  assert.equal(dataUrlImagemValida(grande), false)
})
