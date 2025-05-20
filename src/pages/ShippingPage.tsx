import React from 'react';

const ShippingPage: React.FC = () => {
  return (
    <div className="section bg-cream">
      <div className="container-custom py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-olive-800 mb-6">Condiciones de Envío y Devoluciones</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">1. Plazos y Costes de Envío</h2>
              <div className="space-y-3 text-olive-900">
                <h3 className="text-lg font-medium text-olive-700">1.1 Plazos de entrega</h3>
                <p>
                  En Flor de Olivo S.A. nos comprometemos a procesar y preparar su pedido en un plazo máximo de 24-48 horas laborables desde la confirmación del mismo (excluyendo fines de semana y festivos).
                </p>
                <p>
                  Una vez preparado el pedido, los plazos de entrega aproximados son:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Península</strong>: 24-72 horas laborables</li>
                  <li><strong>Baleares</strong>: 3-5 días laborables</li>
                  <li><strong>Canarias, Ceuta y Melilla</strong>: 5-7 días laborables</li>
                  <li><strong>Unión Europea</strong>: 5-10 días laborables</li>
                  <li><strong>Resto del mundo</strong>: 10-15 días laborables</li>
                </ul>
                <p>
                  Estos plazos son orientativos y pueden verse afectados por circunstancias ajenas a nuestra empresa, como incidencias en el transporte, condiciones climáticas adversas o trámites aduaneros.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">1.2 Costes de envío</h3>
                <p>
                  Los gastos de envío se calculan en función del destino y el peso/volumen del pedido:
                </p>
                <table className="min-w-full border-collapse border border-olive-200 text-sm mt-2">
                  <thead>
                    <tr className="bg-olive-100">
                      <th className="border border-olive-200 p-2 text-left">Destino</th>
                      <th className="border border-olive-200 p-2 text-left">Coste</th>
                      <th className="border border-olive-200 p-2 text-left">Envío gratuito a partir de</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-olive-200 p-2">Península</td>
                      <td className="border border-olive-200 p-2">5.00€</td>
                      <td className="border border-olive-200 p-2">50.00€</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">Baleares</td>
                      <td className="border border-olive-200 p-2">7.50€</td>
                      <td className="border border-olive-200 p-2">75.00€</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">Canarias, Ceuta y Melilla</td>
                      <td className="border border-olive-200 p-2">12.00€ + impuestos y aranceles</td>
                      <td className="border border-olive-200 p-2">100.00€ (sólo gastos de envío, no incluye impuestos)</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">Unión Europea</td>
                      <td className="border border-olive-200 p-2">15.00€</td>
                      <td className="border border-olive-200 p-2">100.00€</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">Resto del mundo</td>
                      <td className="border border-olive-200 p-2">25.00€ + impuestos y aranceles</td>
                      <td className="border border-olive-200 p-2">150.00€ (sólo gastos de envío, no incluye impuestos)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-olive-600 mt-2">
                  * Los precios incluyen IVA cuando es aplicable. En envíos fuera de la UE, Canarias, Ceuta y Melilla, el cliente es responsable de los impuestos, tasas y aranceles aplicables en el país de destino.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">2. Métodos de Envío</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Flor de Olivo S.A. trabaja con las siguientes empresas de transporte para garantizar la máxima calidad y fiabilidad en sus envíos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>SEUR</strong>: Envíos en península y Baleares.</li>
                  <li><strong>MRW</strong>: Envíos urgentes y alternativa en península.</li>
                  <li><strong>Correos Express</strong>: Envíos a zonas rurales o de difícil acceso.</li>
                  <li><strong>DHL</strong>: Envíos internacionales y a Canarias, Ceuta y Melilla.</li>
                </ul>
                <p>
                  La elección de la empresa de transporte se realiza según criterios de eficiencia y optimización de rutas, buscando siempre la mejor opción para cada destino.
                </p>
                <p>
                  Una vez realizado el envío, recibirá un email con el número de seguimiento y un enlace para verificar el estado de su pedido en todo momento.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">3. Entrega</h2>
              <div className="space-y-3 text-olive-900">
                <h3 className="text-lg font-medium text-olive-700">3.1 Dirección de entrega</h3>
                <p>
                  Es responsabilidad del cliente proporcionar una dirección de entrega exacta y completa, así como un número de teléfono de contacto. Flor de Olivo S.A. no se hace responsable de los retrasos o imposibilidad de entrega derivados de datos incorrectos o incompletos.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">3.2 Recepción del pedido</h3>
                <p>
                  La entrega se realiza a pie de calle, en la dirección indicada por el cliente. Si en el momento de la entrega no hay nadie para recibir el pedido:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El transportista intentará contactar con el cliente telefónicamente.</li>
                  <li>Se realizará un segundo intento de entrega al día siguiente o en fecha acordada.</li>
                  <li>Tras dos intentos fallidos, el paquete permanecerá hasta 15 días en la oficina del transportista más cercana para su recogida.</li>
                  <li>Transcurrido este plazo sin recogida, el pedido será devuelto a nuestras instalaciones y el cliente deberá asumir los gastos de reenvío si desea recibirlo de nuevo.</li>
                </ul>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">3.3 Verificación del estado del paquete</h3>
                <p>
                  En el momento de la entrega, el cliente debe verificar el buen estado del embalaje antes de firmar el albarán de entrega. Si observa cualquier daño externo, debe hacerlo constar en el albarán antes de aceptar la entrega.
                </p>
                <p>
                  Una vez firmada la recepción conforme, no se aceptarán reclamaciones por daños exteriores.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">4. Política de Devoluciones</h2>
              <div className="space-y-3 text-olive-900">
                <h3 className="text-lg font-medium text-olive-700">4.1 Plazo para devoluciones</h3>
                <p>
                  El cliente dispone de 14 días naturales desde la recepción del pedido para ejercer su derecho de desistimiento, sin necesidad de justificación y sin penalización.
                </p>
                <p>
                  Para productos perecederos o alimentos, dado su carácter, solo se aceptarán devoluciones si:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El producto presenta defectos o daños en el momento de la entrega.</li>
                  <li>El producto recibido no corresponde con el solicitado.</li>
                  <li>El producto está dentro de su fecha de caducidad y no ha sido abierto ni manipulado.</li>
                </ul>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">4.2 Procedimiento de devolución</h3>
                <p>
                  Para iniciar una devolución, el cliente debe:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contactar con nuestro servicio de atención al cliente a través del email devoluciones@flordolivo.com o llamando al +34 91 123 45 67.</li>
                  <li>Indicar el número de pedido, los productos a devolver y el motivo.</li>
                  <li>Nuestro equipo le proporcionará un número de devolución y las instrucciones para el envío.</li>
                  <li>Embalar adecuadamente los productos, incluyendo todos los elementos originales, documentación y embalajes.</li>
                  <li>Enviar el paquete a la dirección indicada, incluyendo visible el número de devolución proporcionado.</li>
                </ol>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">4.3 Condiciones de los productos devueltos</h3>
                <p>
                  Para aceptar una devolución, los productos deben:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Estar en perfecto estado, sin usar y con su embalaje original.</li>
                  <li>Incluir todos los accesorios, etiquetas y documentación original.</li>
                  <li>No haber sido abiertos en el caso de productos alimentarios o cosméticos, por razones de higiene y seguridad.</li>
                </ul>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">4.4 Reembolso</h3>
                <p>
                  Una vez recibida y verificada la devolución, procederemos al reembolso en un plazo máximo de 14 días naturales, utilizando el mismo medio de pago empleado en la compra.
                </p>
                <p>
                  El reembolso incluirá:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El importe íntegro de los productos devueltos.</li>
                  <li>Los gastos de envío iniciales (solo si se devuelve la totalidad del pedido y la devolución se debe a defectos o errores por nuestra parte).</li>
                </ul>
                <p>
                  Los gastos de devolución correrán por cuenta del cliente, excepto en los siguientes casos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Productos defectuosos o dañados durante el transporte.</li>
                  <li>Envío de productos diferentes a los solicitados.</li>
                  <li>Pérdida parcial del contenido del pedido.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">5. Casos Especiales</h2>
              <div className="space-y-3 text-olive-900">
                <h3 className="text-lg font-medium text-olive-700">5.1 Productos defectuosos</h3>
                <p>
                  Si al recibir su pedido encuentra algún producto defectuoso o dañado:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contacte con nuestro servicio de atención al cliente en un plazo máximo de 48 horas desde la recepción.</li>
                  <li>Envíe fotografías del producto y del embalaje a incidencias@flordolivo.com.</li>
                  <li>Conserve el producto y el embalaje original para una posible recogida o inspección.</li>
                </ol>
                <p>
                  En estos casos, asumiremos íntegramente los gastos de devolución y enviaremos un producto de reemplazo o realizaremos el reembolso según su preferencia.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">5.2 Pedidos incompletos</h3>
                <p>
                  Si recibe un pedido incompleto o con productos erróneos, contacte inmediatamente con nuestro servicio de atención al cliente. Resolveremos la incidencia enviando los productos faltantes o correctos a la mayor brevedad posible, sin coste adicional.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">5.3 Imposibilidad de entrega</h3>
                <p>
                  Si tras dos intentos no ha sido posible realizar la entrega, el pedido permanecerá hasta 15 días en la oficina del transportista. Transcurrido este plazo, el pedido será devuelto a nuestras instalaciones.
                </p>
                <p>
                  Si desea recibir su pedido tras una devolución por imposibilidad de entrega, deberá abonar nuevamente los gastos de envío, excepto cuando la imposibilidad sea atribuible a Flor de Olivo S.A. o a la empresa de transporte.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">6. Contacto</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Para cualquier consulta relacionada con envíos y devoluciones, puede contactar con nuestro servicio de atención al cliente:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email: atencionalcliente@flordolivo.com</li>
                  <li>Teléfono: +34 91 123 45 67 (Lunes a viernes, 9:00 - 18:00h)</li>
                  <li>Dirección postal: Calle del Olivo, 123 - 28001 Madrid, España</li>
                </ul>
              </div>
            </section>
            
            <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
              <p>Última actualización: 10 de julio de 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage; 