import { useCallback, useMemo, useState } from "react";
import { Field, TDirection } from "../utils/2048/field";
import { arrMock } from "../utils/2048/mock";

const INITIALL_FIELD = new Field();

export const useGameState = () => {
    const [field, setField] = useState(INITIALL_FIELD.field);

    const handleDirection = useCallback((direction: TDirection) => {
        INITIALL_FIELD.handleDirection(direction);
        setField([...INITIALL_FIELD.field]);
    }, []);

    return { field: [], handleDirection, init: INITIALL_FIELD };
};