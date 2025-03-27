import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const CreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [token, setToken] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isMinLength = password.length >= 8;

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);

  const handleNextClick = async () => {
    setAttemptedSubmit(true);
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Token: token, NewPassword: password }),
      });

      if (response.ok) {
        navigate('/forgot-password/SuccessfulChangePassword');
      } else {
        alert('Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while resetting the password');
    }
  };

  const inputBorderClass = () => {
    if (password === '' && repeatPassword === '') {
      return 'border-[var(--Gray,#B3B3B3)]';
    }
    if (isMinLength && hasLetter && hasNumber && password === repeatPassword) {
      return 'border-[var(--Text,#FFF)]';
    }
    return 'border-[#EC0D0D]';
  };

  const radioTextClass = (condition: boolean) => {
    if (attemptedSubmit && !condition) {
      return 'text-[rgba(236,13,13,1)]';
    }
    return condition ? 'text-[rgba(255,255,255,1)]' : 'text-[#B3B3B3]';
  };

  const radioButtonClass = (condition: boolean) => {
    if (attemptedSubmit && !condition) {
      return 'bg-[rgba(236,13,13,1)]';
    }
    return condition ? 'bg-[rgba(45,1,64,1)]' : 'bg-transparent border border-[#B3B3B3]';
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
      <div className="w-1/2 flex flex-col justify-center items-center p-8 ">
        <h2 className="text-3xl font-bold mb-[48px] mr-[85px]">Створення нового пароля</h2>
        <p className="mb-6 max-w-md" style={{ color: '#B3B3B3', fontFamily: 'Noto Sans', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>
          Введіть новий пароль для свого акаунта SoundScape нижче.
        </p>
        <div className="w-full max-w-md">
          <form className="w-full">
            <div>
              <div className="mb-[32px]">
                <label className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block" htmlFor="password">
                  Новий пароль
                </label>
                <div className="relative">
                  <div className={`flex items-center w-[400px] p-[16px_10px] pr-[40px] rounded-[8px] border ${inputBorderClass()} focus-within:ring-2 focus-within:ring-[#A305A6]`}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="flex-1 text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal bg-transparent focus:outline-none"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="ml-2"
                    >
                      <img
                        src={showPassword ? '/images/hideIcon.svg' : '/images/viewIcon.svg'}
                        alt={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-[32px]">
                <label className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block" htmlFor="repeat-password">
                  Підтвердіть новий пароль
                </label>
                <div className="relative">
                  <div className={`flex items-center w-[400px] p-[16px_10px] pr-[40px] rounded-[8px] border ${inputBorderClass()} focus-within:ring-2 focus-within:ring-[#A305A6]`}>
                    <input
                      type={showRepeatPassword ? 'text' : 'password'}
                      className="flex-1 text-[#B3B3B3] font-['Noto_Sans'] text-[16px] font-normal leading-normal bg-transparent focus:outline-none"
                      id="repeat-password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShowRepeatPassword}
                      className="ml-2"
                    >
                      <img
                        src={showRepeatPassword ? '/images/hideIcon.svg' : '/images/viewIcon.svg'}
                        alt={showRepeatPassword ? 'Сховати пароль' : 'Показати пароль'}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[32px]">
              <label className="text-white font-['Noto_Sans'] text-[16px] font-bold leading-normal mb-2 block">
                Перевірка пароля
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${radioButtonClass(hasLetter)}`}></div>
                  <span className={`text-[16px] ${radioTextClass(hasLetter)}`}>1 літеру</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${radioButtonClass(hasNumber)}`}></div>
                  <span className={`text-[16px] ${radioTextClass(hasNumber)}`}>1 число</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${radioButtonClass(isMinLength)}`}></div>
                  <span className={`text-[16px] ${radioTextClass(isMinLength)}`}>8 символів</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="flex w-[400px] p-[16px_10px] justify-center items-center gap-[10px] rounded-[20px] bg-[rgba(163,5,166,0.50)] text-white font-['Noto_Sans'] text-[16px] font-normal leading-normal hover:bg-[rgba(163,5,166,0.7)]"
                type="button"
                disabled={!(isMinLength && hasLetter && hasNumber && password === repeatPassword)}
                onClick={handleNextClick}
              >
                <span className="text-[#FFF] font-['Noto Sans'] text-[16px] font-normal leading-normal">
                  Далі
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;