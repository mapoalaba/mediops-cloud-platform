def mask_name(name: str) -> str:
    if not name:
        return ""
    if len(name) == 1:
        return "*"
    if len(name) == 2:
        return name[0] + "*"
    return name[0] + "*" * (len(name) - 2) + name[-1]


def mask_birth_date(birth_date: str) -> str:
    if not birth_date or len(birth_date) < 4:
        return "****"
    if "-" in birth_date:
        parts = birth_date.split("-")
        if len(parts) == 3:
            return f"{parts[0]}-**-**"
    return birth_date[:4] + "-**-**"


def mask_phone(phone: str | None) -> str | None:
    if not phone:
        return None

    parts = phone.split("-")
    if len(parts) == 3:
        return f"{parts[0]}-****-{parts[2]}"

    if len(phone) >= 8:
        return phone[:3] + "****" + phone[-4:]

    return "***"