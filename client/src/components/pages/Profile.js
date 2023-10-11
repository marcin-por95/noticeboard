import React from 'react';

const Profile = () => {

    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        otherInfo: 'Dodatkowe informacje o użytkowniku',
    };

    return (
        <div>
            <h2>Profil użytkownika</h2>
            <p>Imię: {userData.firstName}</p>
            <p>Nazwisko: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>{userData.otherInfo}</p>
        </div>
    );
};

export default Profile;
