import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Commons/Auth/AuthContext';

interface ProfileProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ }) => {
    const navigate = useNavigate();
    const authContext = useAuth();
    const logout = authContext ? authContext.logout : () => {};

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={handleLogout} className="text-white font-bold w-full max-w-md mt-4" style={{ borderRadius: '20px', background: 'rgba(163, 5, 166, 0.50)', padding: '16px 10px' }}>
                Вийти з аккаунта
            </button>
        </div>
    );
};

export default Profile;