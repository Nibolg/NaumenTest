package com.NaumenTest.dao;

import java.util.List;
import com.NaumenTest.model.Note;

public interface NoteDao {

    Note findById(int id);

    void saveNote(Note note);

    void deleteNoteById(int id);

    List<Note> findAllNotes();


}
