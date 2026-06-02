import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { fetchNotes } from "./_redux/MainSlice";
import Create from "../card/CreateCard";
import ShowCard from "../Show Card/Card";
import SortableNotesList from "../Show Card/SortableNotesList";
import SkeletonLoader from "../loader/SkeletonLoader";
import {
  CardsGrid,
  DndHint,
  EmptyState,
  FabButton,
  FabContainer,
  FabLabel,
  FilterButton,
  FilterGroup,
  Header,
  LogoutButton,
  PageTitle,
  PageWrapper,
} from "./notesPageStyles";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isStared = searchParams.get("stared") === "true";

  const { data, status } = useSelector((state) => state.main);
  const [currentId, setId] = useState();
  const [isCreateModal, setModel] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [enteringIds, setEnteringIds] = useState(new Set());

  const prevIdsRef = useRef(new Set());
  const isInitialLoad = useRef(true);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUserUid) {
      dispatch(fetchNotes({ userUid: currentUserUid, isStared }));
    }
  }, [currentUserUid, isStared, dispatch]);

  useEffect(() => {
    if (status !== "succeeded") return;

    const currentIds = new Set(data.map((item) => item.id));

    if (isInitialLoad.current) {
      prevIdsRef.current = currentIds;
      isInitialLoad.current = false;
      return;
    }

    const newIds = [...currentIds].filter((id) => !prevIdsRef.current.has(id));

    if (newIds.length > 0) {
      setEnteringIds(new Set(newIds));
      const timer = setTimeout(() => setEnteringIds(new Set()), 650);
      prevIdsRef.current = currentIds;
      return () => clearTimeout(timer);
    }

    prevIdsRef.current = currentIds;
  }, [data, status]);

  const openCreateModal = () => {
    setId(undefined);
    setModel(true);
  };

  const toggleStaredView = () => {
    setSearchParams(isStared ? {} : { stared: "true" });
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/login", { replace: true });
  };

  const isLoading = status === "loading" || status === "idle";
  const showSkeleton = isLoading && data.length === 0;

  const renderNotes = () => {
    if (data.length === 0) {
      return (
        <CardsGrid aria-live="polite">
          <EmptyState>
            {isStared
              ? "No starred notes yet. Star a note to see it here."
              : "No notes yet. Tap + to create your first note."}
          </EmptyState>
        </CardsGrid>
      );
    }

    if (isStared) {
      return (
        <CardsGrid aria-live="polite">
          {data.map((item) => (
            <ShowCard
              key={item.id}
              data={item}
              userUid={currentUserUid}
              isEntering={enteringIds.has(item.id)}
            />
          ))}
        </CardsGrid>
      );
    }

    return (
      <>
        <DndHint>Drag the grip handle to reorder your notes</DndHint>
        <SortableNotesList
          data={data}
          userUid={currentUserUid}
          enteringIds={enteringIds}
        />
      </>
    );
  };

  return (
    <PageWrapper>
      <Header>
        <PageTitle>Notes</PageTitle>
        <FilterGroup>
          <FilterButton
            $active={!isStared}
            onClick={() => setSearchParams({})}
            type="button"
            aria-pressed={!isStared}
          >
            All
          </FilterButton>
          <FilterButton
            $active={isStared}
            onClick={toggleStaredView}
            type="button"
            aria-pressed={isStared}
          >
            Starred
          </FilterButton>
          <LogoutButton type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </FilterGroup>
      </Header>

      {isCreateModal && (
        <Create
          updatingData={
            currentId ? data.find((item) => item.id === currentId) : undefined
          }
          showModel={setModel}
          userUid={currentUserUid}
        />
      )}

      {showSkeleton ? <SkeletonLoader count={6} /> : renderNotes()}

      <FabContainer>
        <FabLabel>Add note</FabLabel>
        <FabButton
          type="button"
          onClick={openCreateModal}
          aria-label="Add new note"
        >
          +
        </FabButton>
      </FabContainer>
    </PageWrapper>
  );
};

export default Main;
