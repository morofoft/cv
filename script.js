const proyectos = [
    {
        titulo: "Buzon de sugerencia",
        descripcion: "Buzon de sugerencia digital",
        tecnologias: ["HTML", "CSS", "JavaScript", "SweetAlert"],
        imagen: "assets/images/proyectos/bss.jpeg",
        demo: "https://morofoft.github.io/buzonSanas/",
        codigo: "#"
    }
];


// Función para descargar CV
function descargarCV() {
    Swal.fire({
        title: '¿Descargar CV?',
        text: 'Se descargará mi curriculum vitae en formato PDF',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, descargar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#007bff'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reemplaza con la ruta real de tu CV
            const link = document.createElement('a');
            link.href = 'assets/pdf/PedroGarcia.pdf';
            link.download = 'PedroGarcia.pdf';
            link.click();
            
            Swal.fire(
                '¡Descargado!',
                'Has descargado mi CV correctamente.',
                'success'
            );
        }
    });
}

// Smooth scroll para enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Función de contacto
function enviarContacto() {
    Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarme. Te responderé pronto.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff'
    });
}

// Animación mejorada para la línea de tiempo
function animarTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Contador para el carousel de certificaciones
function actualizarContadorCarousel() {
    const carousel = document.getElementById('certificacionesCarousel');
    const currentSlide = document.querySelector('#certificacionesCarousel .carousel-item.active');
    const slides = document.querySelectorAll('#certificacionesCarousel .carousel-item');
    
    if (currentSlide && slides.length > 0) {
        const currentIndex = Array.from(slides).indexOf(currentSlide) + 1;
        document.getElementById('currentSlide').textContent = currentIndex;
        document.getElementById('totalSlides').textContent = slides.length;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    cargarProyectos();
    animarTimeline();
    inicializarAOS();
    actualizarContadorCarousel();

    $('#certificacionesCarousel').on('slid.bs.carousel', function () {actualizarContadorCarousel();});

    // Efecto de aparición suave para otros elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Inicializar AOS
function inicializarAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

// Cargar proyectos con animaciones AOS
function cargarProyectos() {
    const container = document.getElementById('proyectos-container');
    
    proyectos.forEach((proyecto, index) => {
        const delay = index * 100;
        const proyectoHTML = `
            <div class="col-lg-6 col-xl-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card project-card">
                    <img class="card-img-top" src="${proyecto.imagen}" alt="${proyecto.titulo} - Proyecto de Pedro García" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${proyecto.titulo}</h5>
                        <p class="card-text">${proyecto.descripcion}</p>
                        
                        <div class="mb-3">
                            ${proyecto.tecnologias.map(tech => 
                                `<span class="badge badge-primary mr-1 mb-1">${tech}</span>`
                            ).join('')}
                        </div>
                        
                        <div class="btn-group w-100">
                            <a href="${proyecto.demo}" target="_blank" class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-eye mr-1"></i>Demo
                            </a>
                            <a href="${proyecto.codigo}" target="_blank" class="btn btn-sm btn-outline-secondary">
                                <i class="fas fa-code mr-1"></i>Código
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += proyectoHTML;
    });
}

