
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { sendEmail } from '@/lib/email'

export function ContactClient() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name?.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa tu nombre",
        variant: "destructive"
      })
      return false
    }

    if (!formData.email?.trim()) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      })
      return false
    }

    if (!formData.message?.trim()) {
      toast({
        title: "Mensaje requerido",
        description: "Por favor escribe tu mensaje",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Save to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
      }

      // Send email
      const emailBody = `Nuevo mensaje de contacto:

Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}

Mensaje:
${formData.message}

---
Enviado desde el sitio web de Coctelería Sabor Emilia`

      sendEmail({
        to: 'contacto.cocteleria.saboremilia@gmail.com',
        subject: `Nuevo mensaje de contacto - ${formData.name}`,
        body: emailBody
      })

      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto. También se abrirá tu cliente de email.",
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })

    } catch (error) {
      console.error('Contact error:', error)
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Villa Alemana, V Región de Valparaíso',
      subContent: 'Servicio a domicilio en comunas cercanas'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+56 9 7859 4407',
      subContent: 'WhatsApp disponible'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contacto.cocteleria.saboremilia@gmail.com',
      subContent: 'Respuesta en 24 horas'
    },
    {
      icon: Clock,
      title: 'Horarios',
      content: 'Lunes a Viernes: 9:00 - 18:00',
      subContent: 'Sábados: 9:00 - 14:00'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-primary">Contacto</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ¿Tienes preguntas sobre nuestros productos o servicios? ¿Necesitas una cotización para tu evento? 
          Estamos aquí para ayudarte.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Envíanos un mensaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Cuéntanos sobre tu evento, consulta o cotización..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full button-hover"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, también se abrirá tu cliente de email como respaldo
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                  >
                    <Card className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {info.title}
                            </h3>
                            <p className="text-gray-600 font-medium">
                              {info.content}
                            </p>
                            <p className="text-sm text-gray-500">
                              {info.subContent}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Servicios Disponibles
                </h3>
                <div className="space-y-2 text-sm">
                  <p>• Eventos corporativos</p>
                  <p>• Matrimonios y celebraciones</p>
                  <p>• Cumpleaños y reuniones familiares</p>
                  <p>• Menús personalizados</p>
                  <p>• Servicio a domicilio</p>
                  <p>• Asesoría gastronómica</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-sage rounded-lg p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-4">
              Para cotizaciones incluye:
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Fecha y horario del evento</p>
              <p>• Número aproximado de invitados</p>
              <p>• Tipo de evento y duración</p>
              <p>• Ubicación y acceso</p>
              <p>• Productos o servicios de interés</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
