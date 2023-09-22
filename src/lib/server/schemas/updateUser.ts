import { z } from "zod";

const schema = z.object({
    username: z.string({
        invalid_type_error: "Имя пользователя должно быть строкой",
        required_error: "Имя пользователя не должно быть пустым"
    }),
    action: z.enum(["promote", "demote"], {
        required_error: 'Действие должно быть либо "promote", либо "demote"',
        invalid_type_error: 'Действие должно быть либо "promote", либо "demote"'
    })
});

export default schema;
