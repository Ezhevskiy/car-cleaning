const MOCK_SERVICES = [
  { id: 'wash', title: 'Трехфазная мойка', price: '3.500', description: 'Трехфазная мойка по немецкой технологии.', features: ['Очистка кузова', 'Сушка турбосушкой'] },
  { id: 'chem', title: 'Восстановление салона', price: '12.000', description: 'Полная химчистка салона.', features: ['Очистка паром', 'Консервация кожи'] },
  { id: 'coat', title: 'Керамика', price: '45.000', description: 'Нанесение керамического состава.', features: ['Блеск', 'Гидрофоб'] }
];

export const fetchServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_SERVICES), 600); // Имитация загрузки
  });
};

export const fetchServiceById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const service = MOCK_SERVICES.find(s => s.id === id);
      service ? resolve(service) : reject('Услуга не найдена'); // Обработка ошибки
    }, 400);
  });
};