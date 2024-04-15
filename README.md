### Introducción

En esta práctica, exploramos la implementación de una aplicación de línea de comandos en TypeScript para gestionar una colección de cartas mágicas. La aplicación permite a los usuarios agregar, eliminar, modificar, listar y mostrar cartas en su colección utilizando una serie de comandos simples.


# Carta.ts
```
import * as fs from 'fs';
import chalk from 'chalk';


export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}


export enum Rareza {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}


export interface Carta {
  id: number;
  nombre: string;
  mana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  reglas: string;
  fuerza?: number;
  resistencia?: number;
  lealtad?: number;
  valor_mercado: number;
}


export function checkUserDirectory(usuario: string): string {
  const userDirectory = `./cartas/${usuario}/`;
  if(!fs.existsSync(userDirectory)){
    //fs.mkdirSync(userDirectory, {recursive: true});
    console.log(chalk.red(`No existe el usuario ${usuario}`))
  }
  return userDirectory;
}


export function Mostrarporpantalla(data: string): void {
  const carta = JSON.parse(data);
  console.log('-------------------------------------------------------');
  console.log('Contenido de la carta:');
  console.log('ID:', carta.id);
  console.log('Nombre:', carta.nombre);
  console.log('Mana:', carta.mana);
  switch (carta.color){
    case "Blanco": 
    console.log('Color:', chalk.bgWhite(carta.color));
    break;
    case "Negro": 
    console.log('Color:', chalk.bgBlack(carta.color));
    break;
    case "Incoloro": 
    console.log('Color:', chalk.bgGray(carta.color));
    break;
    case "Rojo": 
    console.log('Color:', chalk.bgRed(carta.color));
    break;
    case "Verde": 
    console.log('Color:', chalk.bgGreen(carta.color));
    break;
    case "Azul": 
    console.log('Color:', chalk.bgBlue(carta.color));
    break;
    case "Multicolor": 
    console.log('Color:', chalk.bgYellow(carta.color));
    break;
  }
  console.log('Tipo:', carta.tipo);
  console.log('Rareza:', carta.rareza);
  console.log('Reglas:', carta.reglas);
  if(carta.tipo === "Criatura"){
  console.log('Fuerza:', carta.fuerza);
  console.log('Resistencia:', carta.resistencia);
  }
  if(carta.tipo === "Planeswalker") {
    console.log('Lealtad:', carta.lealtad);
  }
  console.log('Valor de mercado:', carta.valor_mercado);
}
```
El código proporciona una estructura básica para trabajar con cartas de un juego de mesa, definiendo sus atributos y funciones útiles para gestionar una colección de cartas.

## Enumeraciones
Se definen tres enumeraciones que representan los posibles tipos, colores y rarezas de una carta. Esto facilita la asignación de valores a estos atributos y ayuda a prevenir errores de escritura.

## Interfaz
Se define una interfaz `Carta` que describe la estructura de una carta, incluyendo sus propiedades como el ID, nombre, mana, color, tipo, rareza, reglas, fuerza, resistencia, lealtad y valor de mercado. Esto proporciona un tipado seguro para los objetos que representan cartas en el código.

## Funciones 
- `checkUserDirectory(usuario: string): string`: Verifica si existe el directorio del usuario y devuelve la ruta del directorio. Si el directorio no existe, emite un mensaje de error en la consola.

- `Mostrarporpantalla(data: string): void`: Toma los datos de una carta en formato JSON, los analiza y los muestra por pantalla en un formato estructurado. Utiliza la librería `chalk` para colorear el texto del color correspondiente al color de la carta.



## ColeccióndeCartas.ts

