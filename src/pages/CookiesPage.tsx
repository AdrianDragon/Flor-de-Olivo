import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className="section bg-cream">
      <div className="container-custom py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-olive-800 mb-6">Política de Cookies</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">1. ¿Qué son las cookies?</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo cuando los visita. Estos archivos permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a introducir determinada información cada vez que visite el sitio o navegue de una página a otra.
                </p>
                <p>
                  Las cookies se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">2. Tipos de cookies que utilizamos</h2>
              <div className="space-y-3 text-olive-900">
                <h3 className="text-lg font-medium text-olive-700">2.1 Cookies técnicas o necesarias</h3>
                <p>
                  Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan.
                </p>
                <table className="min-w-full border-collapse border border-olive-200 text-sm mt-2">
                  <thead>
                    <tr className="bg-olive-100">
                      <th className="border border-olive-200 p-2 text-left">Nombre</th>
                      <th className="border border-olive-200 p-2 text-left">Proveedor</th>
                      <th className="border border-olive-200 p-2 text-left">Finalidad</th>
                      <th className="border border-olive-200 p-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-olive-200 p-2">session_id</td>
                      <td className="border border-olive-200 p-2">flordolivo.com</td>
                      <td className="border border-olive-200 p-2">Identifica la sesión del usuario</td>
                      <td className="border border-olive-200 p-2">Sesión</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">cart_id</td>
                      <td className="border border-olive-200 p-2">flordolivo.com</td>
                      <td className="border border-olive-200 p-2">Gestiona el carrito de compra</td>
                      <td className="border border-olive-200 p-2">1 año</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">cookie_consent</td>
                      <td className="border border-olive-200 p-2">flordolivo.com</td>
                      <td className="border border-olive-200 p-2">Almacena la aceptación de cookies</td>
                      <td className="border border-olive-200 p-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3 className="text-lg font-medium text-olive-700 mt-6">2.2 Cookies analíticas</h3>
                <p>
                  Son aquellas que permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas.
                </p>
                <table className="min-w-full border-collapse border border-olive-200 text-sm mt-2">
                  <thead>
                    <tr className="bg-olive-100">
                      <th className="border border-olive-200 p-2 text-left">Nombre</th>
                      <th className="border border-olive-200 p-2 text-left">Proveedor</th>
                      <th className="border border-olive-200 p-2 text-left">Finalidad</th>
                      <th className="border border-olive-200 p-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-olive-200 p-2">_ga</td>
                      <td className="border border-olive-200 p-2">Google Analytics</td>
                      <td className="border border-olive-200 p-2">Distinguir usuarios únicos</td>
                      <td className="border border-olive-200 p-2">2 años</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">_gid</td>
                      <td className="border border-olive-200 p-2">Google Analytics</td>
                      <td className="border border-olive-200 p-2">Distinguir usuarios</td>
                      <td className="border border-olive-200 p-2">24 horas</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">_gat</td>
                      <td className="border border-olive-200 p-2">Google Analytics</td>
                      <td className="border border-olive-200 p-2">Limitar el porcentaje de solicitudes</td>
                      <td className="border border-olive-200 p-2">1 minuto</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3 className="text-lg font-medium text-olive-700 mt-6">2.3 Cookies de personalización</h3>
                <p>
                  Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario.
                </p>
                <table className="min-w-full border-collapse border border-olive-200 text-sm mt-2">
                  <thead>
                    <tr className="bg-olive-100">
                      <th className="border border-olive-200 p-2 text-left">Nombre</th>
                      <th className="border border-olive-200 p-2 text-left">Proveedor</th>
                      <th className="border border-olive-200 p-2 text-left">Finalidad</th>
                      <th className="border border-olive-200 p-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-olive-200 p-2">user_pref</td>
                      <td className="border border-olive-200 p-2">flordolivo.com</td>
                      <td className="border border-olive-200 p-2">Almacena preferencias del usuario</td>
                      <td className="border border-olive-200 p-2">1 año</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">language</td>
                      <td className="border border-olive-200 p-2">flordolivo.com</td>
                      <td className="border border-olive-200 p-2">Almacena el idioma seleccionado</td>
                      <td className="border border-olive-200 p-2">1 año</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3 className="text-lg font-medium text-olive-700 mt-6">2.4 Cookies publicitarias</h3>
                <p>
                  Son aquellas que permiten la gestión de los espacios publicitarios que, en su caso, el editor haya incluido en una página web.
                </p>
                <table className="min-w-full border-collapse border border-olive-200 text-sm mt-2">
                  <thead>
                    <tr className="bg-olive-100">
                      <th className="border border-olive-200 p-2 text-left">Nombre</th>
                      <th className="border border-olive-200 p-2 text-left">Proveedor</th>
                      <th className="border border-olive-200 p-2 text-left">Finalidad</th>
                      <th className="border border-olive-200 p-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-olive-200 p-2">_fbp</td>
                      <td className="border border-olive-200 p-2">Facebook</td>
                      <td className="border border-olive-200 p-2">Píxel de Facebook para analítica y publicidad</td>
                      <td className="border border-olive-200 p-2">3 meses</td>
                    </tr>
                    <tr>
                      <td className="border border-olive-200 p-2">_gcl_au</td>
                      <td className="border border-olive-200 p-2">Google Adsense</td>
                      <td className="border border-olive-200 p-2">Medir la eficacia de la publicidad</td>
                      <td className="border border-olive-200 p-2">3 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">3. Control de cookies</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Usted puede controlar y gestionar las cookies de diversas maneras. Tenga en cuenta que eliminar o bloquear las cookies podría afectar a la funcionalidad de este sitio web y podría impedirle acceder a ciertas áreas o funciones del mismo.
                </p>
                <h3 className="text-lg font-medium text-olive-700">3.1 Panel de configuración de cookies</h3>
                <p>
                  La primera vez que accede a nuestro sitio web, se le presenta un aviso de cookies en el que puede configurar qué categorías de cookies desea aceptar o rechazar. Puede cambiar sus preferencias en cualquier momento visitando la sección "Configuración de cookies" en el pie de página de nuestro sitio web.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700">3.2 Configuración del navegador</h3>
                <p>
                  También puede controlar las cookies a través de la configuración de su navegador. La mayoría de los navegadores le permiten controlar las cookies a través de sus preferencias.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Chrome</strong>: Configuración {'>'}  Privacidad y seguridad {'>'}  Cookies y otros datos de sitios.
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Más información</a>
                  </li>
                  <li>
                    <strong>Firefox</strong>: Opciones {'>'}  Privacidad y Seguridad {'>'}  Cookies y datos del sitio.
                    <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Más información</a>
                  </li>
                  <li>
                    <strong>Safari</strong>: Preferencias {'>'}  Privacidad {'>'}  Cookies y datos de sitios web.
                    <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Más información</a>
                  </li>
                  <li>
                    <strong>Edge</strong>: Configuración {'>'}  Cookies y permisos del sitio {'>'}  Cookies.
                    <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Más información</a>
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">3.3 Herramientas de terceros</h3>
                <p>
                  Existen herramientas en línea que permiten a los usuarios detectar las cookies en cada sitio web que visitan y gestionar su desactivación, como por ejemplo Ghostery.
                </p>
                
                <h3 className="text-lg font-medium text-olive-700 mt-4">3.4 Cookies de terceros</h3>
                <p>
                  En el caso de las cookies de terceros (como Google Analytics, Facebook, etc.), puede ejercer su derecho a rechazarlas accediendo a las páginas de información de privacidad de estos terceros:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google Analytics</strong>: 
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Complemento de inhabilitación de Google Analytics</a>
                  </li>
                  <li>
                    <strong>Facebook</strong>: 
                    <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline ml-2">Política de cookies de Facebook</a>
                  </li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">4. Consecuencias de desactivar las cookies</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  El usuario debe tener en cuenta que, si rechaza o borra las cookies de navegación, no podremos mantener sus preferencias, algunas características de las páginas no estarán operativas, y cada vez que navegue por nuestra web tendremos que solicitarle de nuevo su autorización para el uso de cookies.
                </p>
                <p>
                  Si aun así decide modificar la configuración de su acceso a la página web, debe saber que es posible eliminar las cookies o impedir que se registre esta información en su equipo en cualquier momento mediante las modificaciones de los parámetros de configuración de su navegador.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-olive-700 mb-3">5. Actualizaciones y cambios en la política de cookies</h2>
              <div className="space-y-3 text-olive-900">
                <p>
                  Flor de Olivo S.A. puede modificar esta Política de Cookies en función de nuevas exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
                </p>
                <p>
                  Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicará al usuario mediante un aviso en la página web. Si desea más información sobre qué uso hacemos de las cookies, puede enviarnos un email a privacidad@flordolivo.com.
                </p>
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

export default CookiesPage; 