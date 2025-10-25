import codesData from '@/app/codes.json'

interface CodeValidationResult {
  isValid: boolean
  eventId?: string
  eventName?: string
  error?: string
}

/**
 * Valida si un código existe en el archivo codes.json y retorna el eventId correspondiente
 */
export function validateClaimCode(code: string): CodeValidationResult {
  // Limpiar el código (eliminar espacios y convertir a mayúsculas)
  const cleanCode = code.trim().toUpperCase()
  
  // Verificar si el código existe en el mapeo
  const eventId = (codesData.codeToEventId as Record<string, string>)[cleanCode]
  
  if (!eventId) {
    return {
      isValid: false,
      error: 'Código de claim no válido'
    }
  }
  
  // Buscar información del evento
  const eventInfo = (codesData.events as Record<string, any>)[eventId]
  
  if (!eventInfo) {
    return {
      isValid: false,
      error: 'Evento no encontrado para este código'
    }
  }
  
  return {
    isValid: true,
    eventId,
    eventName: eventInfo.name
  }
}

/**
 * Obtiene todos los códigos disponibles (útil para debugging)
 */
export function getAllAvailableCodes(): string[] {
  return Object.keys(codesData.codeToEventId)
}

/**
 * Obtiene información de todos los eventos
 */
export function getAllEvents() {
  return codesData.events
}