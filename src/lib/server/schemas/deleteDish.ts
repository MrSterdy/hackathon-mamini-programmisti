import { z } from "zod";

const schema = z.object({
    id: z.string({
        invalid_type_error: "Идентификатор блюда должен быть строкой",
        required_error: "Идентификатор блюда не должен быть пустой строкой"
    })
});

export default schema;
