import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594486267507-889669a6175a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')" }}>
          <div className="absolute inset-0 bg-olive-900 bg-opacity-40"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">Nuestra historia, misión y valores</p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-olive-800 mb-6 font-bold">Nuestra Historia</h2>
              <p className="mb-4 text-olive-900">
                Flor de Olivo nació en 1987 de la pasión de la familia Martínez por compartir los sabores auténticos de la tradición mediterránea. Lo que comenzó como un pequeño proyecto familiar en las colinas de olivares, se ha convertido en una empresa comprometida con la excelencia y la autenticidad.
              </p>
              <p className="mb-4 text-olive-900">
                Durante más de tres décadas, hemos perfeccionado nuestras técnicas de producción, combinando métodos tradicionales con innovaciones modernas para garantizar la más alta calidad en cada uno de nuestros productos.
              </p>
              <p className="mb-4 text-olive-900">
                Hoy en día, seguimos siendo una empresa familiar, dirigida por la segunda generación de la familia Martínez, manteniendo viva la pasión por los sabores auténticos y el compromiso con la sostenibilidad.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1601314167099-232775b3d6fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Familia trabajando en la producción de aceite" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-olive-800 mb-4 font-bold">Nuestra Misión</h2>
            <p className="text-xl text-olive-700 max-w-3xl mx-auto">
              Compartir la tradición mediterránea a través de sabores únicos y de alta calidad.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-olive-600 text-4xl mb-4">🫒</div>
              <h3 className="text-xl font-semibold text-olive-800 mb-3">Calidad</h3>
              <p className="text-olive-700">
                Nos comprometemos a seleccionar los mejores ingredientes y a mantener procesos de producción que garanticen productos de excepcional calidad.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-olive-600 text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-olive-800 mb-3">Tradición</h3>
              <p className="text-olive-700">
                Respetamos y preservamos las técnicas tradicionales de elaboración, transmitidas de generación en generación en la cultura mediterránea.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-olive-600 text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-semibold text-olive-800 mb-3">Sostenibilidad</h3>
              <p className="text-olive-700">
                Trabajamos con prácticas respetuosas con el medio ambiente, desde el cultivo hasta el envasado, minimizando nuestro impacto ecológico.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="section bg-olive-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-olive-800 mb-4 font-bold">Nuestro Equipo</h2>
            <p className="text-lg text-olive-700 max-w-3xl mx-auto">
              Detrás de cada producto hay un equipo apasionado y comprometido con la excelencia.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://randomuser.me/api/portraits/men/76.jpg" 
                alt="Carlos Martínez - CEO" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-olive-800 text-lg">Carlos Martínez</h3>
                <p className="text-olive-600">CEO & Fundador</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Ana Martínez - Directora de Producción" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-olive-800 text-lg">Ana Martínez</h3>
                <p className="text-olive-600">Directora de Producción</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://randomuser.me/api/portraits/men/42.jpg" 
                alt="Miguel Santos - Maestro Almazarero" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-olive-800 text-lg">Miguel Santos</h3>
                <p className="text-olive-600">Maestro Almazarero</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://randomuser.me/api/portraits/women/31.jpg" 
                alt="Elena Rodríguez - Responsable de Calidad" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-olive-800 text-lg">Elena Rodríguez</h3>
                <p className="text-olive-600">Responsable de Calidad</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-olive-700 text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Conozca nuestros productos</h2>
          <p className="text-lg mb-8">
            Descubra la calidad y tradición en cada uno de nuestros productos artesanales.
          </p>
          <Link to="/productos" className="btn-secondary text-lg">
            Ver catálogo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 