import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.user);

    console.log(user); // Wyświetl użytkownika w konsoli

    return (
        <div>
            {user ? (
                <div>
                    <h2>Profil użytkownika</h2>
                    <p>Imię: {user.firstName}</p>
                    <p>Nazwisko: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Inne informacje o użytkowniku</p>
                </div>
            ) : (
                <p>Musisz być zalogowany, aby zobaczyć swój profil.</p>
            )}
        </div>
    );
};

export default Profile;
