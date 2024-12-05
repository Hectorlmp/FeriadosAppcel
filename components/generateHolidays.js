import dayjs from 'dayjs';

const fixedHolidays = {
  '01-01': 'Año Nuevo', 
  '05-01': 'Día del Trabajador', 
  '05-21': 'Día de las Glorias Navales', 
  '06-29': 'San Pedro y San Pablo', 
  '07-16': 'Día de la Virgen del Carmen', 
  '08-15': 'Asunción de la Virgen',
  '09-18': 'Día de la Independencia', 
  '09-19': 'Día de las Glorias del Ejército', 
  '10-12': 'Día del Encuentro de Dos Mundos', 
  '10-31': 'Día de las Iglesias Evangélicas y Protestantes', 
  '11-01': 'Día de Todos los Santos', 
  '12-08': 'Día de la Inmaculada Concepción', 
  '12-25': 'Navidad',
};

const mobileHolidays = (year) => {
  const easterDate = calculateEaster(year); 
  return {
    [easterDate.subtract(2, 'days').format('YYYY-MM-DD')]: 'Viernes Santo',
    [easterDate.subtract(1, 'day').format('YYYY-MM-DD')]: 'Sábado Santo',
  };
};

const calculateEaster = (year) => {
  const f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);

  return dayjs(`${year}-${month}-${day}`);
};

export const generateHolidays = (year) => {
  const holidays = {};

  //feriados fijos
  Object.entries(fixedHolidays).forEach(([date, name]) => {
    const formattedDate = `${year}-${date}`;
    holidays[formattedDate] = {
      marked: true,
      dotColor: 'red',
      customStyles: { container: { backgroundColor: 'red' }, text: { color: 'white' } },
      name,
    };
  });

  //feriados moviles
  const mobile = mobileHolidays(year);
  Object.entries(mobile).forEach(([date, name]) => {
    holidays[date] = {
      marked: true,
      dotColor: 'red',
      customStyles: { container: { backgroundColor: 'red' }, text: { color: 'white' } },
      name,
    };
  });

  return holidays;
};
