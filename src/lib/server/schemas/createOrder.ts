import { z } from "zod";

const schema = z.object({
    holidayType: z.enum(["business", "entertainment", "street", "lunch"], {
        invalid_type_error:
            'Тип праздника должен быть равен "business", "entertainment", "street", или "lunch"',
        required_error:
            'Тип праздника должен быть равен "business", "entertainment", "street", или "lunch"'
    }),
    people: z
        .number({
            invalid_type_error: "Кол-во людей должно быть числом",
            required_error: "Кол-во людей является обязательным"
        })
        .min(1, "Кол-во людей должно быть не менее 1")
        .max(1000, "Кол-во людей должно быть не более 1000")
        .default(1),
    budget: z
        .number({
            invalid_type_error: "Бюджет должен быть числом",
            required_error: "Бюджет является обязательным"
        })
        .min(1000, "Бюджет не должен быть менее 1 тыс. руб.")
        .max(1000000, "Бюджет не должен быть более 1 млн. руб.")
        .default(1000),
    date: z
        .string({
            invalid_type_error: "Дата должна быть строкой",
            required_error: "Дата не должна быть пустой строкой"
        })
        .regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, "Неправильный формат даты"),
    dishes: z.array(
        z.string({
            required_error: "Идентификатор блюда не должен быть пустой строкой",
            invalid_type_error: "Идентификатор блюда должен быть строкой"
        }),
        {
            invalid_type_error: "Блюда должны быть массивом",
            required_error: "Блюда являются обязатальными"
        }
    ).nonempty("Список блюд не должен быть пустым")
});

export default schema;
