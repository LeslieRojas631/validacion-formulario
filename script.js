// Importar los módulos necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDY4omJRPbFRlOrW20YQuskgvBfUM7CDUI",
    authDomain: "datos-de-formulario-9a335.firebaseapp.com",
    projectId: "datos-de-formulario-9a335",
    storageBucket: "datos-de-formulario-9a335.firebasestorage.app",
    messagingSenderId: "1027146776443",
    appId: "1:1027146776443:web:702b944ed44b8e036887de",
    measurementId: "G-YT5C29PD6Z"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Agregar el evento de submit al formulario
document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    // Validación del campo de nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validación del correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un correo válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validación de la contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas, minúsculas y caracteres especiales';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario a Firebase
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        try {
            // Usar Firestore para agregar los datos al servidor
            await addDoc(collection(db, "users"), {
                name: entradaNombre.value,
                email: emailEntrada.value,
                password: contrasenaEntrada.value
            });
            alert('El formulario se ha enviado con éxito');
            document.getElementById('formulario').reset(); // Resetear el formulario
        } catch (error) {
            console.error("Error al guardar los datos: ", error);
        }
    }
});
