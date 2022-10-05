import { injectable, /* inject, */ BindingScope, service } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales } from '../models';
import { UsuarioRepository } from '../repositories';
import { JwtService } from './jwt.service';


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
      where: {]
        correo: credenciales.nombreUsuario,
        clave: credenciales.clave
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
      console.log(res)

    }




    return ""
  }
}
