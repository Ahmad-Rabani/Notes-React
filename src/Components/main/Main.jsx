import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { fetchNotes } from "./_redux/MainSlice";
import Create from "../card/CreateCard";
import ShowCard from "../Show Card/Card";
import SortableNotesList from "../Show Card/SortableNotesList";
import SkeletonLoader from "../loader/SkeletonLoader";
import NoteSearchBar from "./NoteSearchBar";
import TagFilterBar from "../tags/TagFilterSidebar";
import useDebouncedValue from "./useDebouncedValue";
import { filterNotes } from "../utils/noteSearch";
import { filterNotesByTags } from "../utils/tagUtils";
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
  const selectedTags = useSelector((state) => state.tags.selectedTags);
  const [modalKey, setModalKey] = useState(0);
  const [isCreateModal, setModel] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [enteringIds, setEnteringIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);
  const debouncedSearch = useDebouncedValue(searchQuery, 200);

  const prevIdsRef = useRef(new Set());
  const isInitialLoad = useRef(true);

  // Apply both search and tag filters
  const filteredNotes = useMemo(() => {
    let notes = filterNotes(data, debouncedSearch);
    if (selectedTags.length > 0) {
      notes = filterNotesByTags(notes, selectedTags);
    }
    return notes;
  }, [data, debouncedSearch, selectedTags]);

  const isSearchActive = debouncedSearch.trim().length > 0;
  const isTagFilterActive = selectedTags.length > 0;

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modKey = isMac ? event.metaKey : event.ctrlKey;

      if (modKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }

      if (event.key === "Escape" && searchQuery) {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  const openCreateModal = () => {
    setModalKey((key) => key + 1);
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

    if ((isSearchActive || isTagFilterActive) && filteredNotes.length === 0) {
      return (
        <CardsGrid aria-live="polite">
          <EmptyState>
            {isSearchActive && isTagFilterActive
              ? `No notes match your search and tag filters.`
              : isSearchActive
              ? `No notes match "${debouncedSearch.trim()}". Try a different keyword.`
              : `No notes with the selected tags. Try a different tag.`}
          </EmptyState>
        </CardsGrid>
      );
    }

    const notesToRender = (isSearchActive || isTagFilterActive) ? filteredNotes : data;

    if (isStared || isSearchActive || isTagFilterActive) {
      return (
        <CardsGrid aria-live="polite">
          {notesToRender.map((item) => (
            <ShowCard
              key={item.id}
              data={item}
              userUid={currentUserUid}
              isEntering={enteringIds.has(item.id)}
              searchQuery={debouncedSearch}
            />
          ))}
        </CardsGrid>
      );
    }

    return (
      <>
        <DndHint>Hold and drag a card to reorder your notes</DndHint>
        <SortableNotesList
          data={notesToRender}
          userUid={currentUserUid}
          enteringIds={enteringIds}
          searchQuery={debouncedSearch}
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

      <div style={{ padding: "20px" }}>
        {/* Search bar with tags immediately below for compact layout */}
        {!showSkeleton && data.length > 0 && (
          <>
            <NoteSearchBar
              ref={searchInputRef}
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={filteredNotes.length}
              totalCount={data.length}
              isActive={isSearchActive}
            />

            <TagFilterBar notes={data} />
          </>
        )}

        {(isSearchActive || isTagFilterActive) && !showSkeleton && (
          <DndHint>Search/filter is active — clear it to drag and reorder notes</DndHint>
        )}

        {isCreateModal && (
          <Create key={`add-note-${modalKey}`} showModel={setModel} userUid={currentUserUid} />
        )}

        {showSkeleton ? <SkeletonLoader count={6} /> : renderNotes()}

        <FabContainer>
          <FabLabel>Add note</FabLabel>
          <FabButton type="button" onClick={openCreateModal} aria-label="Add new note">
            +
          </FabButton>
        </FabContainer>
      </div>
    </PageWrapper>
  );
};

export default Main;
