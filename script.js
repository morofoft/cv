// Proyectos con diseño Tailwind
const proyectos = [
    {
        titulo: "Buzón de Sugerencias",
        descripcion: "Sistema digital para recepción y gestión de sugerencias con interfaz moderna y funcional.",
        tecnologias: ["HTML", "CSS", "JavaScript", "SweetAlert", "LocalStorage"],
        imagen: "assets/images/proyectos/bss.jpeg",
        demo: "https://morofoft.github.io/buzonSanas/",
        codigo: "https://github.com/morofoft/buzonSanas"
    },
    // Agrega más proyectos aquí
];

// Inicializar AOS
function inicializarAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// Cargar proyectos con diseño Tailwind
function cargarProyectos() {
    const container = document.getElementById('proyectos-container');
    
    proyectos.forEach((proyecto, index) => {
        const proyectoHTML = `
            <div class="hover-lift" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100">
                    <div class="relative overflow-hidden h-48">
                        <img src="${proyecto.imagen}" 
                             alt="${proyecto.titulo}"
                             class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-4 left-4 right-4">
                                <div class="flex space-x-2">
                                    <a href="${proyecto.demo}" target="_blank" 
                                       class="flex-1 bg-white text-dark py-2 rounded-lg text-center font-medium hover:bg-gray-100 transition-colors">
                                        Ver Demo
                                    </a>
                                    <a href="${proyecto.codigo}" target="_blank" 
                                       class="flex-1 bg-primary text-white py-2 rounded-lg text-center font-medium hover:bg-primary-dark transition-colors">
                                        Código
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-dark mb-3">${proyecto.titulo}</h3>
                        <p class="text-gray-600 mb-4">${proyecto.descripcion}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${proyecto.tecnologias.map(tech => 
                                `<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                    ${tech}
                                </span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += proyectoHTML;
    });
}

// Navbar scroll effect
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.remove('hidden');
            backToTop.classList.add('flex');
            backToTop.style.opacity = '1';
        } else {
            navbar.classList.remove('scrolled');
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 50) {
                    backToTop.classList.add('hidden');
                    backToTop.classList.remove('flex');
                }
            }, 300);
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') 
                ? '<i class="fas fa-bars text-2xl"></i>'
                : '<i class="fas fa-times text-2xl"></i>';
        });
    }
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuButton = document.getElementById('mobileMenuButton');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                }
                
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form submission
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            Swal.fire({
                icon: 'error',
                title: 'Campos requeridos',
                text: 'Por favor completa todos los campos obligatorios',
                confirmButtonColor: '#2563eb'
            });
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Por favor ingresa un email válido',
                confirmButtonColor: '#2563eb'
            });
            return;
        }
        
        // Show loading
        Swal.fire({
            title: 'Enviando mensaje...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Simulate API call
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Gracias por contactarme. Te responderé en breve.',
                confirmButtonColor: '#2563eb'
            });
            
            // Reset form
            form.reset();
        }, 1500);
    });
}

// Download CV function
function descargarCV() {
    Swal.fire({
        title: '¿Descargar CV?',
        text: 'Se descargará mi curriculum vitae en formato PDF',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, descargar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2563eb'
    }).then((result) => {
        if (result.isConfirmed) {
            const link = document.createElement('a');
            link.href = 'assets/pdf/PedroGarcia.pdf';
            link.download = 'PedroGarcia_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            Swal.fire(
                '¡Descargado!',
                'El CV se ha descargado correctamente.',
                'success'
            );
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    inicializarAOS();
    cargarProyectos();
    setupNavbar();
    setupSmoothScroll();
    setupBackToTop();
    setupContactForm();
    
    // Add loading animation to page
    document.body.classList.add('fade-in');
});

// Contar certificaciones automáticamente
function contarCertificaciones() {
    const certificaciones = document.querySelectorAll('.certification-card');
    const countElement = document.getElementById('certificacionesCount');
    if (countElement) {
        countElement.textContent = certificaciones.length;
    }
}

// Agregar esta función al DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    contarCertificaciones();
    // ... resto de tu código
});

