
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Truck, RefreshCw, FileText } from 'lucide-react'

export const metadata = {
  title: 'Políticas - Coctelería Sabor Emilia',
  description: 'Políticas de envío, devoluciones, privacidad y términos de servicio'
}

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Políticas y <span className="text-primary">Términos</span>
            </h1>
            <p className="text-lg text-gray-600">
              Información importante sobre nuestros servicios y políticas
            </p>
          </div>

          <div className="space-y-8">
            {/* Shipping Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  Política de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cobertura de Entrega</h3>
                  <p className="mb-2">Realizamos entregas en Villa Alemana y comunas cercanas:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Villa Alemana (sin costo adicional)</li>
                    <li>Quilpué, Valparaíso, Viña del Mar</li>
                    <li>Concón, Quintero, Puchuncaví</li>
                    <li>Limache, Olmué, Casablanca</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tiempos de Entrega</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Pedidos estándar:</strong> 24-48 horas hábiles</li>
                    <li><strong>Eventos grandes (+50 personas):</strong> 3-5 días hábiles</li>
                    <li><strong>Pedidos urgentes:</strong> Consultar disponibilidad</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Costos de Envío</h3>
                  <p className="text-sm">
                    Tarifa plana de $3.000 CLP para todas las entregas. 
                    Envío gratuito en pedidos superiores a $50.000 CLP en Villa Alemana.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Horarios de Entrega</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Lunes a Viernes:</strong> 10:00 - 19:00</li>
                    <li><strong>Sábados:</strong> 10:00 - 16:00</li>
                    <li><strong>Domingos:</strong> Solo eventos programados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Return Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  Política de Devoluciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Productos Alimenticios</h3>
                  <p className="text-sm mb-2">
                    Debido a la naturaleza perecedera de nuestros productos, no aceptamos devoluciones 
                    una vez entregados, excepto en los siguientes casos:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Error en el pedido por parte de Coctelería Sabor Emilia</li>
                    <li>Productos dañados durante el transporte</li>
                    <li>Productos en mal estado al momento de la entrega</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Procedimiento de Reclamos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Reportar el problema dentro de 2 horas de la entrega</li>
                    <li>Contactar vía WhatsApp o email con fotos del producto</li>
                    <li>Proporcionar número de pedido y detalles del problema</li>
                    <li>Reposición o reembolso según corresponda</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cancelaciones</h3>
                  <p className="text-sm">
                    Los pedidos pueden cancelarse hasta 12 horas antes de la entrega programada. 
                    Para eventos especiales, se requiere 48 horas de anticipación.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Política de Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Información que Recopilamos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Información de contacto (nombre, email, teléfono)</li>
                    <li>Dirección de entrega</li>
                    <li>Historial de pedidos</li>
                    <li>Preferencias de productos</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Uso de la Información</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Procesar y entregar pedidos</li>
                    <li>Comunicación sobre pedidos y servicios</li>
                    <li>Mejorar nuestros productos y servicios</li>
                    <li>Envío de ofertas especiales (con consentimiento)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Protección de Datos</h3>
                  <p className="text-sm">
                    No compartimos tu información personal con terceros, excepto cuando sea 
                    necesario para procesar pagos o entregas. Utilizamos medidas de seguridad 
                    apropiadas para proteger tu información.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies</h3>
                  <p className="text-sm">
                    Utilizamos cookies para mejorar tu experiencia de navegación y recordar 
                    tu carrito de compras. Puedes deshabilitarlas en tu navegador.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms of Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Términos de Servicio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Aceptación de Términos</h3>
                  <p className="text-sm">
                    Al realizar un pedido, aceptas estos términos y condiciones. 
                    Nos reservamos el derecho de modificar estos términos en cualquier momento.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Disponibilidad de Productos</h3>
                  <p className="text-sm">
                    Los productos están sujetos a disponibilidad. En caso de no disponibilidad, 
                    te contactaremos para ofrecer alternativas o reembolso.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Precios y Pagos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Los precios están en pesos chilenos (CLP)</li>
                    <li>Los precios pueden cambiar sin previo aviso</li>
                    <li>El pago se procesa a través de MercadoPago</li>
                    <li>No se aceptan pagos en efectivo en la entrega</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Responsabilidad</h3>
                  <p className="text-sm">
                    Coctelería Sabor Emilia se compromete a entregar productos de calidad 
                    en las condiciones acordadas. No nos hacemos responsables por alergias 
                    no declaradas o problemas de salud preexistentes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contacto</h3>
                  <p className="text-sm">
                    Para consultas sobre estas políticas, contáctanos en 
                    contacto.cocteleria.saboremilia@gmail.com o +56 9 7859 4407.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Última actualización: Enero 2025
            </p>
            <p className="mt-2">
              Coctelería Sabor Emilia - Villa Alemana, Chile
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
