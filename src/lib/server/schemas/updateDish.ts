import { z } from "zod";

const schema = z.object({
    id: z.string({
        invalid_type_error: "Идентификатор блюда должен быть строкой",
        required_error: "Идентификатор блюда не должен быть пустой строкой"
    }),

    name: z.string({
        invalid_type_error: "Название блюда должно быть строкой",
        required_error: "Название блюда не должно быть пустой строкой"
    }),

    type: z.enum(["fish", "meat", "vegetarian", "nonAlcoholic", "buffet"], {
        invalid_type_error:
            'Тип блюда должен быть равен "fish", "meat", "vegetarian", "nonAlcoholic" или "buffet"',
        required_error:
            'Тип блюда должен быть равен "fish", "meat", "vegetarian", "nonAlcoholic" или "buffet"'
    })
});

export default schema;
