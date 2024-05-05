import React, { useState, useEffect } from 'react';
import Profile from '@/pages/profile';
import Users from '@/pages/users';
import Banner from '@/pages/banner';
import Promo from '@/pages/promo';
import Category from '@/pages/category';
import Activity from '@/pages/activity';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(true); // Ubah nilai awal menjadi true
  const [showUsers, setShowUsers] = useState(false);
  const [showbanner, setShowBanner] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
const [showActivity, setShowActivity] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      router.push('/login');
    }
  }, []);
  
const handleLogout = () => {
  localStorage.removeItem("access_token");
  toast.success("Logout successfully");
  router.push("/login", undefined, { shallow: true }).then((success) => {
    if (success) {
      setTimeout(() => {
        router.push('/')
        window.location.reload()
      },1500);
    }
  });
  };
  
  const handleProfileClick = () => {
    setShowProfile(true);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  };

  const handleUsersClick = () => {
    setShowUsers(true);
    setShowProfile(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handleBannerClick = () => {
    setShowBanner(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handlePromoClick = () => {
    setShowPromo(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handleCategoryClick = () => {
    setShowCategory(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowActivity(false);
  }

  const handleActivityClick = () => {
    setShowActivity(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className='sidebar-position' onClick={handleProfileClick}>  <i class="bi bi-file-person-fill"></i> <a className='dashboard-text'>Profile</a></li>
          <li className='sidebar-position' onClick={handleUsersClick}> <i class="bi bi-person-check-fill"></i> <a className='dashboard-text'>Users</a></li>
          <li className='sidebar-position' onClick={handleBannerClick}> <i class="bi bi-credit-card-2-front-fill"></i> <a className='dashboard-text'>Banner</a></li>
          <li className='sidebar-position' onClick={handlePromoClick}><i class='bx bxs-discount' ></i> <a className='dashboard-text'>Promo</a></li>
          <li className='sidebar-position' onClick={handleCategoryClick}><i class='bx bx-category'></i> <a className='dashboard-text'>Category</a></li>
          <li className='sidebar-position' onClick={handleActivityClick}><i class='bx bxs-plane-alt'></i> <a className='dashboard-text'>Destination</a></li>
        </ul>
        <ul>
        <li className='sidebar-logout' onClick={handleLogout} ><i class="bi bi-box-arrow-right"></i> <a className='dashboard-text'>Logout</a></li>
        </ul>
      </div>

      <div className="content">
        {showProfile && <Profile />}
        {showUsers && <Users />}
        {showbanner && <Banner />}
        {showPromo && <Promo />}
        {showCategory && <Category />}
        {showActivity && <Activity />}
      </div>
    </div>
  );
};

export default Dashboard;

