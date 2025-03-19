import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RegistrationContext } from '../../../context/RegistrationContext';
import "./RegisteStep.css";

const RegisterStep3 = () => {
  const navigate = useNavigate();
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('RegistrationContext must be used within a RegistrationProvider');
  }
  const { registrationData } = context;
  const [name, setName] = useState(registrationData.name || '');
  const [day, setDay] = useState(registrationData.birthDay || '');
  const [month, setMonth] = useState(registrationData.birthMonth || '');
  const [year, setYear] = useState(registrationData.birthYear || '');
  const [gender, setGender] = useState(registrationData.gender || '');
  const [agree, setAgree] = useState(false);
  const [dayValid, setDayValid] = useState(true);
  const [yearValid, setYearValid] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [hovered, setHovered] = useState(false);

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Ви повинні погодитися з умовами');
      return;
    }

    const dayInt = parseInt(day.toString());
    const monthInt = parseInt(month.toString());
    const yearInt = parseInt(year.toString());

    const isDayValid = dayInt >= 1 && dayInt <= 31;
    const isMonthValid = monthInt >= 1 && monthInt <= 12;
    const isYearValid = yearInt >= 1900 && yearInt <= 2025;

    setDayValid(isDayValid);
    setYearValid(isYearValid);

    if (!isDayValid || !isMonthValid || !isYearValid) {
      return;
    }

    const userData = {
      Username: name,
      Email: registrationData.email,
      Password: registrationData.password,
      BirthDay: dayInt,
      BirthMonth: monthInt,
      BirthYear: yearInt,
      Gender: gender,
      AvatarUrl: '/images/default-avatar.png'
    };

    console.log('Request Payload:', userData);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate('/login');
      } else {
        const errorText = await response.text();
        console.log('Failed to register user:', errorText);
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
      console.error('Error:', error);
      if (error instanceof Error) {
        navigate('/login');
        //alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-between items-center p-8 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url('/images/SUM.png')", borderRadius: '20px' }}>
        <div></div>
        <div className="flex items-center mb-8">
          <img src="/images/logos/Logo.svg" alt="Logo" className="w-12 h-12" />
          <span className="text-white ml-4" style={{ fontFamily: 'Noto Sans', fontSize: '32px', fontWeight: 300 }}>SoundScape</span>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-[48px] mr-[100px]">Розкажіть про себе</h2>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <div className="w-[400px] h-[2px] flex-shrink-0 rounded-[10px] bg-[#D9D9D9]">
              <div className="h-full w-3/3 rounded-[10px] bg-[#A305A6]"></div>
            </div>
            <div className="flex items-center mb-4">
              <Link
                to="/register-step2"
                className="mr-4"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={hovered ? "/images/Arrow2.svg" : "/images/arrowIcon.svg"}
                  alt="Back"
                  className={`arrow-icon ${hovered ? 'flipped' : ''}`}
                />
              </Link>

              <span className="text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal">
                Крок 3 з 3
              </span>
            </div>
          </div>

          <form className="w-full" onSubmit={handleRegisterClick}>
            <div className="mb-4">
              <label className="text-white font-['Noto_Sans'] text-[16px] font-bold mb-2" htmlFor="name">Ім'я</label>
              <div className="flex items-center w-[400px] p-[16px_10px] gap-2 rounded-[8px] border border-[#B3B3B3]">
                <input
                  type="text"
                  id="name"
                  className="flex-1 bg-transparent text-[#B3B3B3] font-['Noto_Sans'] text-[16px] focus:outline-none"
                  placeholder="Введіть ваше ім'я"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-4 w-[400px]">
              <div className='w-[70px]'>
                <div className="flex-1">
                  <label className="text-white font-['Noto_Sans'] text-[16px] font-bold mb-2 w-[55px]" htmlFor="day">День</label>
                  <input
                    type="number"
                    id="day"
                    className={`w-full p-3 rounded-[8px] border ${dayValid ? 'border-[#B3B3B3]' : 'border-[#EC0D0D]'} focus-within:ring-2 focus-within:ring-[#A305A6]`}
                    placeholder="ДД"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  className="text-white font-['Noto_Sans'] text-[16px] font-bold mb-2"
                  htmlFor="month"
                >
                  Місяць
                </label>
                <select
                  id="month"
                  className="w-[206px] p-3 rounded-[10px] border border-[#B3B3B3] bg-black text-white 
                   flex flex-col items-start gap-[10px] focus:outline-none focus:ring-2 focus:ring-[#A305A6] font-weight: 700;"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option className="text-black bg-white" value="00">Оберіть місяць</option>
                  <option className="text-black bg-white" value="01">Січень</option>
                  <option className="text-black bg-white" value="02">Лютий</option>
                  <option className="text-black bg-white" value="03">Березень</option>
                  <option className="text-black bg-white" value="04">Квітень</option>
                  <option className="text-black bg-white" value="05">Травень</option>
                  <option className="text-black bg-white" value="06">Червень</option>
                  <option className="text-black bg-white" value="07">Липень</option>
                  <option className="text-black bg-white" value="08">Серпень</option>
                  <option className="text-black bg-white" value="09">Вересень</option>
                  <option className="text-black bg-white" value="10">Жовтень</option>
                  <option className="text-black bg-white" value="11">Листопад</option>
                  <option className="text-black bg-white" value="12">Грудень</option>
                </select>
                <style>
                  {`
          select option:checked {
            background: #2D0140;
            border-radius: 10px;
            color: white;
          }
        `}
                </style>
              </div>
              <div className="flex-1">
                <label className="text-white font-['Noto_Sans'] text-[16px] font-bold mb-2 w-[71px]" htmlFor="year">Рік</label>
                <input
                  type="number"
                  id="year"
                  className={`w-full p-3 rounded-[8px] border ${yearValid ? 'border-[#B3B3B3]' : 'border-[#EC0D0D]'} focus-within:ring-2 focus-within:ring-[#A305A6]`}
                  placeholder="РРРР"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-white font-['Noto_Sans'] text-[16px] font-bold mb-2">Стать</label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input type="radio" id="male" name="gender" className="mr-2" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                  <label htmlFor="male" className="text-white font-['Noto_Sans'] text-[16px]">Чоловік</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="female" name="gender" className="mr-2" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                  <label htmlFor="female" className="text-white font-['Noto_Sans'] text-[16px]">Жіноча</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="nonbinary" name="gender" className="mr-2" value="Nonbinary" checked={gender === 'Nonbinary'} onChange={(e) => setGender(e.target.value)} />
                  <label htmlFor="nonbinary" className="text-white font-['Noto_Sans'] text-[16px]">Небінарна</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="other" name="gender" className="mr-2" value="Other" checked={gender === 'Other'} onChange={(e) => setGender(e.target.value)} />
                  <label htmlFor="other" className="text-white font-['Noto_Sans'] text-[16px]">Інше</label>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input type="radio" id="dontWant" name="gender" className="mr-2" value="Prefer not to say" checked={gender === 'Prefer not to say'} onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="dontWant" className="text-white font-['Noto_Sans'] text-[16px]">Не хочу вказувати</label>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agree"
                className="mr-2"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree" className="text-white font-['Noto_Sans'] text-[16px]">
                Я погоджуюсь з умовами
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-[8px] text-white font-bold text-[16px] mt-6  bg-[rgba(163,5,166,0.50)] font-['Noto_Sans'] leading-normal hover:bg-[rgba(163,5,166,0.7)]"
            >
              Зареєструватися
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep3;