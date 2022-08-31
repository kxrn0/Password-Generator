function has_char(string, array) {
    return [...string].some(char => array.indexOf(char) != -1);
}

export default function create_password(uppercase, lowercase, numbers, symbols, characters) {
    if (characters < uppercase + lowercase + numbers + symbols)
        throw new Error("invalid number of characters!");

    const allChars = [];
    const uppercaseChars = [];
    const lowercaseChars = [];
    const digitChars = [];
    const symbolChars = [];

    let password;

    function passes(password) {
        if (uppercase && !has_char(password, uppercaseChars))
            return false;
        if (lowercase && !has_char(password, lowercaseChars))
            return false;
        if (numbers && !has_char(password, digitChars))
            return false;
        if (symbols && !has_char(password, symbolChars))
            return false;
        return true;
    }

    if (uppercase) {
        for (let i = 65; i < 91; i++)
            uppercaseChars.push(String.fromCharCode(i));

        allChars.push(uppercaseChars);
    }
    if (lowercase) {
        for (let i = 97; i < 123; i++)
            lowercaseChars.push(String.fromCharCode(i));

        allChars.push(lowercaseChars);
    }
    if (numbers) {
        for (let i = 0; i < 10; i++)
            digitChars.push(`${i}`);

        allChars.push(digitChars);
    }
    if (symbols) {
        for (let i = 33; i < 48; i++)
            if (i != 34 && i != 39)
                symbolChars.push(String.fromCharCode(i));
        for (let i = 58; i < 65; i++)
            symbolChars.push(String.fromCharCode(i));
        for (let i = 91; i < 96; i++)
            symbolChars.push(String.fromCharCode(i));
        for (let i = 123; i < 127; i++)
            symbolChars.push(String.fromCharCode(i));

        allChars.push(symbolChars);
    }

    do {
        password = '';

        for (let i = 0; i < characters; i++) {
            const array = allChars[~~(Math.random() * allChars.length)];

            password += array[~~(Math.random() * array.length)];
        }
    } while (!passes(password));
    return password;
}