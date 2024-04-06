import { useState, useEffect } from 'react';

function ProfilePage() {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            const profileEndpoint = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user';

            fetch(profileEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil profil userLogged');
                }
                return response.json();
            })
            .then(profileData => {
                setProfileData(profileData);
            })
            .catch(error => {
                console.error('Terjadi kesalahan', error);
            });
        } else {
            console.log('Token akses tidak tersedia di local storage');
        }
    }, []);

    return (
        <div>
            {profileData ? (
                <div>
                    <h1>Profil Pengguna</h1>
                    <p>Nama: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                    {/* Tampilkan informasi profil pengguna lainnya sesuai kebutuhan */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProfilePage;
