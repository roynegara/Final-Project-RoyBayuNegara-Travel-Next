import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreatePromo from "@/components/PopupCreatePromo";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);

  const getPromos = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        setPromos(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getPromos();
  }, []);

  const updatePromosData = () => {
    getPromos();
  };

  return (
    <div>
      <h1 className="promos-title">Promo's Database</h1>

      <div className="promos-btn-popup-create">
        <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
      </div>

      <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`}>
        <div className="promos">
          {promos.map((promo, index) => (
            <div className="promos-card" key={index}>
              <img src={promo.imageUrl} alt={promo.title} />
              <p>{promo.id}</p>
              <p>{promo.title}</p>
              <p>{promo.description}</p>
              <div>
                <Link href={`/promo/${promo.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromosData} />}
    </div>
  );
};

export default Promo;


// // sudah oke belum auto change data
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);

//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);

//   const getPromos = () => {
//     // const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           // Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//       <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>
      
//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`} >
      
//       <div className="promos">
//         {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//                 <img  src={promo.imageUrl} alt={promo.title}/>
//             <p>{promo.id}</p>
//                 <p>{promo.title}</p>
//                 <p>{promo.description}</p>

//                 <div>
//                     <Link href={`/promo/${promo.id}`}><button>Read More</button></Link>
                    
//                 </div>

//           </div>
//         ))}
//       </div>                     
//       </div>
//           {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromosData} />}
//       </div>
//   );
// };

// export default Promo;
