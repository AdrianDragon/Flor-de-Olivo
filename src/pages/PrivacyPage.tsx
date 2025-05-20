import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="section bg-cream">
      <div className="container-custom py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-olive-800 mb-6">Política de Privacidad</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">1. Responsable del Tratamiento</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  <strong>Identidad</strong>: Flor de Olivo S.A.
                </p>
                <p>
                  <strong>CIF</strong>: A12345678
                </p>
                <p>
                  <strong>Dirección</strong>: Calle del Olivo, 123 - 28001 Madrid, España
                </p>
                <p>
                  <strong>Teléfono</strong>: +34 91 123 45 67
                </p>
                <p>
                  <strong>Email</strong>: privacidad@flordolivo.com
                </p>
                <p>
                  <strong>Delegado de Protección de Datos (DPO)</strong>: dpo@flordolivo.com
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">2. Información Recopilada</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Flor de Olivo S.A. recoge y trata los siguientes tipos de datos personales:
                </p>
                <h3 className="text-lg font-medium text-olive-700">2.1 Datos proporcionados activamente por el usuario</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Información de identificación personal: nombre, apellidos, dirección postal, dirección de correo electrónico, número de teléfono.</li>
                  <li>Información de la cuenta: nombre de usuario, contraseña (almacenada de forma cifrada).</li>
                  <li>Información de transacciones: detalles de compras, historial de pedidos, preferencias de productos.</li>
                  <li>Comunicaciones con nosotros: el contenido de los mensajes enviados a través de formularios de contacto, correo electrónico o chat.</li>
                </ul>
                
                <h3 className="text-lg font-medium text-olive-700">2.2 Datos recopilados automáticamente</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Información técnica: dirección IP, tipo de navegador, proveedor de servicios de Internet, identificadores de dispositivos.</li>
                  <li>Información de navegación: páginas visitadas, tiempo pasado en la página, productos vistos, clics en enlaces, patrones de navegación.</li>
                  <li>Cookies y tecnologías similares: información detallada en nuestra Política de Cookies.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">3. Finalidades del Tratamiento</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Tratamos sus datos personales con las siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Gestión de pedidos y prestación de servicios</strong>: procesamiento de compras, entrega de productos, gestión de pagos, servicio postventa.</li>
                  <li><strong>Gestión de la cuenta de usuario</strong>: creación y mantenimiento de la cuenta, personalización de experiencia, acceso a historial de compras.</li>
                  <li><strong>Atención al cliente</strong>: respuesta a consultas, reclamaciones y solicitudes.</li>
                  <li><strong>Comunicaciones comerciales</strong>: envío de información sobre productos, ofertas y novedades (siempre con consentimiento previo y opción de darse de baja).</li>
                  <li><strong>Mejora de servicios</strong>: análisis de uso, estudios estadísticos, test de usabilidad, mejora de la experiencia de usuario.</li>
                  <li><strong>Prevención de fraude</strong>: verificación de identidad, prevención de actividades fraudulentas.</li>
                  <li><strong>Cumplimiento legal</strong>: obligaciones fiscales, contables y otras obligaciones legales.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">4. Base Legal del Tratamiento</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  El tratamiento de sus datos personales se fundamenta en las siguientes bases legales:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Ejecución de un contrato</strong>: cuando es necesario para cumplir con nuestras obligaciones contractuales (gestión de pedidos, entrega de productos, servicio al cliente).</li>
                  <li><strong>Consentimiento</strong>: para tratamientos específicos como el envío de comunicaciones comerciales.</li>
                  <li><strong>Interés legítimo</strong>: para mejorar nuestros servicios, prevenir fraudes, y garantizar la seguridad de nuestra plataforma.</li>
                  <li><strong>Cumplimiento de obligaciones legales</strong>: cuando sea requerido por la ley aplicable.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">5. Tiempo de Conservación</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Conservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades para las que se recogieron, incluyendo el cumplimiento de obligaciones legales, contables o de información.
                </p>
                <p>
                  De manera general:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Datos de clientes: durante la relación contractual y los plazos legales para reclamaciones (generalmente 5 años después de la última compra).</li>
                  <li>Datos fiscales y de facturación: durante el plazo exigido por la legislación fiscal (generalmente 6 años).</li>
                  <li>Datos de usuarios registrados: mientras la cuenta permanezca activa y, tras su cierre, durante el plazo legal para posibles reclamaciones.</li>
                  <li>Datos de comunicaciones comerciales: hasta que se solicite la baja o se retire el consentimiento.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">6. Destinatarios de los Datos</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Sus datos personales pueden ser comunicados a los siguientes destinatarios:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Proveedores de servicios</strong>: empresas que nos ayudan a prestar nuestros servicios (procesamiento de pagos, logística y transporte, alojamiento web, marketing).</li>
                  <li><strong>Administraciones públicas</strong>: cuando sea requerido por ley.</li>
                  <li><strong>Entidades financieras</strong>: para la gestión de pagos y posibles reembolsos.</li>
                </ul>
                <p>
                  Todos los proveedores de servicios están obligados por contrato a garantizar la confidencialidad y seguridad de sus datos. No vendemos ni alquilamos sus datos personales a terceros.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">7. Transferencias Internacionales</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En estos casos, garantizamos la existencia de salvaguardas adecuadas:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Decisiones de adecuación de la Comisión Europea.</li>
                  <li>Cláusulas contractuales tipo aprobadas por la Comisión Europea.</li>
                  <li>Adhesión a marcos de protección de datos internacionalmente reconocidos.</li>
                </ul>
                <p>
                  Puede solicitar más información sobre estas transferencias y las garantías aplicables contactando con nuestro Delegado de Protección de Datos.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">8. Derechos de los Interesados</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Usted tiene los siguientes derechos en relación con sus datos personales:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acceso</strong>: conocer qué datos personales tratamos sobre usted.</li>
                  <li><strong>Rectificación</strong>: solicitar la corrección de datos inexactos.</li>
                  <li><strong>Supresión</strong>: solicitar la eliminación de sus datos personales.</li>
                  <li><strong>Oposición</strong>: oponerse al tratamiento de sus datos para determinadas finalidades.</li>
                  <li><strong>Limitación del tratamiento</strong>: solicitar la restricción del procesamiento de sus datos.</li>
                  <li><strong>Portabilidad</strong>: recibir sus datos en un formato estructurado y transmitirlos a otro responsable.</li>
                  <li><strong>Retirar el consentimiento</strong>: revocar en cualquier momento los consentimientos otorgados.</li>
                </ul>
                <p>
                  Puede ejercer estos derechos enviando un correo electrónico a privacidad@flordolivo.com o una carta a nuestra dirección postal, acompañando copia de su DNI o documento equivalente.
                </p>
                <p>
                  También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">9. Medidas de Seguridad</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Hemos implementado medidas técnicas y organizativas adecuadas para garantizar un nivel de seguridad apropiado al riesgo, incluyendo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cifrado de datos y comunicaciones seguras (SSL/TLS).</li>
                  <li>Sistemas de control de acceso y autenticación.</li>
                  <li>Copias de seguridad regulares.</li>
                  <li>Evaluaciones periódicas de seguridad y privacidad.</li>
                  <li>Formación del personal en materia de protección de datos.</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">10. Modificaciones de la Política de Privacidad</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas o por motivos legales. La versión actualizada estará siempre disponible en nuestra web con la fecha de la última modificación.
                </p>
                <p>
                  Le recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos sus datos.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">11. Contacto</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Si tiene preguntas o inquietudes sobre esta política de privacidad o el tratamiento de sus datos personales, puede contactar con nosotros:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email del Delegado de Protección de Datos: dpo@flordolivo.com</li>
                  <li>Teléfono: +34 91 123 45 67</li>
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

export default PrivacyPage; 