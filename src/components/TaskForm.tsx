import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { addTask, setEditingTask, updateTask } from "../store/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  description: string;
}
const TaskForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const { editingTask } = useAppSelector((state) => state.tasks);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Set the values of the form when editing a task
  useEffect(() => {
    if (editingTask) {
      setValue("title", editingTask.title);
      setValue("description", editingTask.description);
    } else {
      reset();
    }
  }, [editingTask, reset, setValue]);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!title) return;
  //     dispatch(addTask({ id: uuidv4(), title, description, completed: false }));
  //     setTitle("");
  //     setDescription("");
  //   };
  const onSubmit = (data: FormData) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...data }));
    } else {
      dispatch(addTask({ id: uuidv4(), ...data, completed: false }));
    }
    reset();
    dispatch(setEditingTask(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        // type="text"
        // value={title}
        {...register("title", { required: "Title is required" })}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-2 border rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <textarea
        {...register("description", { required: "Description is required" })}
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={() => dispatch(setEditingTask(null))}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
