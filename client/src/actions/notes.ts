import axios from "axios";
import { NoteFormValues } from "@/components/notes/add-note-dialog";

const BASE_URL = "http://localhost:5000/api/notes";

export const fetchAllNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNote = async (note: NoteFormValues) => {
  try {
    const response = await axios.post(`${BASE_URL}`, note);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNote = async ({
  id,
  note,
}: {
  id: string;
  note: Partial<NoteFormValues>;
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
