import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const articleFormSchema = toTypedSchema(
  z.object({
    name: z.string({
      required_error: 'El nombre del artículo es requerido'
    }),
    model: z.string({
      required_error: 'El modelo del artículo es requerido'
    }),
    serial: z.string({ required_error: 'El serial del artículo es requerido' }),
    branch: z.string({ required_error: 'Debe seleccionar alguna de las surcusales disponibles' }),
    comments: z.string().optional()
  })
)

export const transferFormSchema = toTypedSchema(
  z
    .object({
      originBranch: z.string({
        required_error: 'Debe indicar una sucursal de origen'
      }),
      destinationBranch: z.string({
        required_error: 'Debe indicar una sucursal de destino'
      }),
      article: z.string({
        required_error: 'Debe seleccionar un artículo'
      }),
      comments: z.string().optional()
    })
    .refine((data) => data.originBranch !== data.destinationBranch, {
      message: 'La sucursal de destino debe ser diferente de la sucursal origen',
      path: ['destinationBranch']
    })
)
