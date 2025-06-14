import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  editingTask: Task | null;
}

const loadFromLocalStorage = (): Task[] => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage", error);
    return [];
  }
};

const saveToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage", error);
  }
};

const initialState: TaskState = {
  tasks: loadFromLocalStorage(),
  loading: false,
  editingTask: null,
};

// Async thunk action to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const data: Task[] = await res.json();
  console.log("Fetched tasks:", data);
  return data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      console.log("Adding task:", action.payload);
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index >= 0) state.tasks[index] = action.payload;
      state.editingTask = null;
      saveToLocalStorage(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToLocalStorage(state.tasks);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToLocalStorage(state.tasks);
    },
    setEditingTask(state, action: PayloadAction<Task | null>) {
      state.editingTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      saveToLocalStorage(state.tasks);
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addTask, updateTask, deleteTask, toggleTask, setEditingTask } =
  taskSlice.actions;
export default taskSlice.reducer;
