// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    const age = user.age === undefined ? "" : `, Возраст: ${user.age}`;
    const hobbies = user.hobbies.length === 0
        ? "Хобби отсутствуют"
        : `Хобби: ${user.hobbies.join(", ")}`;
    const contact = "email" in user.contact
        ? `Почта: ${user.contact.email}`
        : `Телефон: ${user.contact.phone}`;

    return `Имя: ${user.name}${age}. ${contact}. ${hobbies}.`;
}
