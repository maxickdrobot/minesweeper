import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveState = (state) => {
  localStorage.setItem("user", JSON.stringify(state));
};

const persistedUser = loadState();

const initialState = {
  name: persistedUser?.name || "",
  email: persistedUser?.email || "",
  isRegistered: persistedUser?.isRegistered || false,
  score: persistedUser?.score || 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email } = action.payload;

      state.name = name;
      state.email = email;
      state.isRegistered = true;

      saveState(state);
    },

    clearUser(state) {
      state.name = "";
      state.email = "";
      state.isRegistered = false;
      state.score = 0;

      saveState(state);
    },

    addScore(state, action) {
      state.score = Math.max(0, state.score + action.payload);

      saveState(state);
    },
  },
});

export const { setUser, clearUser, addScore } = userSlice.actions;
export default userSlice.reducer;