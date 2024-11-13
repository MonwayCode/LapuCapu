function Validation(values) 
{
    let error = {};

    if (values.name.trim() === "") {
        error.name = "Pole nie może być puste!";
    } else {
        error.name = "";
    }
    if (values.surname.trim() === "") {
        error.surname = "Pole nie może być puste!";
    } else {
        error.surname = "";
    }

    if (values.email.trim() === "") {
        error.email = "Pole nie może być puste!";
    } else if (!values.email.includes("@")) {
        error.email = "Podany tekst nie jest adresem e-mail";
    } else {
        error.email = "";
    }

    if (values.phone.trim() === "") {
        error.phone = "Pole nie może być puste!";
    } else if (!/^\d{9}$/.test(values.phone)) {
        error.phone = "Numer telefonu musi składać się z 9 cyfr";
    } else {
        error.phone = "";
    }

    if (values.password.trim() === "") {
        error.password = "Pole nie może być puste!";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;