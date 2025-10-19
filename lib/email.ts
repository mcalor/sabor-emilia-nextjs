
export function createMailtoLink(params: {
  to: string
  subject?: string
  body?: string
}): string {
  const urlParams = new URLSearchParams()
  
  if (params.subject) {
    urlParams.set('subject', params.subject)
  }
  
  if (params.body) {
    urlParams.set('body', params.body)
  }
  
  const queryString = urlParams.toString()
  return `mailto:${params.to}${queryString ? `?${queryString}` : ''}`
}

export function sendEmail(params: {
  to: string
  subject?: string
  body?: string
}) {
  const mailtoLink = createMailtoLink(params)
  
  // Open email client
  if (typeof window !== 'undefined') {
    window.location.href = mailtoLink
  }
}
