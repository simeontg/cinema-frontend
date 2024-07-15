export function isValidEmail(email: string) {
    const regEmail = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
    if (!regEmail.test(email)) {
        return false;
    }
    return true;
}
