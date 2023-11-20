const { createSlice } = require("@reduxjs/toolkit");

const PetSlice = createSlice({
    name: "Pet",
    initialState: [
        {
            id: "",
            name: "",
            avatar: "",
            isChecked: false,
        },
    ],
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
    },
});

export const { setUserPets, setIsChecked } = PetSlice.actions;

export default PetSlice.reducer;