// Datos de certificaciones con PDFs
const certificaciones = [
    {
        id: 1,
        titulo: "Ingeniero de Sistemas",
        institucion: "Universidad Central del Este",
        fecha: "Graduado: Marzo 2023",
        descripcion: "Título profesional en Ingeniería de Sistemas con honores académicos",
        horas: "000 horas",
        pdf: "assets/pdf/certificaciones/ingeniero-sistemas.pdf",
        logo: "assets/images/logos/uce.webp",
        categoria: "universidad",
        badge: "badge-universidad",
        badgeText: "Título Universitario"
    },
    {
        id: 2,
        titulo: "Facilitador de Procesos de Enseñanza y Aprendizaje",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2025",
        descripcion: "Habilidades pedagógicas y de facilitación",
        horas: "000 horas",
        pdf: "assets/pdf/certificaciones/facilitador-ensenanza.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-especializacion",
        badgeText: "Educación"
    },
    {
        id: 3,
        titulo: "Técnico Informático",
        institucion: "Politécnico San Pablo",
        fecha: "Graduado 2018",
        descripcion: "Formación técnica especializada en informática y sistemas",
        horas: "000 horas",
        pdf: "assets/pdf/certificaciones/tecnico-informatico.pdf",
        logo: "assets/images/logos/politecnicoSanPablo.webp",
        categoria: "tecnico",
        badge: "badge-tecnico",
        badgeText: "Título Técnico"
    },
    {
        id: 4,
        titulo: "Técnico en Redes y Comunicación de Datos",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2023",
        descripcion: "Especialización en redes de computadoras y comunicaciones de datos",
        horas: "1030 horas",
        pdf: "assets/pdf/certificaciones/e404.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "tecnico",
        badge: "badge-tecnico",
        badgeText: "Certificación Técnica"
    },
    {
        id: 5,
        titulo: "Auxiliar en Ciberseguridad",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2020",
        descripcion: "Formación en seguridad informática y protección de sistemas",
        horas: "445 horas",
        pdf: "assets/pdf/certificaciones/ciberseguridad.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-certificacion",
        badgeText: "Ciberseguridad"
    },
    {
        id: 6,
        titulo: "Diseñador de Páginas Web, CSS y JavaScript",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2021",
        descripcion: "Desarrollo front-end y diseño web responsivo",
        horas: "110 horas",
        pdf: "assets/pdf/certificaciones/diseñador-web.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "especializacion",
        badge: "badge-especializacion",
        badgeText: "Desarrollo Web"
    },
    {
        id: 7,
        titulo: "Programación Web en JavaScript",
        institucion: "Instituto Tecnológico de Las Américas",
        fecha: "2024",
        descripcion: "Especialización en desarrollo web con JavaScript",
        horas: "40 horas",
        pdf: "assets/pdf/certificaciones/programacion-js.pdf",
        logo: "assets/images/logos/itla.jpg",
        categoria: "especializacion",
        badge: "badge-especializacion",
        badgeText: "JavaScript"
    },
    {
        id: 8,
        titulo: "Manejo Básico de Big Data",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2024",
        descripcion: "Fundamentos de análisis de datos y big data",
        horas: "220 horas",
        pdf: "assets/pdf/certificaciones/big-data.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "especializacion",
        badge: "badge-especializacion",
        badgeText: "Data Analytics"
    },
    {
        id: 9,
        titulo: "INGLES TECNICO APLICADO PARA INFORMATICA",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2023",
        descripcion: "Inglés especializado para el ámbito tecnológico",
        horas: "100 horas",
        pdf: "assets/pdf/certificaciones/ingles-tecnico.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-idiomas",
        badgeText: "Idiomas"
    },
    {
        id: 10,
        titulo: "Manejador de Programas de Oficina e Internet",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2020",
        descripcion: "Suite ofimática y herramientas de internet",
        horas: "125 horas",
        pdf: "assets/pdf/certificaciones/ofimatica-internet.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-ofimatica",
        badgeText: "Ofimática"
    },
    {
        id: 11,
        titulo: "Emprendedor para PYMES",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2021",
        descripcion: "Gestión y emprendimiento para pequeñas empresas",
        horas: "80 horas",
        pdf: "assets/pdf/certificaciones/emprendedor-pymes.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-emprendimiento",
        badgeText: "Emprendimiento"
    },
    {
        id: 12,
        titulo: "Comunicación en Cultura Sorda y Lengua de Señas",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2024",
        descripcion: "Nivel inicial - Inclusión y accesibilidad",
        horas: "100 horas",
        pdf: "assets/pdf/certificaciones/lengua-senas.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-especializacion",
        badgeText: "Inclusión"
    },
    {
        id: 13,
        titulo: "SERVICIOS AUXILIARES DE CONTABILIDAD",
        institucion: "Instituto Nacional de Formación Técnico Profesional",
        fecha: "2024",
        descripcion: "-",
        horas: "285 horas",
        pdf: "assets/pdf/certificaciones/auxiliar-contable.pdf",
        logo: "assets/images/logos/infotep.png",
        categoria: "certificacion",
        badge: "badge-especializacion",
        badgeText: "contabilidad"
    }
];