```
import * as fs from 'fs';
import chalk from 'chalk';
import { Carta, checkUserDirectory, Mostrarporpantalla, Tipo, Color, Rareza } from './Carta.js';

/**
 * Clase que representa una colección de cartas mágicas.
 */
export class ColecciondeCartas {
  public coleccion: Carta[]; // Una colección de cartas para los usuarios

  /**
   * Constructor de la clase ColecciondeCartas.
   * Inicializa la colección de cartas vacía.
   */
  constructor(){
    this.coleccion = [];
  }

  /**
   * Método para agregar una carta a la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param nuevaCarta Carta que se desea agregar.
   */
  public agregarcarta(usuario: string , nuevaCarta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + nuevaCarta.id + '.json';

    if(fs.existsSync(filePath)){
      console.log(chalk.red(`Error: ya existe una carta con ese ID en la colección de ${usuario}`))
      return;
    }

    fs.writeFileSync(filePath, JSON.stringify(nuevaCarta));
    console.log(chalk.green(`Carta agregada a la colección de ${usuario}`));
  }

  /**
   * Método para eliminar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea eliminar.
   */
  public eliminarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
      console.log(chalk.green(`Carta eliminada de la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para modificar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param carta Carta modificada que se desea guardar.
   */
  public modificarcarta(usuario: string, carta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + carta.id + '.json';
    if(fs.existsSync(filePath)){
      fs.writeFileSync(filePath, JSON.stringify(carta));
      console.log(chalk.green(`Carta modificada en la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para mostrar por pantalla la información de una carta de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea mostrar.
   */
  public mostrarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath).toString();
      Mostrarporpantalla(data);
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para listar todas las cartas de un usuario por pantalla.
   * @param usuario Nombre del usuario.
   */
  public listarcartas(usuario: string): void{
    const userDirectory = checkUserDirectory(usuario);
    if(!fs.existsSync(userDirectory)){
      console.log(chalk.red(`${usuario} no dispone de cartas`))
    } else {
      const cartas = fs.readdirSync(userDirectory);
      cartas.forEach((archivo) => {
        let filePath: string  = userDirectory + `${archivo}`;
        const carta = fs.readFileSync(filePath).toString();
        Mostrarporpantalla(carta);
      })
    }
  }
}

// Ejemplos de cartas
const NuevaColeccion = new ColecciondeCartas;

const nuevaCarta1: Carta = {
  id: 1,
  nombre: "Black Lotus",
  mana: 0,
  color: "Incoloro" as Color,
  tipo: "Artefacto" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "Puedes sacrificar el Black Lotus para añadir tres manás de cualquier color.",
  valor_mercado: 100000
};

const nuevaCarta2: Carta = {
  id: 2,
  nombre: "Lightning Bolt",
  mana: 1,
  color: "Rojo" as Color,
  tipo: "Conjuro" as Tipo,
  rareza: "Común" as Rareza,
  reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
  valor_mercado: 1
};

const nuevaCarta3: Carta = {
  id: 3,
  nombre: "Jace, the Mind Sculptor",
  mana: 4,
  color: "Azul" as Color,
  tipo: "Planeswalker" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "+2: Miras las tres primeras cartas de la biblioteca de un oponente, y las pones en cualquier orden.\n-1: Regresas la carta objetivo a la mano de su propietario.\n-12: Exilias todas las cartas en la mano y en la biblioteca de un oponente, y ganas 7 vidas por cada carta exiliada de esta manera.",
  lealtad: 3,
  valor_mercado: 80
};


```

Este código implementa una clase llamada `ColecciondeCartas` que representa una colección de cartas mágicas. A continuación, se detalla su funcionamiento y diseño:

### Estructura de la Clase
- **Atributos**: 
  - `coleccion`: Un array que almacena las cartas de la colección.

- **Constructor**: 
  - Inicializa la colección de cartas vacía al instanciar un objeto de la clase.

### Métodos
1. **`agregarcarta(usuario: string, nuevaCarta: Carta): void`**: Agrega una nueva carta a la colección del usuario. Verifica si ya existe una carta con el mismo ID en la colección antes de agregarla. Si existe, muestra un mensaje de error; de lo contrario, guarda la carta en un archivo JSON en el directorio correspondiente y muestra un mensaje de confirmación.

2. **`eliminarcarta(usuario: string, id: number): void`**: Elimina una carta de la colección del usuario. Verifica si la carta existe en la colección antes de eliminarla. Si existe, elimina el archivo correspondiente y muestra un mensaje de confirmación; de lo contrario, muestra un mensaje de error.

3. **`modificarcarta(usuario: string, carta: Carta): void`**: Modifica una carta de la colección del usuario. Verifica si la carta existe en la colección antes de modificarla. Si existe, actualiza el archivo correspondiente con los datos de la carta modificada y muestra un mensaje de confirmación; de lo contrario, muestra un mensaje de error.

4. **`mostrarcarta(usuario: string, id: number): void`**: Muestra la información de una carta de la colección del usuario en la consola. Verifica si la carta existe en la colección antes de mostrarla. Si existe, lee el archivo correspondiente, muestra la información de la carta utilizando la función `Mostrarporpantalla` y muestra un mensaje de confirmación; de lo contrario, muestra un mensaje de error.

5. **`listarcartas(usuario: string): void`**: Lista todas las cartas de la colección del usuario en la consola. Verifica si el usuario tiene cartas antes de listarlas. Si tiene cartas, lee todos los archivos del directorio del usuario, muestra la información de cada carta utilizando la función `Mostrarporpantalla` y muestra un mensaje de confirmación; de lo contrario, muestra un mensaje de error.

### Ejemplos de Uso
- Se crean tres instancias de la clase `Carta` representando diferentes cartas mágicas.
- Se agregan estas cartas a una nueva colección mediante la instancia de `ColecciondeCartas` llamada `NuevaColeccion`.


## index.ts

```
import { Carta, Color, Tipo, Rareza } from './Carta.js';
import {  ColecciondeCartas } from "./ColecciondeCartas.js";

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const NuevaColeccion = new ColecciondeCartas;

// Agregar cartas por linea de comandos
yargs(hideBin(process.argv))
  .command('add', 'Agrega una carta a la coleccion', {
  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  mana: {
    description: 'Coste de mana de la carta',
    type: 'number',
    demandOption: true
  },
  color: {
    description: 'Color de la carta',
    type: 'string',
    demandOption: true,
    choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor']
  },
  tipo: { 
    description: 'Tipo de la carta',
    type: 'string', 
    choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true 
  },
  rareza: {
    description: 'Rareza de la carta', 
    type: 'string', 
    choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], 
    demandOption: true 
  },
  reglas: {
    description: 'Reglas de la carta', 
    type: 'string', 
    demandOption: true 
  },
  fuerza: {
    description: 'Fuerza de la Criatura', 
    type: 'number', 
  },
  resistencia: {
    description: 'Resistencia de la Criatura', 
    type: 'number', 

  },
  lealtad: {
    description: 'Lealtad del Planeswalker', 
    type: 'number',  
  },
  valor: {
    description: 'Valor de la carta en el mercado', 
    type: 'number', 
    demandOption: true 
  },

 }, (argv) => {
  if(argv.tipo === 'Criatura' && argv.fuerza === undefined){
    throw new Error('No has agregado el atributo de Fuerza a la Criatura');
  }
  
  if(argv.tipo === 'Criatura' && argv.resistencia === undefined){
    throw new Error('No has agregado el atributo de Resistencia a la Criatura');
  }
  
  if(argv.tipo === 'Planeswalker' && argv.lealtad === undefined){
    throw new Error('No has agregado la lealtad al Planeswalker');
  }

  if(argv.tipo !== 'Criatura' && argv.fuerza !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de fuerza');
  } 

  if(argv.tipo !== 'Criatura' && argv.resistencia !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de resistencia');
  }

  if(argv.tipo !== 'Planeswalker' && argv.lealtad !== undefined) {
    throw new Error('Solo los Planeswalker tienen el atributo de lealtad');
  }
  
  const nuevaCarta: Carta = {
    id: argv.id,
    nombre: argv.nombre,
    mana: argv.mana,
    color: argv.color as Color,
    tipo: argv.tipo as Tipo,
    rareza: argv.rareza as Rareza,
    reglas: argv.reglas,
    fuerza: argv.fuerza,
    resistencia: argv.resistencia,
    lealtad: argv.lealtad,
    valor_mercado: argv.valor
  }
  NuevaColeccion.agregarcarta(argv.usuario, nuevaCarta);
  
 })
 .help()
 .argv;


// elimina cartas por linea de comandos
 yargs(hideBin(process.argv))
  .command('remove', 'elimina una carta de la coleccion', {
  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  }
 }, (argv) => {

  NuevaColeccion.eliminarcarta(argv.usuario, argv.id);
  
 })
 .help()
 .argv;
// Lista cartas por linea de comandos
 yargs(hideBin(process.argv))
 .command('list', 'lista las cartas de una coleccion', {
 usuario: {
  description: 'Usuario de la coleccion',
  type: 'string',
  demandOption: true
 }
}, (argv) => {

 NuevaColeccion.listarcartas(argv.usuario);
 
})
.help()
.argv;

// Muestra cartas por linea de comandos
yargs(hideBin(process.argv))
.command('read', 'muestra una carta de la coleccion', {
usuario: {
 description: 'Usuario de la coleccion',
 type: 'string',
 demandOption: true
},
id: {
  description: 'Card ID',
  type: 'number',
  demandOption: true
}
}, (argv) => {

NuevaColeccion.mostrarcarta(argv.usuario, argv.id);

})
.help()
.argv;

// Modifica cartas por linea de comandos

yargs(hideBin(process.argv))
  .command('update', 'Actualiza una carta de la coleccion', {
  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  mana: {
    description: 'Coste de mana de la carta',
    type: 'number',
    demandOption: true
  },
  color: {
    description: 'Color de la carta',
    type: 'string',
    demandOption: true,
    choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor']
  },
  tipo: { 
    description: 'Tipo de la carta',
    type: 'string', 
    choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true 
  },
  rareza: {
    description: 'Rareza de la carta', 
    type: 'string', 
    choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], 
    demandOption: true 
  },
  reglas: {
    description: 'Reglas de la carta', 
    type: 'string', 
    demandOption: true 
  },
  fuerza: {
    description: 'Fuerza de la Criatura', 
    type: 'number', 
  },
  resistencia: {
    description: 'Resistencia de la Criatura', 
    type: 'number', 

  },
  lealtad: {
    description: 'Lealtad del Planeswalker', 
    type: 'number',  
  },
  valor: {
    description: 'Valor de la carta en el mercado', 
    type: 'number', 
    demandOption: true 
  },

 }, (argv) => {
  if(argv.tipo === 'Criatura' && argv.fuerza === undefined){
    throw new Error('No has agregado el atributo de Fuerza a la Criatura');
  }
  
  if(argv.tipo === 'Criatura' && argv.resistencia === undefined){
    throw new Error('No has agregado el atributo de Resistencia a la Criatura');
  }
  
  if(argv.tipo === 'Planeswalker' && argv.lealtad === undefined){
    throw new Error('No has agregado la lealtad al Planeswalker');
  }

  if(argv.tipo !== 'Criatura' && argv.fuerza !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de fuerza');
  } 

  if(argv.tipo !== 'Criatura' && argv.resistencia !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de resistencia');
  }

  if(argv.tipo !== 'Planeswalker' && argv.lealtad !== undefined) {
    throw new Error('Solo los Planeswalker tienen el atributo de lealtad');
  }
  
  const nuevaCarta: Carta = {
    id: argv.id,
    nombre: argv.nombre,
    mana: argv.mana,
    color: argv.color as Color,
    tipo: argv.tipo as Tipo,
    rareza: argv.rareza as Rareza,
    reglas: argv.reglas,
    fuerza: argv.fuerza,
    resistencia: argv.resistencia,
    lealtad: argv.lealtad,
    valor_mercado: argv.valor
  }
  NuevaColeccion.modificarcarta(argv.usuario, nuevaCarta);
 })
 .help()
 .argv;
```

Este código implementa una aplicación de línea de comandos para gestionar una colección de cartas mágicas. A continuación, se detalla su funcionamiento y diseño:

### Estructura del Código
- Importa las clases y enumeraciones necesarias desde los archivos `Carta.js` y `ColecciondeCartas.js`.
- Utiliza la librería `yargs` para definir comandos de línea de comandos y gestionar argumentos.
- Instancia un objeto de la clase `ColecciondeCartas` llamado `NuevaColeccion` para gestionar la colección de cartas.

### Comandos de Línea de Comandos
1. **`add`**: Agrega una nueva carta a la colección.
   - Argumentos:
     - `usuario`: Nombre del usuario.
     - `id`: ID de la carta.
     - `nombre`: Nombre de la carta.
     - `mana`: Coste de mana de la carta.
     - `color`: Color de la carta.
     - `tipo`: Tipo de la carta.
     - `rareza`: Rareza de la carta.
     - `reglas`: Reglas de la carta.
     - `fuerza`: Fuerza de la criatura (opcional).
     - `resistencia`: Resistencia de la criatura (opcional).
     - `lealtad`: Lealtad del planeswalker (opcional).
     - `valor`: Valor de la carta en el mercado.
   - Verifica la validez de los argumentos y agrega la carta a la colección.

2. **`remove`**: Elimina una carta de la colección.
   - Argumentos:
     - `usuario`: Nombre del usuario.
     - `id`: ID de la carta que se desea eliminar.
   - Verifica si la carta existe en la colección y la elimina.

3. **`list`**: Lista todas las cartas de la colección de un usuario.
   - Argumentos:
     - `usuario`: Nombre del usuario.
   - Muestra por pantalla todas las cartas de la colección del usuario.

4. **`read`**: Muestra la información de una carta específica de la colección.
   - Argumentos:
     - `usuario`: Nombre del usuario.
     - `id`: ID de la carta que se desea mostrar.
   - Muestra por pantalla la información de la carta especificada.

5. **`update`**: Actualiza la información de una carta de la colección.
   - Argumentos:
     - `usuario`: Nombre del usuario.
     - `id`: ID de la carta que se desea actualizar.
     - Resto de argumentos similares al comando `add`.
   - Verifica la validez de los argumentos y actualiza la carta en la colección.



### Conclusión

La aplicación proporciona una solución eficiente y práctica para la gestión de colecciones de cartas mágicas. Su diseño modular y la validación de datos garantizan la integridad de la colección, mientras que la abstracción de la lógica de la aplicación facilita su extensibilidad y mantenimiento. En resumen, la aplicación mejora la experiencia de juego al proporcionar una herramienta útil para la organización y administración de recursos en el juego de cartas.