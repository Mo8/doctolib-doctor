import { auth, firestore } from "../../firebase.config";
import { collection, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

function Rdvs() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [rdvsCollection, loadingRdv, errorRdv] = useCollectionOnce(
    collection(firestore, "rdvs"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [rdvs, setRdvs] = useState([]);
  console.log(rdvs);
  useEffect(() => {
    if (rdvsCollection) {
      Promise.all(
        rdvsCollection.docs
          .filter((value) => value.data().doctor.id == user.uid)
          .map(async (value) => {
            console.log(value.ref);

            return {
              ref: value,
              patient: (await getDoc(value.data().patient)).data(),
              horaires: new Date(value.data().horaire.seconds * 1000),
            };
          })
      ).then((value) => setRdvs(value.sort((a,b)=> a.horaires.getTime()-b.horaires.getTime())));
    }
  }, [rdvsCollection]);
  return (
    <>
      <div>
        Liste des rdvs
      </div>
      {rdvs.length > 0
        ? rdvs.map((value) => (
            <div key={value.ref.id}>
              {value.patient.name} {value.horaires.toLocaleString()} <a href={`mailto:${value.patient.email}?subject=Changer d'horaire rdv&body=Le rdv du ${value.horaires.toLocaleString()} dois être changer contacter moi `}>Envoie mail modifier rdv</a>
            </div>
          ))
        : ""}
    </>
  );
}
export default Rdvs;
