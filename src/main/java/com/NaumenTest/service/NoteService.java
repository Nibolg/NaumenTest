package com.NaumenTest.service;

import java.util.List;

import com.NaumenTest.model.Note;

public interface NoteService {

    Note findById(int id);

    void saveNote(Note note);

    void updateNote(Note note);

    void deleteNoteById(int id);

    List<Note> findAllNotes();

    public boolean isNoteExist(Note note);

}