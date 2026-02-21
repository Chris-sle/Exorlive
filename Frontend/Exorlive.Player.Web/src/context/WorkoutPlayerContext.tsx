import {
    createContext,
    useContext,
    useState,
    useMemo,
} from "react";
import type { ReactNode } from "react";

interface WorkoutPlayerState {
    queue: number[];          // alle øvelser i økten, i rekkefølge
    currentIndex: number;     // hvilken index i queue vi står på
    completedIds: number[];   // øvelser markert som ferdig

    setQueue: (ids: number[]) => void;
    setCurrentIndex: (index: number) => void;
    toggleCompleted: (id: number) => void;
    clearCompleted: () => void;
    resetSession: () => void;
}

const WorkoutPlayerContext = createContext<WorkoutPlayerState | undefined>(
    undefined
);

export const WorkoutPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [queue, setQueueState] = useState<number[]>([]);
    const [currentIndex, setCurrentIndexState] = useState(0);
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    const setQueue = (ids: number[]) => {
        setQueueState(ids);
        setCurrentIndexState(0);
    };

    const clearCompleted = () => {
        setCompletedIds([]);
    };

    const setCurrentIndex = (index: number) => {
        setCurrentIndexState(index);
    };

    const toggleCompleted = (id: number) => {
        setCompletedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const resetSession = () => {
        setQueueState([]);
        setCurrentIndexState(0);
        setCompletedIds([]);
    };

    const value = useMemo(
        () => ({
            queue,
            currentIndex,
            completedIds,
            setQueue,
            setCurrentIndex,
            toggleCompleted,
            clearCompleted,
            resetSession,
        }),
        [queue, currentIndex, completedIds]
    );

    return (
        <WorkoutPlayerContext.Provider value={value}>
            {children}
        </WorkoutPlayerContext.Provider>
    );
};

export const useWorkoutPlayer = () => {
    const ctx = useContext(WorkoutPlayerContext);
    if (!ctx) {
        throw new Error("useWorkoutPlayer must be used inside WorkoutPlayerProvider");
    }
    return ctx;
};