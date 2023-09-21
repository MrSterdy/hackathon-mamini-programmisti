import { z } from "zod";

const schema = z.object({
    username: z
        .string({
            invalid_type_error: "Логин должен быть строкой",
            required_error: "Логин не должен быть пустым"
        })
        .max(16, "Логин должен быть не более 16 символов в длину"),
    password: z
        .string({
            invalid_type_error: "Пароль должен быть строкой",
            required_error: "Пароль не должен быть пустым"
        })
        .max(16, "Пароль должен быть не более 16 символов в длину")
});

export default schema;
