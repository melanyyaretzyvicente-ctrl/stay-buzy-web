/* Los 16 productos del catálogo (nombres y precios de la tabla del equipo).
   "fotos": las imágenes de la galería, en orden: 1) prenda sola de frente, 2) prenda sola de espalda,
   3) puesta, de frente, 4) puesta, de espalda (la bandolera solo trae una foto puesta).
   La foto cuadrada del catálogo del inicio está en assets/catalogo/<id>.jpg */
const PRODUCTOS = [
  {
    "id": "created-to-create",
    "nombre": "Created to Create",
    "linea": "Playera · Obsidian Black",
    "categoria": "Playeras",
    "precio": 450,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera negra con el logo Stay Buzy y la frase Created to Create en amarillo sobre el pecho. En la espalda, las letras BUZY en blanco se cruzan con las palabras en amarillo. Un diseño para quienes no paran de crear.",
    "fotos": [
      "assets/prenda/created-to-create-frente.jpg",
      "assets/prenda/created-to-create-espalda.jpg",
      "assets/fotos/created-to-create-frente.jpg",
      "assets/fotos/created-to-create-espalda.jpg"
    ]
  },
  {
    "id": "buzy-one",
    "nombre": "Buzy One OG",
    "linea": "Playera · White / Black Drip",
    "categoria": "Playeras",
    "precio": 390,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera blanca con el grafiti Buzy One en negro, con efecto de pintura escurrida. La espalda va limpia y en el dobladillo lleva la etiqueta Stay Buzy. Un básico de la marca con muchísima personalidad.",
    "fotos": [
      "assets/prenda/buzy-one-frente.jpg",
      "assets/prenda/buzy-one-espalda.jpg",
      "assets/fotos/buzy-one-frente.jpg",
      "assets/fotos/buzy-one-espalda.jpg"
    ]
  },
  {
    "id": "buzy-one-vino",
    "nombre": "Buzy One: Bleeding Heart",
    "linea": "Playera · Airbrush Red",
    "categoria": "Playeras",
    "precio": 450,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera blanca con el grafiti Buzy One en vino al frente. En la espalda, un corazón difuminado al estilo aerógrafo rodeado de estrellas rojas. Una pieza para quienes sienten todo a todo volumen.",
    "fotos": [
      "assets/prenda/buzy-one-vino-frente.jpg",
      "assets/prenda/buzy-one-vino-espalda.jpg",
      "assets/fotos/buzy-one-vino-frente.jpg",
      "assets/fotos/buzy-one-vino-espalda.jpg"
    ]
  },
  {
    "id": "playera-morat",
    "nombre": "Nuevo Vicio",
    "linea": "Playera · Edición Morat · Floral",
    "categoria": "Playeras",
    "precio": 480,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera blanca oversize con el logo de Morat entre flores de colores y una frase al frente. En la espalda, cartas, dados y la frase Eres mi nuevo vicio. Hecha para los fans que llevan la música en el pecho.",
    "fotos": [
      "assets/prenda/playera-morat-frente.jpg",
      "assets/prenda/playera-morat-espalda.jpg",
      "assets/fotos/playera-morat-frente.jpg",
      "assets/fotos/playera-morat-espalda.jpg"
    ]
  },
  {
    "id": "playera-danado",
    "nombre": "Dañado",
    "linea": "Playera · Edición Iván Cornejo · Washed Blue",
    "categoria": "Playeras",
    "precio": 480,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera azul marino con lavado vintage, estrella tenue al frente y logo Stay Buzy. En la espalda, una imagen azulada de un guitarrista con la palabra DAÑADO. Inspirada en noches de guitarra y corazón roto.",
    "fotos": [
      "assets/prenda/playera-danado-frente.jpg",
      "assets/prenda/playera-danado-espalda.jpg",
      "assets/fotos/playera-danado-frente.jpg",
      "assets/fotos/playera-danado-espalda.jpg"
    ]
  },
  {
    "id": "playera-blanca",
    "nombre": "Costa Oeste: Creado Pa' Crear",
    "linea": "Playera · Cream",
    "categoria": "Playeras",
    "precio": 480,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera color crema con el logo Stay Buzy Costa Oeste en el pecho. En la espalda, un disco de vinilo, rosas, un boleto de concierto y una guitarra bajo la frase Creado pa' crear recuerdos.",
    "fotos": [
      "assets/prenda/playera-blanca-frente.jpg",
      "assets/prenda/playera-blanca-espalda.jpg",
      "assets/fotos/playera-blanca-frente.jpg",
      "assets/fotos/playera-blanca-espalda.jpg"
    ]
  },
  {
    "id": "playera-badbo",
    "nombre": "Veterano y Rookie",
    "linea": "Playera · Edición Benito · Cream / Crimson",
    "categoria": "Playeras",
    "precio": 450,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Playera blanca con el ojo con estrella de Stay Buzy en el pecho. En la espalda, un texto en rojo carmesí con dos tipografías y una bandera al final. Para quienes presumen de dónde vienen.",
    "fotos": [
      "assets/prenda/playera-badbo-frente.jpg",
      "assets/prenda/playera-badbo-espalda.jpg",
      "assets/fotos/playera-badbo-frente.jpg",
      "assets/fotos/playera-badbo-espalda.jpg"
    ]
  },
  {
    "id": "manga-larga-baezino",
    "nombre": "Atomic Mexicali",
    "linea": "Manga larga doble capa · Collab Báez · Chrome Cross",
    "categoria": "Playeras",
    "precio": 590,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Manga larga de doble capa en beige con degradado a negro. Cruces cromadas rodeadas de llamas verdes, letras góticas Atomic Mexicali y llamas en los puños. Una pieza de colección con mucha presencia.",
    "fotos": [
      "assets/prenda/manga-larga-baezino-frente.jpg",
      "assets/prenda/manga-larga-baezino-espalda.jpg",
      "assets/fotos/manga-larga-baezino-frente.jpg",
      "assets/fotos/manga-larga-baezino-espalda.jpg"
    ]
  },
  {
    "id": "jersey-la-odisea",
    "nombre": "La Odisea: Nómada",
    "linea": "Jersey · Edición Jasiel Núñez · Mesh",
    "categoria": "Jerseys",
    "precio": 620,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Jersey de malla negro con cuello en V, llamas crema y vino en hombros y mangas, letra gótica La Odisea y el número 00. En la espalda lleva el nombre Nómada y la frase Lo aprendí en la lleca.",
    "fotos": [
      "assets/prenda/jersey-la-odisea-frente.jpg",
      "assets/prenda/jersey-la-odisea-espalda.jpg",
      "assets/fotos/jersey-la-odisea-frente.jpg",
      "assets/fotos/jersey-la-odisea-espalda.jpg"
    ]
  },
  {
    "id": "jersey-abz-32",
    "nombre": "Shifuza 32",
    "linea": "Jersey · Collab ABZ · Pinstripe Black",
    "categoria": "Jerseys",
    "precio": 620,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Jersey negro de rayas finas con mangas de camuflaje, círculo con el número 32 en plateado y etiqueta Primera edición 1/100. En la espalda, el nombre Shifuza y el 32 en grande.",
    "fotos": [
      "assets/prenda/jersey-abz-32-frente.jpg",
      "assets/prenda/jersey-abz-32-espalda.jpg",
      "assets/fotos/jersey-abz-32-frente.jpg",
      "assets/fotos/jersey-abz-32-espalda.jpg"
    ]
  },
  {
    "id": "set-dei-v",
    "nombre": "Flavorz",
    "linea": "Set playera y short · Edición Dei V",
    "categoria": "Conjuntos",
    "precio": 790,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Conjunto de playera oversize y short con cordón, en café oscuro con estampado crema. Lleva el logo Stay Buzy // Dei V al frente y, en la espalda, la pregunta ¿Quién es Dei V? rodeada de llamas y estrellas.",
    "fotos": [
      "assets/prenda/set-dei-v-frente.jpg",
      "assets/prenda/set-dei-v-espalda.jpg",
      "assets/fotos/set-dei-v-frente.jpg",
      "assets/fotos/set-dei-v-espalda.jpg"
    ]
  },
  {
    "id": "hoodie-shifu",
    "nombre": "Sleep When Yo' Dead",
    "linea": "Hoodie · Heavy Acid Wash",
    "categoria": "Sudaderas y chamarras",
    "precio": 850,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Hoodie negro con lavado ácido, logo Stay Buzy en el pecho, llamas crema y vino en las mangas y placa metálica en la capucha. En la espalda, la frase You can sleep when yo'dead con detalles de estrellas.",
    "fotos": [
      "assets/prenda/hoodie-shifu-frente.jpg",
      "assets/prenda/hoodie-shifu-espalda.jpg",
      "assets/fotos/hoodie-shifu-frente.jpg",
      "assets/fotos/hoodie-shifu-espalda.jpg"
    ]
  },
  {
    "id": "jeans-negro",
    "nombre": "Gothic Stars",
    "linea": "Baggy jeans · Collab Tombochio · Washed Black",
    "categoria": "Jeans",
    "precio": 890,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Baggy jeans negros con lavado desgastado y estrellas en los muslos. Bolsillos traseros con tachuelas, bordado y detalles rasgados, dijes de cruz colgando y placa Stay Buzy en la cintura.",
    "fotos": [
      "assets/prenda/jeans-negro-frente.jpg",
      "assets/prenda/jeans-negro-espalda.jpg",
      "assets/fotos/jeans-negro-frente.jpg",
      "assets/fotos/jeans-negro-espalda.jpg"
    ]
  },
  {
    "id": "jeans-baggy",
    "nombre": "Chrome Crosses & Chain",
    "linea": "Baggy jeans · Vintage Ice Blue",
    "categoria": "Jeans",
    "precio": 920,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Baggy jeans de lavado azul hielo con tachuelas en los bolsillos y una estrella metálica. Bolsillos traseros con cruces y estrellas de cristales, cadena plateada con cruz y placa Stay Buzy.",
    "fotos": [
      "assets/prenda/jeans-baggy-frente.jpg",
      "assets/prenda/jeans-baggy-espalda.jpg",
      "assets/fotos/jeans-baggy-frente.jpg",
      "assets/fotos/jeans-baggy-espalda.jpg"
    ]
  },
  {
    "id": "bandolera-buzy",
    "nombre": "North Star Crossbody",
    "linea": "Bandolera · Pebbled Black Leather",
    "categoria": "Accesorios",
    "precio": 650,
    "tallas": [
      "Única"
    ],
    "descripcion": "Bandolera negra de piel texturizada con estrella metálica plateada al frente y el nombre Stay Buzy en relieve. Tiene bolsillo frontal con cierre y correa ajustable con letras tono sobre tono.",
    "fotos": [
      "assets/prenda/bandolera-buzy-frente.jpg",
      "assets/prenda/bandolera-buzy-espalda.jpg",
      "assets/fotos/bandolera-buzy.jpg"
    ]
  },
  {
    "id": "chamarra-street-mob",
    "nombre": "Streetmob",
    "linea": "Chamarra biker · Edición Fuerza Regida",
    "categoria": "Sudaderas y chamarras",
    "precio": 1490,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "descripcion": "Chamarra biker de piel negra con vivos y cuello en vino. Parches bordados en el pecho y las mangas, y en la espalda un gran parche con texto en arco: Street Mob // Mafia de la calle.",
    "fotos": [
      "assets/prenda/chamarra-street-mob-frente.jpg",
      "assets/prenda/chamarra-street-mob-espalda.jpg",
      "assets/fotos/chamarra-street-mob-frente.jpg",
      "assets/fotos/chamarra-street-mob-espalda.jpg"
    ]
  }
];
