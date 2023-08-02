import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const loginFormSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'El campo es requerido'
      })
      .email({ message: 'El correo proporcionado no es válido' }),
    password: z
      .string({ required_error: 'El campo es requerido' })
      .min(8, { message: 'La contraseña debe tener un mínimo de 8 caracteres' })
  })
)
