import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { fetchNotes, deleteNote } from "./_redux/MainSlice";
import Create from "../card/CreateCard";
import ShowCard from "../Show Card/Card";
import Loader from "../loader/Loading";
import "./mainstyle.scss";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isStared = searchParams.get("stared") === "true";

  const { data, status } = useSelector((state) => state.main);
  const [currentId, setId] = useState();
  const [isCreateModal, setModel] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        dispatch(fetchNotes({ userUid: user.uid, isStared }));
      } else {
        navigate("/signup", { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUserUid) {
      dispatch(fetchNotes({ userUid: currentUserUid, isStared }));
    }
  }, [isStared]);

  const handleDelete = async (id) => {
    dispatch(deleteNote({ noteId: id, userUid: currentUserUid }));
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
          updatingData={data.find((item) => item.id === currentId)}
          showModel={setModel}
          userUid={currentUserUid}
        />
      )}

      <div className="cards-div">
        {status === "loading" ? (
          <Loader />
        ) : (
          data.map((item) => (
            <ShowCard
              key={item.id}
              data={item}
              handleClose={handleDelete}
              handleUpdate={updateData}
              userUid={currentUserUid}
            />
          ))
        )}
      </div>

      <div className="add-notes">
        <h2>Add Notes</h2>
        <span onClick={() => setModel(true)}>
          <h1>+</h1>
        </span>
      </div>
    </div>
  );
};

export default Main;