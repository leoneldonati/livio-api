import z from "zod";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const loginSchema = z.object({
  email: z.string().email({ message: "Formato inválido. Debe ser un email." }),
  password: z.string().regex(passwordRegex, {
    message:
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.",
  }),
});

export function parseLoginSchema(schema) {
  try {
    loginSchema.parse(schema);

    return {
      ok: true,
      schema,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      schema: null,
      error: error.issues,
    };
  }
}

const usernameRegex =
  /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/;
const fullNameRegex =
  /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:[ '-][a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/;

const userSchema = z.object({
  email: z.string().email({ message: "Formato inválido. Debe ser un email." }),
  password: z.string().regex(passwordRegex, {
    message:
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.",
  }),
  username: z.string().regex(usernameRegex, {
    message:
      'El username debe tener entre 3 y 20 caracteres, solo letras, números, ".", "_" y no puede empezar/terminar con "." o "_". Tampoco puede tener ".." o "__".',
  }),
  name: z
    .string()
    .regex(fullNameRegex, {
      message:
        "El nombre debe contener solo letras, espacios, guiones o apóstrofes, y no puede comenzar ni terminar con un carácter especial.",
    }),
});

export function parseUserSchema(schema) {
  try {
    userSchema.parse(schema);

    return {
      ok: true,
      schema,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      schema: null,
      error: error.issues,
    };
  }
}
