import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces para resposta de login e estado de autenticação
interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface TeacherRegister {
  name: string;
  email: string;
  password: string;
}

interface TeacherLogin {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  teacher: LoginResponse | null;
  token: string | null;
}

interface LoginError {
  message: string;
}

// Estado inicial da autenticação
const initialState: AuthState = {
  isAuthenticated: false,
  teacher: null,
  token: null,
};

// Thunk para verificar a autenticação ao carregar a aplicação
export const checkAuth = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string }
>("auth/checkAuth", async (_, thunkApi) => {
  try {
    const response = await fetch("http://localhost:8080/check-auth", {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error("Not authenticated");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// Thunk para realizar login
export const login = createAsyncThunk<
  LoginResponse,
  TeacherLogin,
  { rejectValue: LoginError }
>("auth/login", async (teacher: TeacherLogin, thunkApi) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: teacher.email,
        password: teacher.password,
      }),
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const data: LoginResponse = await response.json();

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ message: error.message });
  }
});

// Thunk para registrar um novo usuário
export const register = createAsyncThunk<
  LoginResponse,
  TeacherRegister,
  { rejectValue: LoginError }
>("auth/register", async (teacher: TeacherRegister, thunkApi) => {
  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: teacher.email,
        name: teacher.name,
        password: teacher.password,
      }),
    });

    if (response.status != 201) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register");
    }
    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ message: error.message });
  }
});

// Slice para gerenciar o estado de autenticação
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.teacher = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.teacher = action.payload;
          state.token = action.payload.token;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.teacher = null;
        state.token = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.teacher = action.payload;
          state.token = action.payload.token;
          document.cookie = `token=${action.payload.token}; path=/;`;
        }
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.teacher = action.payload;
          state.token = action.payload.token;
          document.cookie = `token=${action.payload.token}; path=/;`;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
