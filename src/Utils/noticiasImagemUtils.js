export const LIMITE_IMAGEM = 1024 * 1024
export const TIPOS_IMAGEM = ['image/jpeg', 'image/png', 'image/webp']

export function validarCabecalhoImagem(bytes, tipo) {
  if (tipo === 'image/jpeg') return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
  if (tipo === 'image/png') {
    return [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte)
  }
  if (tipo === 'image/webp') {
    return (
      String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
      String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
    )
  }
  return false
}

export function dataUrlImagemValida(valor) {
  if (typeof valor !== 'string' || valor.length > Math.ceil(LIMITE_IMAGEM / 3) * 4 + 40)
    return false
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(valor)
  if (!match) return false
  try {
    const binario = atob(match[2])
    return (
      binario.length <= LIMITE_IMAGEM &&
      validarCabecalhoImagem(
        Uint8Array.from(binario.slice(0, 12), (char) => char.charCodeAt(0)),
        match[1],
      )
    )
  } catch {
    return false
  }
}

export function validarMetadadosImagem(arquivo) {
  if (!arquivo || !TIPOS_IMAGEM.includes(arquivo.type)) {
    throw new Error('Escolha uma imagem JPEG, PNG ou WebP.')
  }
  if (!arquivo.size || arquivo.size > LIMITE_IMAGEM) {
    throw new Error('A imagem deve ter até 1 MiB.')
  }
}

export async function prepararImagemNoticia(arquivo) {
  validarMetadadosImagem(arquivo)
  const bytes = new Uint8Array(await arquivo.slice(0, 12).arrayBuffer())
  if (!validarCabecalhoImagem(bytes, arquivo.type))
    throw new Error('O arquivo não é uma imagem válida.')
  const dataUrl = await new Promise((resolve, reject) => {
    const leitor = new FileReader()
    leitor.onload = () => resolve(leitor.result)
    leitor.onerror = () => reject(new Error('Não foi possível ler a imagem. Tente outro arquivo.'))
    leitor.onabort = () => reject(new Error('A leitura da imagem foi interrompida.'))
    leitor.readAsDataURL(arquivo)
  })
  await new Promise((resolve, reject) => {
    const imagem = new Image()
    imagem.onload = () =>
      imagem.naturalWidth && imagem.naturalHeight
        ? resolve()
        : reject(new Error('A imagem está vazia.'))
    imagem.onerror = () =>
      reject(new Error('Não foi possível abrir a imagem. Escolha outro arquivo.'))
    imagem.src = dataUrl
  })
  if (!dataUrlImagemValida(dataUrl)) throw new Error('A imagem não é válida.')
  return dataUrl
}
