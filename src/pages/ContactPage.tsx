import React, { useState, FormEvent } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    // Validate name
    if (formData.name.trim() === '') {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduzca un email válido';
      valid = false;
    }
    
    // Validate message
    if (formData.message.trim() === '') {
      newErrors.message = 'El mensaje es obligatorio';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
      setSending(true);
    
    // Crear el correo directamente con mailto
    const subject = encodeURIComponent(formData.subject || 'Mensaje desde Flor de Olivo');
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    );
        
    // Abrir el cliente de correo predeterminado con los datos pre-rellenados
    window.location.href = `mailto:emi46414@gmail.com?subject=${subject}&body=${body}`;
        
    // Mostrar mensaje de éxito
    setTimeout(() => {
        setSubmitted(true);
      setSending(false);
        
      // Resetear formulario
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
    }, 500);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')" }}>
          <div className="absolute inset-0 bg-olive-900 bg-opacity-50"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">Estamos aquí para atenderle</p>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="section bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl text-olive-800 mb-6 font-bold">Información de Contacto</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">Dirección</h3>
                  <p className="flex items-start text-olive-800">
                    <span className="mr-2">📍</span>
                    <span>Calle Ejemplo 123, Santiago, Chile</span>
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">Teléfono</h3>
                  <p className="flex items-start text-olive-800">
                    <span className="mr-2">📞</span>
                    <span>+56 9 1234 5678</span>
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">Email</h3>
                  <p className="flex items-start text-olive-800">
                    <span className="mr-2">✉️</span>
                    <a href="mailto:emi46414@gmail.com" className="text-olive-600 hover:text-olive-800">emi46414@gmail.com</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-olive-700 mb-2">Horario de Atención</h3>
                  <p className="text-olive-800 mb-1">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-olive-800">Sábados: 10:00 - 14:00</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-olive-700 mb-4">Ubicación</h3>
                <div className="rounded-lg h-64 overflow-hidden">
                  {/* Iframe de OpenStreetMap que no requiere API key */}
                  <iframe 
                    title="Ubicación Flor de Olivo"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-72.37752342224121%2C-37.48253743982539%2C-72.3470950126648%2C-37.46940553818954&amp;layer=mapnik&amp;marker=-37.4759722%2C-72.3623889" 
                    style={{ border: 0, borderRadius: '0.5rem' }}
                  ></iframe>
                  <a 
                    href="https://www.openstreetmap.org/?mlat=-37.4760&amp;mlon=-72.3624#map=16/-37.4760/-72.3624" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-olive-600 hover:text-olive-800 text-sm mt-2 inline-block"
                  >
                    Ver mapa más grande
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl text-olive-800 mb-6 font-bold">Envíenos un Mensaje</h2>
              
              {/* Explicación simplificada */}
              <div className="mb-6 p-5 bg-amber-50 rounded-lg border border-amber-200 shadow-sm">
                <h3 className="text-lg font-semibold text-amber-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Información
                </h3>
                <p className="text-amber-700">
                  Al enviar este formulario, se abrirá su programa de correo predeterminado. También puede contactarnos directamente usando las opciones al final de la página.
                </p>
              </div>
              
              {submitted ? (
                <div className="bg-olive-100 p-6 rounded-lg text-center">
                  <div className="text-olive-600 text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-black mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-black mb-4">
                    Se ha abierto su programa de correo. Si no se abrió automáticamente, puede enviarnos un correo directamente a <strong>emi46414@gmail.com</strong>.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-olive-800 font-medium mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.name ? 'border-red-500' : 'border-olive-300'
                      } focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-olive-800 font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.email ? 'border-red-500' : 'border-olive-300'
                      } focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-olive-800 font-medium mb-1">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-2 border border-olive-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-olive-800 font-medium mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full p-2 border rounded-md ${
                        errors.message ? 'border-red-500' : 'border-olive-300'
                      } focus:outline-none focus:ring-1 focus:ring-olive-500`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="btn-primary flex items-center"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Enviando...
                        </>
                      ) : 'Enviar Mensaje'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Alternativa de contacto directo */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl text-olive-800 mb-4 font-bold">¿Prefiere contactarnos directamente?</h2>
            <p className="mb-6 text-olive-700">
              También puede enviarnos un correo directamente o llamarnos por teléfono.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="mailto:emi46414@gmail.com"
                className="btn-primary"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Enviar Email
              </a>
              <a 
                href="tel:+56912345678"
                className="btn-secondary"
              >
                Llamar
              </a>
              <a 
                href="https://wa.me/56912345678"
                className="btn-secondary bg-green-600 hover:bg-green-700"
                target="_blank" 
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 