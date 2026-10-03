```javascript
/**
 * EGNEXUS - Quiz Flow & Form Validation Script (Versión HTML Estática)
 */
document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 3;
    const userAnswers = {};

    const steps = document.querySelectorAll('.quiz-step');
    const progressBar = document.getElementById('quiz-progress-bar');
    const progressText = document.getElementById('quiz-progress-text');
    const stepLabel = document.getElementById('quiz-step-label');
    const quizAnswersInput = document.getElementById('quiz_respuestas');
    const quizForm = document.getElementById('egnexus-quiz-form');
    const statusMessage = document.getElementById('status-message');
    const emailInput = document.getElementById('correo');

    // Manejador para los botones de las opciones del Quiz
    document.querySelectorAll('.quiz-opt').forEach(button => {
        button.addEventListener('click', () => {
            const selectedVal = button.getAttribute('data-val');
            userAnswers[`Paso_${currentStep}`] = selectedVal;

            if (currentStep <= totalSteps) {
                currentStep++;
                updateQuizUI();
            }
        });
    });

    // Actualiza los pasos y la barra de progreso
    function updateQuizUI() {
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum === currentStep) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });

        if (currentStep <= totalSteps) {
            const percent = Math.round((currentStep / totalSteps) * 100);
            progressBar.style.width = `${percent}%`;
            progressText.innerText = `${percent}%`;
            stepLabel.innerText = `Paso ${currentStep} de ${totalSteps}: Diagnóstico`;
        } else {
            // Paso final (Formulario de Contacto)
            progressBar.style.width = '100%';
            progressText.innerText = '100%';
            stepLabel.innerText = 'Paso Final: Confirmación';

            // Guardar el resumen de las respuestas elegidas en el input hidden
            if (quizAnswersInput) {
                quizAnswersInput.value = JSON.stringify(userAnswers);
            }
        }
    }

    // Validación en tiempo real del correo electrónico
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;

            if (!emailRegex.test(emailValue)) {
                emailInput.classList.add('border-rose-500');
                emailInput.classList.remove('border-slate-800', 'focus:border-emerald-500');
            } else {
                emailInput.classList.remove('border-rose-500');
                emailInput.classList.add('focus:border-emerald-500');
            }
        });
    }

    // Procesamiento Frontend del Formulario (Simulación local de éxito)
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const nombre = document.getElementById('nombre').value;
            const empresa = document.getElementById('empresa').value;
            const correo = emailInput.value;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Procesando diagnóstico con IA...';

            // Simulamos un retraso de red de 1.5 segundos para dar realismo a la IA
            setTimeout(() => {
                statusMessage.classList.remove('hidden', 'bg-rose-500/10', 'border-rose-500/30', 'text-rose-300');
                
                // Aplicamos estilos de éxito estéticos con Tailwind
                statusMessage.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/30', 'text-emerald-300');
                statusMessage.innerHTML = `¡Excelente, ${nombre}! Tu Reporte de Diagnóstico Automatizado para <strong>${empresa}</strong> ha sido generado correctamente y enviado a <strong>${correo}</strong>.`;
                
                quizForm.reset();
                
                // Ocultamos la sección del formulario final
                const finalStep = document.querySelector('.quiz-step[data-step="4"]');
                if (finalStep) finalStep.classList.add('hidden');
            }, 1500);
        });
    }
});