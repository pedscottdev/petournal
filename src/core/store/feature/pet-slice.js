const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    {
        id: "",
        name: "",
        avatar: "",
        breed: "",
        isChecked: false,
    },
];

const PetSlice = createSlice({
    name: "Pet",
    initialState,
    reducers: {
        setUserPets: (state, action) => {
            return action.payload;
        },
        setIsChecked: (state, action) => {
            const { id, isChecked } = action.payload;
            const petToUpdate = state.find((pet) => pet.id == id);

            if (petToUpdate) {
                petToUpdate.isChecked = isChecked;
            }
        },
        resetIsChecked: (state, action) => {
            state.forEach((pet) => {
                pet.isChecked = false;
            });
        },
        filterPets: (state, action) => {
            const keyword = action.payload.toLowerCase();
            return state.filter((pet) => pet.name.toLowerCase().includes(keyword));
        },
    },
});

export const { setUserPets, setIsChecked, resetIsChecked, filterPets } = PetSlice.actions;

export default PetSlice.reducer;
