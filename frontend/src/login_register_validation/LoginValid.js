function Validation(values)
{
    let error = {};

    if (values.email.trim() === "") {
        error.email = "Pole nie może być puste!";
    } else if (!values.email.includes("@")) {
        error.email = "Podany tekst nie jest adresem e-mail";
    } else {
        error.email = "";
    }

    if (values.password.trim() === "") {
        error.password = "Pole nie może być puste!";
    } else {
        error.password = "";
    }

    return error;
}
export default Validation;