const API_BASE = "http://localhost/car/api/index.php";

/**
 * Получение всех услуг из БД
 */
export const fetchServices = async () => {
    try {
        const response = await fetch(`${API_BASE}?action=get_services`);
        if (!response.ok) throw new Error("Ошибка при получении списка услуг");
        return await response.json();
    } catch (error) {
        console.error("API Error (fetchServices):", error);
        return []; // Возвращаем пустой массив для отображения "пустого состояния" [cite: 14]
    }
};

/**
 * Получение одной услуги по ID или Slug
 */
export const fetchServiceById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}?action=get_service&id=${id}`);
        if (!response.ok) throw new Error("Услуга не найдена");
        return await response.json();
    } catch (error) {
        console.error("API Error (fetchServiceById):", error);
        return null;
    }
};

/**
 * Авторизация пользователя
 */
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Не удалось войти");
    return result;
};

/**
 * Регистрация нового пользователя
 */
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE}?action=register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Ошибка регистрации");
    return result;
};

/**
 * Создание записи на услугу
 */
export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_BASE}?action=create_booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Ошибка бронирования");
    return result;
};