export const AUTH_ACCESS_TOKEN_COOKIE_NAME = "hackathon-access-token";
export const AUTH_REFRESH_TOKEN_COOKIE_NAME = "hackathon-refresh-token";
export const AUTH_USERNAME_COOKIE_NAME = "hackathon-username";

export const dishTypes = {
    fish: "Рыбное меню",
    meat: "Мясное меню",
    nonAlcoholic: "Безалкогольное меню",
    vegetarian: "Вегетарианское меню",
    buffet: "Уличное меню для фуршета"
} as const;

export const holidayTypes = {
    business: "Деловой корпоратив",
    entertainment: "Развлекательный корпоратив",
    street: "Корпоратив на улице",
    lunch: "Обед для конференции"
} as const;
