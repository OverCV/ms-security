import { /* inject, */ BindingScope, injectable, service } from '@loopback/core'
import { repository } from '@loopback/repository'
import { Credenciales } from '../models'
import { UsuarioRepository } from '../repositories'
import { JwtService } from './jwt.service'
// TODO?[11]: Importación de módulos para trabajo con "Estrategias".
var generator = require('generate-password')
var MD5 = require("crypto-js/md5")


@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadUsuarioService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    // [06] Importación del ser token.
    @service(JwtService)
    private servicioJWT: JwtService

  ) { }

  /* * Add service methods here * */

  /**
   * Método para la autenticación de usuarios.
   * @param credenciales credenciales de acceso.
   * @returns una cadena con el token cuando todo está bien, o una cadena vacía cuando no coinciden las credenciales.
   */
  // TODO?[[01]: Creación de validación de usuario para el ingreso al sistema.
  async identificarUsuario(credenciales: Credenciales): Promise<string> {
    let res = "Credencial inválida"

    let usuarioValido = await this.usuarioRepository.findOne({
      where: {
        correo: credenciales.correoUsuario,
        clave: credenciales.claveUsuario
      }
    })

    // Si exsite entonces se crea un token en función de los datos del usuario.
    if (usuarioValido) {
      // Creación del JWT y asignación de RESponse.
      let datos = {
        nombre: `${usuarioValido.nombres} ${usuarioValido.apellidos}`,
        correo: usuarioValido.correo,
        rol: usuarioValido.rolID
      }
      let token = this.servicioJWT.crearToken(datos)
      res = token
      // console.log(res)
      return res

    }
    return ""
  }

  /**
   * Genera una clave aleatoria para nuestro usuario.
   * @returns clave generada
   */
  crearClave(): string {
    let password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true
    })
    return password
  }
  
  /**
   * Algoritmo de cifrado MD5 que recibe una cadena en texto plano, se cifra como un array de bytes
   * @param cadena A
   * @returns 
   */
  cifrarClave(cadena: string): string {
    let cadenaCifrada = MD5(cadena).toString()
    
    console.log('| Clave creada: ', cadena, ' | Clave cifrada: ', cadenaCifrada, ' |')
    return cadenaCifrada
  }
}
