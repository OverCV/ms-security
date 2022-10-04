import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {Login} from './login.model';

@model({settings: {strict: false}})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @belongsTo(() => Rol, {name: 'rol'})
  rolID: string;

  @hasMany(() => Login, {keyTo: 'usuarioID'})
  logins: Login[];
  /* 
    @property({
      type: 'string',
      required: true,
    })
    direccion: string;
  
    @property({
      type: 'date',
      required: true,
    })
    fechaNacimiento: string;
  
    @property({
      type: 'string',
      required: true,
    })
    foto: string;
  
    @property({
      type: 'string',
      required: true,
    })
    pais: string;
  
    @property({
      type: 'string',
      required: true,
    })
    ciudad: string;
  
    @property({
      type: 'string',
      required: true,
    })
    departamento: string;
  
    @property({
      type: 'string',
      required: true,
    })
    barrio: string;
   */
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
