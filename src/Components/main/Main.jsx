import { useEffect, useState } from "react";
import { doc, collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Create from "../card/CreateCard";
import ShowCard from "../Show Card/Card";
import Loader from "../loader/Loading";
import "./mainstyle.scss";

const Main = () => {
  const [data, setData] = useState([]);
  const [currentId, setId] = useState();
  const [isCreateModal, setModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserUid, setCurrentUserUid] = useState(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isStared = searchParams.get("stared") === "true";

  // Fetch Data from Firestore
  async function handleCardData(uid) {
    if (!uid) return;

    const q = isStared
      ? query(collection(db, "newData"), where("userId", "==", uid), where("stared", "==", true))
      : query(collection(db, "newData"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    const storedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setData(storedData);
    setIsLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        handleCardData(user.uid);
      } else {
        navigate("/signup", { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUserUid) {
      handleCardData(currentUserUid);
    }
  }, [isStared]);

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "newData", id));
    handleCardData(currentUserUid);
  };

  const updateData = (id) => {
    setModel(true);
    setId(id);
  };

  const toggleStaredView = () => {
    setSearchParams(isStared ? {} : { stared: "true" });
  };

  return (
    <div>
      <div className="head-div">
        <div className="notes">
          <h2>Notes</h2>
        </div>
        <div className="all-and-stared">
          <button className={`button primary ${!isStared ? "is-clicked" : ""}`} onClick={() => setSearchParams({})}>
            All
          </button>
          <button
            className={`button secondry ${isStared ? "is-clicked" : ""}`}
            name="allStaredButton"
            onClick={toggleStaredView}
            type="button"
          >
            Only Stared
          </button>
          <button className="button outline" onClick={() => navigate("/login", { replace: true })}>
            Logout
          </button>
        </div>
      </div>
      <br />

      {isCreateModal && (
        <Create
          handleCardData={handleCardData}
          updatingData={data.find((item) => item.id === currentId)}
          passData={data}
          showModel={setModel}
          userUid={currentUserUid}
        />
      )}

      <div className="cards-div">
        {isLoading ? (
          <Loader />
        ) : (
          data.map((item) => (
            <ShowCard
              key={item.id}
              data={item}
              handleClose={deleteNote}
              handleUpdate={updateData}
              handleCardData={handleCardData}
              userUid={currentUserUid}
            />
          ))
        )}
      </div>

      <div className="add-notes">
        <h2>Add Notes </h2>
        <span onClick={() => setModel(true)}>
          <h1>+</h1>
        </span>
      </div>
    </div>
  );
};

export default Main;
