export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function normalizarId(value) {
  if (value == null || value === '') return value
  const numero = Number(value)
  return Number.isFinite(numero) ? numero : String(value)
}

export async function apiRequest(resource, id = '', options = {}) {
  const suffix = id === '' ? '' : `/${encodeURIComponent(id)}`
  const response = await fetch(`${API_URL}/${resource}${suffix}`, {
    ...options,
    headers: options.body ? { 'Content-Type': 'application/json', ...options.headers } : options.headers,
  })
  if (!response.ok) throw new Error(`Falha em ${resource}: ${response.status}`)
  if (response.status === 204 || options.method === 'DELETE') return null
  return response.json()
}

export const listar = (resource) => apiRequest(resource)
export const criar = (resource, data) => apiRequest(resource, '', { method: 'POST', body: JSON.stringify(data) })
export const atualizar = (resource, id, data) => apiRequest(resource, id, { method: 'PATCH', body: JSON.stringify(data) })
export const excluir = (resource, id) => apiRequest(resource, id, { method: 'DELETE' })

export function mesmoId(a, b) {
  if (a == null || b == null) return a == null && b == null
  const numeroA = Number(a)
  const numeroB = Number(b)
  if (Number.isFinite(numeroA) && Number.isFinite(numeroB)) return numeroA === numeroB
  return String(a) === String(b)
}

export function normalizarRegistro(item, chave, chaveTorneio = 'id_torneio') {
  const codigo = item[chave] ?? item.id
  return { ...item, id: String(item.id ?? codigo), [chave]: normalizarId(codigo),
    ...(item[chaveTorneio] != null ? { [chaveTorneio]: normalizarId(item[chaveTorneio]) } : {}) }
}

export async function carregarColecao(resource, destino, normalizar = (item) => item) {
  const dados = await listar(resource)
  destino.splice(0, destino.length, ...dados.map(normalizar))
  return destino
}
