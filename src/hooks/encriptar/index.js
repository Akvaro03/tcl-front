// export async function encriptar(contraseña, textoPlano) {
//     const encoder = new TextEncoder();
//     const sal = window.crypto.getRandomValues(new Uint8Array(16));
//     const vectorInicializacion = window.crypto.getRandomValues(new Uint8Array(16));
//     const bufferTextoPlano = encoder.encode(textoPlano);
//     const clave = await crypto.subtle.encrypt(contraseña, sal, 100000, 256, 'SHA-256');
//     const encrypted = await window.crypto.subtle.encrypt(
//         { name: "AES-CBC", iv: vectorInicializacion },
//         clave,
//         bufferTextoPlano
//     );
//     return bufferABase64([
//         ...sal,
//         ...vectorInicializacion,
//         ...new Uint8Array(encrypted)
//     ]);

// }