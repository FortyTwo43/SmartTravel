import { TipoExperiencia } from '../../presentation/constants/interests.constant'

export interface Destino {
  id: string;
  nombre: string;
  ciudad: string;
  pais: string;
  descripcion: string;
  tipo_experiencia: TipoExperiencia;
  imagen: string;
}