// Cargar certificaciones
function cargarCertificaciones() {
    const container = document.getElementById('certificaciones-container');
    container.innerHTML = '';
    
    certificaciones.forEach((cert, index) => {
        const certHTML = `
            <div class="certification-card" data-aos="fade-up" data-aos-delay="${index * 50}" data-category="${cert.categoria}">
                <div class="pdf-preview">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="institution-logo">
                    <img src="${cert.logo}" alt="${cert.institucion}">
                </div>
                <div class="certification-content">
                    <h4>${cert.titulo}</h4>
                    <p class="institution-name">${cert.institucion}</p>
                    ${cert.fecha ? `<p class="certification-date">${cert.fecha}</p>` : ''}
                    ${cert.horas ? `<p class="certification-hours">${cert.horas}</p>` : ''}
                    <p class="certification-desc">${cert.descripcion}</p>
                    <span class="badge ${cert.badge}">${cert.badgeText}</span>
                </div>
            </div>
        `;
        container.innerHTML += certHTML;
    });
    
    // Agregar eventos a las cards
    agregarEventosCertificaciones();
}

// Agregar eventos para abrir PDF
function agregarEventosCertificaciones() {
    const cards = document.querySelectorAll('.certification-card');
    const modal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const modalTitle = document.getElementById('modalTitle');
    const downloadLink = document.getElementById('downloadPdf');
    const closeModal = document.getElementById('closeModal');
    
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const index = Array.from(cards).indexOf(card);
            const cert = certificaciones[index];
            
            // Abrir PDF en el modal
            pdfViewer.src = cert.pdf + '#toolbar=0&navpanes=0&scrollbar=0';
            modalTitle.textContent = cert.titulo;
            downloadLink.href = cert.pdf;
            downloadLink.download = cert.titulo.toLowerCase().replace(/\s+/g, '-') + '.pdf';
            
            // Mostrar modal
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        pdfViewer.src = '';
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
            pdfViewer.src = '';
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
            pdfViewer.src = '';
        }
    });
}

// Filtrar certificaciones
function setupFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.certification-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filtrar cards
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Calcular estadísticas
function calcularEstadisticas() {
    const totalCertificaciones = document.getElementById('totalCertificaciones');
    const totalHoras = document.getElementById('totalHoras');
    
    if (totalCertificaciones) {
        totalCertificaciones.textContent = certificaciones.length;
    }
    
    if (totalHoras) {
        // Sumar horas de todas las certificaciones que tienen horas
        let horasTotales = 0;
        certificaciones.forEach(cert => {
            if (cert.horas) {
                const horas = parseInt(cert.horas);
                if (!isNaN(horas)) {
                    horasTotales += horas;
                }
            }
        });
        totalHoras.textContent = horasTotales.toLocaleString();
    }
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', function() {
    // ... otras inicializaciones
    
    cargarCertificaciones();
    setupFiltros();
    calcularEstadisticas();
    // ... resto de tu código
});

// Verificar PDFs (puedes ejecutar esto en consola)
function verificarPDFs() {
    const pdfsNoEncontrados = [];
    
    certificaciones.forEach(cert => {
        fetch(cert.pdf)
            .then(response => {
                if (!response.ok) {
                    pdfsNoEncontrados.push({
                        titulo: cert.titulo,
                        ruta: cert.pdf,
                        error: 'No encontrado'
                    });
                }
            })
            .catch(error => {
                pdfsNoEncontrados.push({
                    titulo: cert.titulo,
                    ruta: cert.pdf,
                    error: error.message
                });
            });
    });
    
    setTimeout(() => {
        if (pdfsNoEncontrados.length === 0) {
            console.log('✅ Todos los PDFs están correctamente ubicados');
        } else {
            console.warn('⚠️ Algunos PDFs no se encontraron:', pdfsNoEncontrados);
        }
    }, 2000);
}

// Llamar después de cargar la página
verificarPDFs();