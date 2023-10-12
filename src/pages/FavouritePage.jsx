import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
 

export default function FavouritePage() {

  const [data, setData] = useState([]);

  let favoritListe = [];  // Opretter tom favoritliste

  // Hvis der allerede er en favoritliste i localstorage, så indlæses den.
  if (localStorage.getItem("favoritter")) {  
    favoritListe = JSON.parse(localStorage.getItem("favoritter"));
  }

  useEffect(() => {
    async function fetchData() {
      onSnapshot(collection(db, "shoppingliste"), data => {
        const docs = [];
        data.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        console.log("useEffect");
        setData(docs);
      });
    }
    fetchData();
  }, []);

  function haandterFavorit(e) {
    const vareId = e.currentTarget.getAttribute("data-id");
    const checked = e.currentTarget.checked;
    console.log(vareId + "    " + checked);

    if (checked) {
        favoritListe.push(vareId); // Tilføjer vareId til favoritliste        
    } else {
        const indeks = favoritListe.indexOf(vareId); // Finder varens position i favoritListen
        favoritListe.splice(indeks, 1); // Fjerner varen fra favoritListen
    }

    // Gemmer favoritListen i localStorage
    localStorage.setItem("favoritter", JSON.stringify(favoritListe));
  }


  return (
    <div className="page">
       <ul style={{"display" : "flex","flexDirection" : "column" }}> 
        {data.map((item) => (
          <div key={item.id}>
            {favoritListe.includes(item.id) ?
                (<li style={{ "listStyleType": "none" }}>
                <input type="checkbox" defaultChecked={true} data-id={item.id} onChange={haandterFavorit} style={{"display" : "inline-block" }} />
                <span style={{ "marginRight": "10px" }}>{item.vare}</span>
                <span style={{ "marginRight": "10px" }}>{item.pris}</span>
                </li>
                ) :
                console.log("Vare ikke på favoritlisten.")
            }
          </div>
        ))}
      </ul>
    </div>

  );

}
