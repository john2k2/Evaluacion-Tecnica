window.addEventListener('DOMContentLoaded', (event) => {
    const sectionClose = document.querySelector('.ui-section-close .ui-text-intro');
    if (sectionClose) {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        sectionClose.textContent = date.toLocaleDateString('es-ES', options);
    }
});