// ============================================================
//  PREGUNTAS DEL JUEGO
//  Este es el archivo que vos vas a editar para agregar o
//  cambiar preguntas.
//
//  Cada asignatura tiene 8 preguntas:
//    - equipo1: las 4 preguntas del Equipo 1
//    - equipo2: las 4 preguntas del Equipo 2
//  (En el modo individual se usan las 8 juntas)
//
//  Cada pregunta tiene:
//    - pregunta:   el enunciado
//    - opciones:   las 4 respuestas para elegir
//    - correcta:   el NÚMERO de la opción correcta (empezando en 0)
//
//  Ejemplo: si la correcta es la 2da opción, va correcta: 1
// ============================================================

const asignaturas = [

  // ---------------------------------------------------------
  // 1) ÁLGEBRA
  // ---------------------------------------------------------
  {
    nombre: "Álgebra",
    color: "#e74c3c",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Cuál es el resultado de 3x + 2 cuando x = 4?",
          opciones: ["10", "12", "14", "16"],
          correcta: 2
        },
        {
          pregunta: "¿Cuántos elementos tiene el conjunto A = {a, b, c}?",
          opciones: ["1", "2", "3", "4"],
          correcta: 2
        },
        {
          pregunta: "¿Cuál es el resultado de 2 elevado a la 5?",
          opciones: ["16", "25", "32", "64"],
          correcta: 2
        },
        {
          pregunta: "Si x + 5 = 12, ¿cuánto vale x?",
          opciones: ["5", "6", "7", "8"],
          correcta: 2
        }
      ],
      equipo2: [
        {
          pregunta: "¿Cuál es el resultado de 5x - 3 cuando x = 2?",
          opciones: ["5", "7", "10", "13"],
          correcta: 1
        },
        {
          pregunta: "¿Cuántos elementos tiene el conjunto vacío?",
          opciones: ["0", "1", "2", "Infinitos"],
          correcta: 0
        },
        {
          pregunta: "¿Cuál es el resultado de 7 × 6?",
          opciones: ["36", "40", "42", "49"],
          correcta: 2
        },
        {
          pregunta: "Si 2x = 10, ¿cuánto vale x?",
          opciones: ["2", "5", "10", "20"],
          correcta: 1
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 2) ANÁLISIS MATEMÁTICO
  // ---------------------------------------------------------
  {
    nombre: "Análisis Matemático",
    color: "#3498db",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Cuál es la derivada de x²?",
          opciones: ["x", "2x", "x³/3", "2"],
          correcta: 1
        },
        {
          pregunta: "¿Cómo se llama el límite de una función cuando x tiende a infinito?",
          opciones: ["Continuidad", "Derivada", "Asíntota", "Integral"],
          correcta: 2
        },
        {
          pregunta: "¿Cuál es el valor de sen(0)?",
          opciones: ["0", "1", "-1", "∞"],
          correcta: 0
        },
        {
          pregunta: "¿Qué representa la pendiente en una recta y = mx + b?",
          opciones: ["El corte con el eje Y", "La inclinación de la recta", "La pendiente es b", "El valor de x"],
          correcta: 1
        }
      ],
      equipo2: [
        {
          pregunta: "¿Cuál es la derivada de x³?",
          opciones: ["x²", "3x²", "3x", "x⁴/4"],
          correcta: 1
        },
        {
          pregunta: "¿Cuánto es el límite de 1/x cuando x tiende a infinito?",
          opciones: ["1", "0", "∞", "No existe"],
          correcta: 1
        },
        {
          pregunta: "¿Cuál es el valor de cos(0)?",
          opciones: ["0", "1", "-1", "∞"],
          correcta: 1
        },
        {
          pregunta: "¿Qué resultado da dividir un número por cero?",
          opciones: ["0", "El mismo número", "No está definido", "1"],
          correcta: 2
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 3) REDES
  // ---------------------------------------------------------
  {
    nombre: "Redes",
    color: "#2ecc71",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Cuántos bits tiene una dirección IPv4?",
          opciones: ["16", "32", "64", "128"],
          correcta: 1
        },
        {
          pregunta: "¿Qué protocolo se usa para traducir nombres de dominio a direcciones IP?",
          opciones: ["HTTP", "FTP", "DNS", "SSH"],
          correcta: 2
        },
        {
          pregunta: "¿En qué capa del modelo OSI se encuentra el router?",
          opciones: ["Capa 1 - Física", "Capa 2 - Enlace", "Capa 3 - Red", "Capa 4 - Transporte"],
          correcta: 2
        },
        {
          pregunta: "¿Qué significa TCP?",
          opciones: [
            "Protocolo de Control de Transmisión",
            "Protocolo Central de Telecomunicaciones",
            "Transmisión de Cables de Par",
            "Sistema de Control de Tráfico"
          ],
          correcta: 0
        }
      ],
      equipo2: [
        {
          pregunta: "¿Cuántos bits tiene una dirección IPv6?",
          opciones: ["32", "64", "128", "256"],
          correcta: 2
        },
        {
          pregunta: "¿Qué dispositivo conecta dos redes diferentes?",
          opciones: ["Router", "Teclado", "Monitor", "Impresora"],
          correcta: 0
        },
        {
          pregunta: "¿Qué significa LAN?",
          opciones: [
            "Larga Área Nacional",
            "Red de Área Local",
            "Lista de Acceso a Nodos",
            "Línea de Alimentación"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué protocolo se usa para navegar páginas web?",
          opciones: ["FTP", "SMTP", "HTTP", "POP3"],
          correcta: 2
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 4) BASE DE DATOS
  // ---------------------------------------------------------
  {
    nombre: "Base de Datos",
    color: "#9b59b6",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Qué significa SQL?",
          opciones: [
            "Sistema de Query Lógico",
            "Lenguaje de Consulta Estructurado",
            "Secuencia de Qualidad de Líneas",
            "Servidor de Datos Rápidos"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué clave identifica de forma única cada fila de una tabla?",
          opciones: ["Clave foránea", "Clave primaria", "Clave compuesta", "Clave secundaria"],
          correcta: 1
        },
        {
          pregunta: "¿Cuál de estas es una operación de SQL para leer datos?",
          opciones: ["CREATE", "INSERT", "SELECT", "DELETE"],
          correcta: 2
        },
        {
          pregunta: "¿Qué relación une dos tablas en una base de datos relacional?",
          opciones: ["Índice", "Vista", "Join (unión)", "Trigger"],
          correcta: 2
        }
      ],
      equipo2: [
        {
          pregunta: "¿Qué hace la instrucción INSERT en SQL?",
          opciones: [
            "Borra una tabla",
            "Inserta un registro nuevo",
            "Consulta los datos",
            "Cierra la conexión"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué tipo de dato se usa para guardar texto?",
          opciones: ["INT", "VARCHAR", "BOOLEAN", "DATE"],
          correcta: 1
        },
        {
          pregunta: "¿Qué es una tabla en una base de datos?",
          opciones: [
            "Un programa",
            "Una conexión a internet",
            "Un conjunto de filas y columnas con datos",
            "Un tipo de gráfico"
          ],
          correcta: 2
        },
        {
          pregunta: "¿Qué instrucción de SQL elimina registros?",
          opciones: ["SELECT", "UPDATE", "DELETE", "JOIN"],
          correcta: 2
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 5) CIENCIA Y TIC
  // ---------------------------------------------------------
  {
    nombre: "Ciencia y TIC",
    color: "#f39c12",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Cuál es la menor unidad de información en computación?",
          opciones: ["Byte", "Bit", "Kilobyte", "Nodo"],
          correcta: 1
        },
        {
          pregunta: "¿Qué ley dice que el rendimiento de los procesadores se duplica cada ciertos años?",
          opciones: ["Ley de Amdahl", "Ley de Moore", "Ley de Murphy", "Ley de Ohm"],
          correcta: 1
        },
        {
          pregunta: "¿Qué es el big data?",
          opciones: [
            "Un tipo de computadora",
            "Grandes volúmenes de datos difíciles de procesar",
            "Una red social",
            "Un lenguaje de programación"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué representa la 'I' en la sigla IA?",
          opciones: ["Información", "Internet", "Inteligencia", "Infraestructura"],
          correcta: 2
        }
      ],
      equipo2: [
        {
          pregunta: "¿Cuántos bytes tiene 1 Kibibyte (binario)?",
          opciones: ["100", "512", "1024", "2048"],
          correcta: 2
        },
        {
          pregunta: "¿Qué es el software?",
          opciones: [
            "Los cables de la computadora",
            "Los programas y datos que usa la computadora",
            "El monitor",
            "La tarjeta madre"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué dispositivo guarda la información de forma permanente?",
          opciones: ["Teclado", "Disco duro o SSD", "Mouse", "Ventilador"],
          correcta: 1
        },
        {
          pregunta: "¿Qué es una red social?",
          opciones: [
            "Una red de cables",
            "Una impresora en red",
            "Una plataforma para conectar personas por internet",
            "Un tipo de virus"
          ],
          correcta: 2
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 6) PRÁCTICA PROFESIONALIZANTE
  // ---------------------------------------------------------
  {
    nombre: "Práctica Profesionalizante",
    color: "#1abc9c",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Qué es un proyecto?",
          opciones: [
            "Un conjunto de tareas con un objetivo y un plazo",
            "Un tipo de programa de computadora",
            "Una reunión de equipo",
            "Un documento legal"
          ],
          correcta: 0
        },
        {
          pregunta: "¿Qué técnica divide el trabajo en partes más pequeñas y manejables?",
          opciones: ["Codificación", "Desglose de tareas (WBS)", "Depuración", "Compilación"],
          correcta: 1
        },
        {
          pregunta: "¿Qué es un entregable?",
          opciones: [
            "El pago del proyecto",
            "La reunión final",
            "Un producto final de una fase del proyecto",
            "El equipo de trabajo"
          ],
          correcta: 2
        },
        {
          pregunta: "¿Cuál es un objetivo de una presentación profesional?",
          opciones: [
            "Nunca usar gráficos",
            "Comunicar información de forma clara y efectiva",
            "Hablar lo más rápido posible",
            "Evitar las conclusiones"
          ],
          correcta: 1
        }
      ],
      equipo2: [
        {
          pregunta: "¿Qué es una reunión de seguimiento?",
          opciones: [
            "Una fiesta del equipo",
            "Revisar el avance y los problemas del proyecto",
            "Una entrevista de trabajo",
            "Un examen final"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué es un cronograma?",
          opciones: [
            "El presupuesto del proyecto",
            "Una lista de materiales",
            "Un calendario de tareas con fechas",
            "El acta de la reunión"
          ],
          correcta: 2
        },
        {
          pregunta: "¿Qué es un presupuesto?",
          opciones: [
            "El estimado de costos del proyecto",
            "La lista de asistentes",
            "El horario de trabajo",
            "El nombre del cliente"
          ],
          correcta: 0
        },
        {
          pregunta: "¿Cuál es una actitud profesional en el trabajo?",
          opciones: [
            "Llegar tarde sin avisar",
            "Escuchar y expresar ideas con claridad",
            "Ignorar las sugerencias",
            "Trabajar siempre solo"
          ],
          correcta: 1
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 7) ESPACIO DE DEFINICIÓN INSTITUCIONAL 1
  // ---------------------------------------------------------
  {
    nombre: "Espacio de Definición Institucional 1",
    color: "#e67e22",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Qué es una carrera universitaria?",
          opciones: [
            "Una competencia deportiva",
            "Un conjunto ordenado de asignaturas que conduce a un título",
            "Un tipo de examen",
            "Una materia única"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Para qué sirve el plan de estudios?",
          opciones: [
            "Para anotar las notas",
            "Para ordenar las asignaturas y su secuencia a lo largo de la carrera",
            "Para elegir la fecha de examen",
            "Para inscribirse a la biblioteca"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué es un perfil de egreso?",
          opciones: [
            "La foto del graduado",
            "El conjunto de conocimientos y habilidades que tiene quien termina la carrera",
            "El promedio final",
            "El horario de las clases"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Cuál es la función del consejo de carrera?",
          opciones: [
            "Organizar fiestas",
            "Definir y actualizar los contenidos académicos de la carrera",
            "Vender libros",
            "Controlar el estacionamiento"
          ],
          correcta: 1
        }
      ],
      equipo2: [
        {
          pregunta: "¿Qué es la biblioteca universitaria?",
          opciones: [
            "Una red social",
            "Un lugar que presta libros y recursos de estudio",
            "Un tipo de aula",
            "La oficina del rector"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué es una tesis?",
          opciones: [
            "Un examen parcial",
            "Un trabajo final de la carrera",
            "Una materia obligatoria",
            "Un certificado de asistencia"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué significa inscribirse a una materia?",
          opciones: [
            "Registrarse para cursarla en el período",
            "Rendir el final",
            "Comprar el libro",
            "Aprobar el examen"
          ],
          correcta: 0
        },
        {
          pregunta: "¿Qué acredita el título universitario?",
          opciones: [
            "Que asististe a clases",
            "Que pagaste la matrícula",
            "Que terminaste la carrera con éxito",
            "Que vivís cerca de la facultad"
          ],
          correcta: 2
        }
      ]
    }
  },

  // ---------------------------------------------------------
  // 8) PROGRAMACIÓN
  // ---------------------------------------------------------
  {
    nombre: "Programación",
    color: "#34495e",
    preguntas: {
      equipo1: [
        {
          pregunta: "¿Qué es una variable?",
          opciones: [
            "Un número siempre negativo",
            "Un espacio para guardar un valor que puede cambiar",
            "Un tipo de error",
            "Un comentario del código"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué estructura repite código mientras una condición sea verdadera?",
          opciones: ["Condición if", "Bucle (for / while)", "Función", "Comentario"],
          correcta: 1
        },
        {
          pregunta: "¿Qué es una función?",
          opciones: [
            "Un error de sintaxis",
            "Un bloque de código reutilizable con un nombre",
            "Una variable especial",
            "Un tipo de dato"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Cuál de estos es un lenguaje de programación?",
          opciones: ["HTML", "CSS", "Python", "Photoshop"],
          correcta: 2
        }
      ],
      equipo2: [
        {
          pregunta: "¿Qué es un array (arreglo)?",
          opciones: [
            "Un error del programa",
            "Una colección ordenada de valores",
            "Una función especial",
            "Un comentario largo"
          ],
          correcta: 1
        },
        {
          pregunta: "¿Qué significa la palabra 'bug' en programación?",
          opciones: ["Un error en el programa", "Una mejora", "Un tipo de dato", "Una variable"],
          correcta: 0
        },
        {
          pregunta: "¿Qué símbolo se usa habitualmente para comparar si dos valores son iguales?",
          opciones: ["==", "+", "#", "@"],
          correcta: 0
        },
        {
          pregunta: "¿Qué hace la sentencia 'return' dentro de una función?",
          opciones: [
            "Borra la función",
            "Detiene todo el programa",
            "Devuelve un valor y termina la función",
            "Repite la función"
          ],
          correcta: 2
        }
      ]
    }
  }

];
