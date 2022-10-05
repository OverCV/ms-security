import { injectable, /* inject, */ BindingScope, service } from '@loopback/core'
import { Keys } from '../config/keys'
// TODO?[04]: Importación de módulo instalado 'jsonweb'.
var JWT = require('jsonwebtoken')

@injectable({ scope: BindingScope.TRANSIENT })
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */


  esValido(): string {
    //[05]: Firmar un token con información secreta. Creamos en config la llave.
    var token = JWT.sign({ foo: 'bar' }, Keys.JWTsecretKey)
    return token
  }

  /**
 * Se genera un token con la información en formato de JWT
 * @param info datos que quedarán en el token
 * @returns token firmado con la clave secreta
 */
  // TODO?[07]: Creación de funcionalidad de generación de JWT.
  crearToken(datos: object): string {
    try {
      var token = JWT.sign(datos, Keys.JWTsecretKey)
      return token
    } catch (error) {
      throw error
    }
  }

  /**
 * Se valida un token si es correcto o no.
 * @param token token a validar.
 * @returns boolean con la respuesta.
 */
  validarToken(token: string): string {
    try {
      let datos = JWT.verify(token, Keys.JWTsecretKey)
      // return true
      console.log('DatosRol:', datos.rol)
      return datos.rol /* Al verificarlo le sacamos la información, toda para sacar su rol. */
    } catch (error) {
      // return ""
      return 'Error tipo' + error
    }
  }
}